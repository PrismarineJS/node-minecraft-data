module.exports={
  buildIndexFromObject:
    function(object,fieldToIndex) {
      return Object.keys(object).reduce(function(index,key){
        index[object[key][fieldToIndex]]=object[key];
        return index;
      },{});
    },
  buildIndexFromArray:
    function(array,fieldToIndex) {
      return array.reduce(function(index,element){
        index[element[fieldToIndex]]=element;
        return index;
      },{});
    },
  buildIndexFromArrayNonUnique:
    function(array,fieldToIndex) {
      return array.reduce(function(index,element){
        if(!index[element[fieldToIndex]])
          index[element[fieldToIndex]]=[];
        index[element[fieldToIndex]].push(element);
        return index;
      },{});
    }
};