#!/usr/bin/env node

const dataSource=require('../minecraft-data/data/dataPaths');
const fs=require('fs');

const data="module.exports=\n{\n"+Object
  .keys(dataSource)
  .map(k1 =>
  "\t'"+k1+"': {\n"+Object
    .keys(dataSource[k1])
    .map(k2 =>
    "\t\t'"+k2+"': {"+"\n"+ Object
      .keys(dataSource[k1][k2])
      .map(k3 => "\t\t\t'"+k3+"': require('./minecraft-data/data/"+dataSource[k1][k2][k3]+"/"+k3+"')")
      .join(",\n")
      +"\n\t\t}"
    )
    .join(",\n")
    +"\n\t}"
  )
  .join(",\n")+"\n};";

fs.writeFileSync(__dirname+"/../data.js",data);