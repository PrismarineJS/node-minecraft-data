import 'dart:convert';

import 'lib/utils.dart';

void main(List<String> args) {
  var map = {
    // 'hello': () => "Welcome!",
    // 'bye': () {
    //   // Do something
    //   print("Working");
    //   return "Hello!";
    // },
    // "yey": "Yeeeeeeeeeeey!",
    "attributes": () {
      return readJson("./minecraft-data/data/pc/1.7/attributes.json");
    },
  };

  // print(map['hello']);
  // print(map['bye']);
  // print(map['yey']);
  Map<String, dynamic>
  print(map['attributes']);
}
