import 'dart:convert';
import 'dart:io';

Map<String, dynamic> readJson(String path) {
  return jsonDecode(File(path).readAsStringSync());
}

enum MinecraftEdition { pc, bedrock } // pc == java.
