module.exports={
  buildIndexFromObject:
    function(object,fieldToIndex) {
      return Object.keys(object).reduce(function(index,key){
        index[object[key][fieldToIndex]]=object[key];
        return index;
      },{});
    }
};