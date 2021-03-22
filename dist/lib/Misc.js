"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Misc = void 0;
const BaseLib_1 = require("../base-lib/BaseLib");
class Misc extends BaseLib_1.BaseLib {
    constructor(axios) {
        super(axios);
        this.axios = axios;
        this.path = '';
    }
    async bvnLookup(data, callback) {
        return this.sendRequest(this.axios.post('/v1/lookup/bvn/identity', data), callback).catch(err => {
            // console.log(err);
        });
    }
    async institutions(callback) {
        return this.sendRequest(this.axios.get('/coverage'), callback).catch(err => {
            // console.log(err);
        });
    }
}
exports.Misc = Misc;
