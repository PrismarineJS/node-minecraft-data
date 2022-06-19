module.exports = {
    buildIndexFromObject(object, fieldToIndex) {
        if (object === undefined) {
            return undefined;
        }
        return Object.keys(object).reduce((index, key) => {
            index[object[key][fieldToIndex]] = object[key];
            return index;
        }, {});
    },
    buildIndexFromArray(array, fieldToIndex) {
        if (array === undefined) {
            return undefined;
        }
        return array.reduce((index, element) => {
            index[element[fieldToIndex]] = element;
            return index;
        }, {});
    },
    buildIndexFromArrayNonUnique(array, fieldToIndex) {
        if (array === undefined) {
            return undefined;
        }
        return array.reduce((index, element) => {
            if (!index[element[fieldToIndex]]) {
                index[element[fieldToIndex]] = [];
            }
            index[element[fieldToIndex]].push(element);
            return index;
        }, {});
    },
    buildIndexFromArrayWithRanges(array, fieldToIndexMin, fieldToIndexMax) {
        if (array === undefined) {
            return undefined;
        }
        return array.reduce((index, element) => {
            for (let i = element[fieldToIndexMin]; i <= element[fieldToIndexMax]; i++) {
                index[i] = element;
            }
            return index;
        }, {});
    },
};
