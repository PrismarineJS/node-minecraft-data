import 'dart:convert';
import 'dart:io';

final Map<String, dynamic> dataSource = jsonDecode(File('../minecraft-data/data/dataPaths.json').readAsStringSync());

final data = 'var data = {\n' + dataSource.keys
  .map((k1) {
    "  '" + k1 + "': {\n" + dataSource[k1]
      .keys
      .map((k2) {
        "    '" + k2 + "': {" + '\n' + dataSource[k1][k2]
          .keys
          .map((k3) {
            final loc = "minecraft-data/data/${dataSource[k1][k2][k3]}/";
            try {
              // Check if the file can be loaded as JSON
              
              File('../' + loc + k3 + '.json');
              return '      get ${k3} () { return require("./${loc}${k3}.json") }'
            } catch {
              // No ? Return it as a URL path so other code can decide how to handle it
              const file = fs.readdirSync(path.join(__dirname, '../', loc)).find(f => f.startsWith(k3 + '.'))
              if (file) { return `      ${k3}: __dirname + '/${loc}${file}'` } else { throw Error('file not found: ' + loc + k3) }
            }
          })
          .join(',\n') +
      '\n    }'
  })
      .join(',\n') +
    '\n  }'
  })
  .join(',\n') + '\n}\n'

File("path.join(__dirname, '/../data.js')").write;
