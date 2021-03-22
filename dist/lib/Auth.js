"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Auth = void 0;
const BaseLib_1 = require("../base-lib/BaseLib");
class Auth extends BaseLib_1.BaseLib {
    constructor(axios) {
        super(axios);
        this.axios = axios;
        this.path = '/account/auth';
    }
    async getAccountId(data, callback) {
        return this.sendRequest(this.axios.post(this.path, data), callback).catch(err => {
            // console.log(err);
        });
    }
}
exports.Auth = Auth;
