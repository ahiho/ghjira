'use strict';

const intersect = (a, b) => {
    const setA = new Set(a);
    const setB = new Set(b);
    return Array.from(new Set([...setA].filter(x => setB.has(x))));
};
const isInclude = (a, b) => {
    const setA = new Set(a);
    const setB = new Set(b);
    return Array.from(new Set([...setB].filter(x => !setA.has(x))));
};

exports.intersect = intersect;
exports.isInclude = isInclude;
//# sourceMappingURL=array.js.map
