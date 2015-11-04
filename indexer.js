function buildIndexFromObject(object,fieldToIndex) {
  return Object.keys(object).reduce(function(index,key){
    index[object[key][fieldToIndex]]=object[key];
    return index;
  },{});
}

function buildIndexFromArray(array, fieldToIndex) {
  return array.reduce(function(index,element){
    index[element[fieldToIndex]]=element;
    return index;
  },{});
}

function buildArrayIndexFromArray(array, fieldToIndex) {
  return array.reduce(function(index,element){
    var e=index[element[fieldToIndex]]
    e ? e.push(element) : index[element[fieldToIndex]] = [element];
    return index;
  },{});
}

function buildDoubleIndexFromArray(array, fieldToIndexOne, fieldToIndexTwo) {
  if (typeof fieldToIndexTwo != 'object') fieldToIndexTwo = [fieldToIndexTwo];
  var inter = buildArrayIndexFromArray(array, fieldToIndexOne);
  return Object.keys(inter).reduce(function(index,key){
    index[key] = inter[key].reduce(function(ind, k) {
      for (var i = 0; i < fieldToIndexTwo.length; i++) {
        if (k[fieldToIndexTwo[i]]) ind[k[fieldToIndexTwo[i]]] = k;
      }
      return ind;
    },{});
    return index;
  },{});
}


module.exports={
  buildIndexFromObject: buildIndexFromObject,
  buildIndexFromArray: buildIndexFromArray,
  buildDoubleIndexFromArray: buildDoubleIndexFromArray
};