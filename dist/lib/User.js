"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const BaseLib_1 = require("../base-lib/BaseLib");
class User extends BaseLib_1.BaseLib {
    constructor(axios) {
        super(axios);
        this.axios = axios;
        this.path = '/users';
    }
    async getWalletBalance(callback) {
        return this.sendRequest(this.axios.get(`${this.path}/stats/wallet`), callback).catch(err => {
            throw err;
        });
    }
}
exports.User = User;
