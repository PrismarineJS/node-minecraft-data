#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const _ = require('lodash')
const { definedMap } = require('collection-utils')
const { quicktypeMultiFile, languageNamed, InputData, JSONSchemaInput, IssueAnnotationData, panic, defined, assertNever, messageError, inferenceFlagNames, capitalize, JSONInput, readableFromFileOrURL, FetchingJSONSchemaStore } = require('quicktype-core')
const { CompressedJSON } = require('quicktype-core')
const { Parser } = require('stream-json')
const methodMap = {
  startObject: 'pushObjectContext',
  endObject: 'finishObject',
  startArray: 'pushArrayContext',
  endArray: 'finishArray',
  startNumber: 'handleStartNumber',
  numberChunk: 'handleNumberChunk',
  endNumber: 'handleEndNumber',
  keyValue: 'setPropertyKey',
  stringValue: 'commitString',
  nullValue: 'commitNull',
  trueValue: 'handleTrueValue',
  falseValue: 'handleFalseValue'
}

// a very hacky but accurate generate types

class CompressedJSONFromStream extends CompressedJSON {
  constructor () {
    super(...arguments)
    this.handleStartNumber = () => {
      this.pushContext()
      this.context.currentNumberIsDouble = false
    }
    this.handleNumberChunk = (s) => {
      const ctx = this.context
      if (!ctx.currentNumberIsDouble && /[e]/i.test(s)) {
        ctx.currentNumberIsDouble = true
      }
    }
  }

  async parse (readStream) {
    const combo = new Parser({ packKeys: true, packStrings: true })
    combo.on('data', (item) => {
      if (typeof methodMap[item.name] === 'string') {
        this[methodMap[item.name]](item.value)
      }
    })
    const promise = new Promise((resolve, reject) => {
      combo.on('end', () => {
        resolve(this.finish())
      })
      combo.on('error', (err) => {
        reject(err)
      })
    })
    readStream.setEncoding('utf8')
    readStream.pipe(combo)
    readStream.resume()
    return promise
  }

  handleEndNumber () {
    const isDouble = this.context.currentNumberIsDouble
    this.popContext()
    this.commitNumber(isDouble)
  }

  handleTrueValue () {
    this.commitBoolean(true)
  }

  handleFalseValue () {
    this.commitBoolean(false)
  }
}
async function sourceFromFileOrUrlArray (name, filesOrUrls, httpHeaders) {
  const samples = await Promise.all(filesOrUrls.map(file => readableFromFileOrURL(file, httpHeaders)))
  return { kind: 'json', name, samples }
}
function typeNameFromFilename (filename) {
  const name = path.basename(filename)
  return name.substr(0, name.lastIndexOf('.'))
}
async function samplesFromDirectory (dataDir, httpHeaders) {
  async function readFilesOrURLsInDirectory (d) {
    const files = fs
      .readdirSync(d)
      .map(x => path.join(d, x))
      .filter(x => fs.lstatSync(x).isFile())
    // Each file is a (Name, JSON | URL)
    const sourcesInDir = []
    for (let file of files) {
      const name = typeNameFromFilename(file)
      const fileOrUrl = file
      file = file.toLowerCase()
      // If file is a URL string, download it
      sourcesInDir.push({
        kind: 'json',
        name,
        samples: [await readableFromFileOrURL(fileOrUrl, httpHeaders)]
      })
    }
    return sourcesInDir
  }
  const contents = fs.readdirSync(dataDir).map(x => path.join(dataDir, x))
  const directories = contents.filter(x => fs.lstatSync(x).isDirectory())
  let sources = await readFilesOrURLsInDirectory(dataDir)
  for (const dir of directories) {
    let jsonSamples = []
    const schemaSources = []
    const graphQLSources = []
    for (const source of await readFilesOrURLsInDirectory(dir)) {
      switch (source.kind) {
        case 'json':
          jsonSamples = jsonSamples.concat(source.samples)
          break
        case 'schema':
          schemaSources.push(source)
          break
        case 'graphql':
          graphQLSources.push(source)
          break
        default:
          return assertNever(source)
      }
    }
    if (jsonSamples.length > 0 && schemaSources.length + graphQLSources.length > 0) {
      return messageError('DriverCannotMixJSONWithOtherSamples', { dir: dir })
    }
    const oneUnlessEmpty = (xs) => Math.sign(xs.length)
    if (oneUnlessEmpty(schemaSources) + oneUnlessEmpty(graphQLSources) > 1) {
      return messageError('DriverCannotMixNonJSONInputs', { dir: dir })
    }
    if (jsonSamples.length > 0) {
      sources.push({
        kind: 'json',
        name: path.basename(dir),
        samples: jsonSamples
      })
    }
    sources = sources.concat(schemaSources)
    sources = sources.concat(graphQLSources)
  }
  return sources
}
function negatedInferenceFlagName (name) {
  const prefix = 'infer'
  if (name.startsWith(prefix)) {
    name = name.substr(prefix.length)
  }
  return 'no' + capitalize(name)
}

