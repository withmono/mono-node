"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Payment = void 0;
const BaseLib_1 = require("../base-lib/BaseLib");
class Payment extends BaseLib_1.BaseLib {
    constructor(axios) {
        super(axios);
        this.axios = axios;
        this.path = 'v1/payments/';
    }
    async initiate(data, callback) {
        return this.sendRequest(this.axios.post(`${this.path}/initiate`, data), callback).catch((err) => {
            // err
        });
    }
    async verify(data, callback) {
        return this.sendRequest(this.axios.post(`${this.path}/verify`, data), callback).catch((err) => {
            // err
        });
    }
}
exports.Payment = Payment;
