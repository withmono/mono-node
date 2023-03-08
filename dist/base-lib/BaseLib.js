"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseLib = void 0;
const utils_1 = require("../utils");
class BaseLib {
    constructor(axios) {
        this.axios = axios;
    }
    async sendRequest(axiosRequest, callback) {
        try {
            const response = await axiosRequest;
            if ((0, utils_1.ifCallbackIsSupplied)(callback)) {
                callback(null, response.data);
            }
            return Promise.resolve(response);
        }
        catch (error) {
            const err = error;
            if ((0, utils_1.ifCallbackIsSupplied)(callback)) {
                callback(err.response ? err.response.data : err, null);
            }
            return Promise.reject(err);
        }
    }
}
exports.BaseLib = BaseLib;
