"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ifCallbackIsSupplied = void 0;
function ifCallbackIsSupplied(callback) {
    return callback !== undefined && typeof callback === 'function';
}
exports.ifCallbackIsSupplied = ifCallbackIsSupplied;
