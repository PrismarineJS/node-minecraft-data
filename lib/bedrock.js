class DataProvider {
  constructor (indexes) {
    this.data = indexes
    this.blockPalette = []
    this.blockPaletteNamed = {}
    this.itemPalette = {}
    this.itemPaletteNamed = {}
  }

  /**
   * Loads a block palette from blockStates.json. This data used to be sent over the network, it's now hard-coded.
   * "loadBlocks" loads instead from blocks.json.
   * The index to a block in this array is its "Runtime ID".
   * @param {Array<object>} entries
   */
  loadBlockPalette (entries) {
    for (let i = 0; i < entries.length; i++) {
      const entry = entries[i]
      // console.log(entry)
      entry.runtimeId = i
      this.blockPalette.push(entry)
      this.blockPaletteNamed[entry.name] = entry
    }
  }

  /**
   * Loads an item palette, sent by the server
   * @param {{ name, runtimeId, componentBased }} entries
   */
  loadItemPalette (entries) {
    for (const entry of entries) {
      const name = entry.name.replace('minecraft:', '')
      const e = { name, runtimeId: entry.runtime_id, componentBased: entry.component_based, block: this.data.blocksByName[name] }
      this.itemPalette[entry.runtime_id] = e
      this.itemPaletteNamed[name] = e
      this.data.itemsByName[name].blockId = e.block?.id
    }
  }

  /**
   * On Bedrock, item IDs cannot be known at compile time, they are assigned at runtime on startup.
   * So in this helper class, we load the block (static) and item palettes (dynamic) and provide
   * some extra functions to easily lookup items and their correlated blocks.
   */
  findItemByRuntimeId (runtimeId) {
    const item = this.itemPalette[runtimeId]
    if (!item) return null
    return this.data.itemsByName[item.name]
  }

  findItemByName (name) {
    const item = this.itemPaletteNamed[name]
    const block = this.data.blocksByName[name]
    return item ? { item, block } : null
  }
}

module.exports = (indexes) => new DataProvider(indexes)
