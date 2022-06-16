import 'package:minecraft_data/utils.dart';

class CraftData {
  final String dataVersion;

  CraftData(this.dataVersion);

  Map<String, dynamic> get attributes =>
      readJson("./minecraft-data/data/pc/1.17/attributes.json");
  Map<String, dynamic> get blocks =>
      readJson("./minecraft-data/data/pc/1.18/blocks.json");
  Map<String, dynamic> get blockCollisionShapes =>
      readJson("./minecraft-data/data/pc/1.17/blockCollisionShapes.json");
  Map<String, dynamic> get biomes =>
      readJson("./minecraft-data/data/pc/1.18/biomes.json");
  Map<String, dynamic> get effects =>
      readJson("./minecraft-data/data/pc/1.17/effects.json");
  Map<String, dynamic> get items =>
      readJson("./minecraft-data/data/pc/1.18/items.json");
  Map<String, dynamic> get enchantments =>
      readJson("./minecraft-data/data/pc/1.17/enchantments.json");
  Map<String, dynamic> get recipes =>
      readJson("./minecraft-data/data/pc/1.18/recipes.json");
  Map<String, dynamic> get instruments =>
      readJson("./minecraft-data/data/pc/1.16.1/instruments.json");
  Map<String, dynamic> get materials =>
      readJson("./minecraft-data/data/pc/1.18/materials.json");
  Map<String, dynamic> get language =>
      readJson("./minecraft-data/data/pc/1.18/language.json");
  Map<String, dynamic> get entities =>
      readJson("./minecraft-data/data/pc/1.18/entities.json");
  Map<String, dynamic> get protocol =>
      readJson("./minecraft-data/data/pc/1.18.2/protocol.json");
  Map<String, dynamic> get windows =>
      readJson("./minecraft-data/data/pc/1.16.1/windows.json");
  Map<String, dynamic> get version =>
      readJson("./minecraft-data/data/pc/1.18.2/version.json");
  Map<String, dynamic> get foods =>
      readJson("./minecraft-data/data/pc/1.17/foods.json");
  Map<String, dynamic> get particles =>
      readJson("./minecraft-data/data/pc/1.18/particles.json");
  Map<String, dynamic> get blockLoot =>
      readJson("./minecraft-data/data/pc/1.18/blockLoot.json");
  Map<String, dynamic> get entityLoot =>
      readJson("./minecraft-data/data/pc/1.18/entityLoot.json");
  Map<String, dynamic> get loginPacket =>
      readJson("./minecraft-data/data/pc/1.18.2/loginPacket.json");
  Map<String, dynamic> get tints =>
      readJson("./minecraft-data/data/pc/1.17/tints.json");
  Map<String, dynamic> get mapIcons =>
      readJson("./minecraft-data/data/pc/1.16/mapIcons.json");
}
