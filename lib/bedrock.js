class DataRegistry {
  constructor (indexes) {
    this.data = indexes
    this.itemPalette = {}
    this.itemPaletteNamed = {}
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

module.exports = (indexes) => new DataRegistry(indexes)
