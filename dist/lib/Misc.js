"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Misc = void 0;
const BaseLib_1 = require("../base-lib/BaseLib");
/**
 * Miscellaneous API – bank coverage (institutions).
 * @see https://docs.mono.co/api/miscellaneous/bank-coverage
 */
class Misc extends BaseLib_1.BaseLib {
    constructor(axios) {
        super(axios);
        this.axios = axios;
    }
    /** Bank coverage – supported institutions and product scopes. GET /v3/institutions */
    bankCoverage(params, callback) {
        return this.sendRequest(this.axios.get("/v3/institutions", { params }), callback);
    }
}
exports.Misc = Misc;