async function typeSourcesForURIs (name, uris, options) {
  switch (options.srcLang) {
    case 'json':
      return [await sourceFromFileOrUrlArray(name, uris, options.httpHeader)]
    case 'schema':
      return uris.map(uri => ({ kind: 'schema', name, uris: [uri] }))
    default:
      return panic(`typeSourceForURIs must not be called for source language ${options.srcLang}`)
  }
}
async function getSources (options) {
  const sourceURIs = []
  const sourceArrays = await Promise.all(sourceURIs.map(async ([name, uris]) => await typeSourcesForURIs(name, uris, options)))
  let sources = [].concat(...sourceArrays)
  const exists = options.src.filter(fs.existsSync)
  const directories = exists.filter(x => fs.lstatSync(x).isDirectory())
  for (const dataDir of directories) {
    sources = sources.concat(await samplesFromDirectory(dataDir, options.httpHeader))
  }
  // Every src that's not a directory is assumed to be a file or URL
  const filesOrUrls = options.src.filter(x => !_.includes(directories, x))
  if (!_.isEmpty(filesOrUrls)) {
    sources.push(...(await typeSourcesForURIs(options.topLevel, filesOrUrls, options)))
  }
  return sources
}
function jsonInputForTargetLanguage (targetLanguage, languages, handleJSONRefs = false) {
  if (typeof targetLanguage === 'string') {
    targetLanguage = defined(languageNamed(targetLanguage, languages))
  }
  const compressedJSON = new CompressedJSONFromStream(targetLanguage.dateTimeRecognizer, handleJSONRefs)
  return new JSONInput(compressedJSON)
}
async function makeInputData (sources, targetLanguage, additionalSchemaAddresses, handleJSONRefs, httpHeaders) {
  const inputData = new InputData()
  for (const source of sources) {
    switch (source.kind) {
      case 'json':
        await inputData.addSource('json', source, () => jsonInputForTargetLanguage(targetLanguage, undefined, handleJSONRefs))
        break
      case 'schema':
        await inputData.addSource('schema', source, () => new JSONSchemaInput(new FetchingJSONSchemaStore(httpHeaders), [], additionalSchemaAddresses))
        break
      default:
        return assertNever(source)
    }
  }
  return inputData
}
function writeOutput (cliOptions, resultsByFilename) {
  let onFirst = true
  for (const [filename, { lines, annotations }] of resultsByFilename) {
    const output = lines.join('\n')
    if (cliOptions.out !== undefined) {
      fs.writeFileSync(path.join(path.dirname(cliOptions.out), filename), output)
    } else {
      if (!onFirst) {
        process.stdout.write('\n')
      }
      if (resultsByFilename.size > 1) {
        process.stdout.write(`// ${filename}\n\n`)
      }
      process.stdout.write(output)
    }
    if (cliOptions.quiet) {
      continue
    }
    for (const sa of annotations) {
      const annotation = sa.annotation
      if (!(annotation instanceof IssueAnnotationData)) { continue }
      const lineNumber = sa.span.start.line
      const humanLineNumber = lineNumber + 1
      console.error(`\nIssue in line ${humanLineNumber}: ${annotation.message}`)
      console.error(`${humanLineNumber}: ${lines[lineNumber]}`)
    }
    onFirst = false
  }
}

