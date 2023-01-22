"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.executeForEach = void 0;
async function executeForEach(target, cb) {
    for (let v of target) {
        await cb(v);
    }
}
exports.executeForEach = executeForEach;
//# sourceMappingURL=array.js.map