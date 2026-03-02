"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Account = void 0;
const BaseLib_1 = require("../base-lib/BaseLib");
class Account extends BaseLib_1.BaseLib {
    constructor(axios) {
        super(axios);
        this.axios = axios;
        this.path = '/accounts';
    }
    async getAccountId(data, callback) {
        return this.sendRequest(this.axios.get(`${this.path}/stats/wallet`), callback).catch(err => {
            throw err;
        });
    }
}
exports.Account = Account;