function getFilesFromDir (dir, fileTypes) {
  var filesToReturn = []
  function walkDir (currentPath) {
    var files = fs.readdirSync(currentPath)
    for (var i in files) {
      var curFile = path.join(currentPath, files[i])
      if (fs.statSync(curFile).isFile() && fileTypes.indexOf(path.extname(curFile)) !== -1) {
        filesToReturn.push(curFile)
      }
    }
  };
  walkDir(dir)
  return filesToReturn
}

async function main () {
  const src = getFilesFromDir('minecraft-data/schemas/', ['.json'])
  const options = {
    src: src,
    srcUrls: undefined,
    srcLang: 'schema',
    topLevel: 'interfaces',
    noRender: false,
    alphabetizeProperties: false,
    allPropertiesOptional: false,
    rendererOptions: {
      'just-types': true,
      'no-just-types': true,
      'nice-property-names': true,
      'no-nice-property-names': false,
      'explicit-unions': false,
      'no-explicit-unions': true,
      'runtime-typecheck': true,
      'no-runtime-typecheck': false,
      'runtime-typecheck-ignore-unknown-properties': false,
      'no-runtime-typecheck-ignore-unknown-properties': true,
      'acronym-style': 'pascal',
      converters: 'top-level',
      'raw-type': 'json'
    },
    help: false,
    quiet: false,
    version: false,
    out: 'src/interfaces.ts',
    buildMarkovChain: undefined,
    additionalSchema: [],
    graphqlSchema: undefined,
    graphqlIntrospect: undefined,
    httpMethod: undefined,
    httpHeader: undefined,
    debug: undefined,
    telemetry: undefined,
    noMaps: false,
    noEnums: true,
    noUuids: false,
    noDateTimes: false,
    noIntegerStrings: false,
    noBooleanStrings: false,
    noCombineClasses: false,
    noIgnoreJsonRefs: false
  }
  let sources = []
  let leadingComments
  const fixedTopLevels = false
  sources = await getSources(options)
  const components = definedMap(options.debug, d => d.split(','))
  const debugAll = components !== undefined && components.indexOf('all') >= 0
  let debugPrintGraph = debugAll
  let checkProvenance = debugAll
  let debugPrintReconstitution = debugAll
  let debugPrintGatherNames = debugAll
  let debugPrintTransformations = debugAll
  let debugPrintSchemaResolving = debugAll
  let debugPrintTimes = debugAll
  if (components !== undefined) {
    for (let component of components) {
      component = component.trim()
      if (component === 'print-graph') {
        debugPrintGraph = true
      } else if (component === 'print-reconstitution') {
        debugPrintReconstitution = true
      } else if (component === 'print-gather-names') {
        debugPrintGatherNames = true
      } else if (component === 'print-transformations') {
        debugPrintTransformations = true
      } else if (component === 'print-times') {
        debugPrintTimes = true
      } else if (component === 'print-schema-resolving') {
        debugPrintSchemaResolving = true
      } else if (component === 'provenance') {
        checkProvenance = true
      }
    }
  }
  const lang = languageNamed('TypeScript', undefined)
  if (lang === undefined) {
    return messageError('DriverUnknownOutputLanguage', { lang: 'TypeScript' })
  }
  const quicktypeOptions = {
    lang,
    alphabetizeProperties: options.alphabetizeProperties,
    allPropertiesOptional: options.allPropertiesOptional,
    fixedTopLevels,
    noRender: options.noRender,
    rendererOptions: options.rendererOptions,
    leadingComments,
    outputFilename: definedMap(options.out, path.basename),
    debugPrintGraph,
    checkProvenance,
    debugPrintReconstitution,
    debugPrintGatherNames,
    debugPrintTransformations,
    debugPrintSchemaResolving,
    debugPrintTimes
  }
  for (const flagName of inferenceFlagNames) {
    const cliName = negatedInferenceFlagName(flagName)
    const v = options[cliName]
    if (typeof v === 'boolean') {
      quicktypeOptions[flagName] = !v
    } else {
      quicktypeOptions[flagName] = true
    }
  }
  quicktypeOptions.inputData = await makeInputData(sources, lang, options.additionalSchema, quicktypeOptions.ignoreJsonRefs !== true, options.httpHeader)
  const resultsByFilename = await quicktypeMultiFile(quicktypeOptions)
  writeOutput(options, resultsByFilename)
}

main()
