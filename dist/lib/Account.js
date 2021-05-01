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
    async getAccountInformation(data, callback) {
        return this.sendRequest(this.axios.get(`${this.path}/${data.accountId}`), callback).catch(err => {
            // console.log(err);
        });
    }
    async getAccountStatement(data, callback) {
        let query = "?";
        query += (data.period ? `period=${data.period}&` : '');
        query += (data.output ? `output=${data.output}&` : '');
        return this.sendRequest(this.axios.get(`${this.path}/${data.accountId}/statement${query}`), callback).catch(err => {
            // console.log(err);
        });
    }
    async pollPdfAccountStatementStatus(data, callback) {
        return this.sendRequest(this.axios.get(`${this.path}/${data.accountId}/statement/jobs/${data.jobId}`), callback).catch(err => {
            // console.log(err);
        });
    }
    async getAccountTransactions(data, callback) {
        let query = "?";
        query += (data.start ? `start=${data.start}&` : '');
        query += (data.end ? `end=${data.end}&` : '');
        query += (data.narration ? `narration=${data.narration}&` : '');
        query += (data.type ? `type=${data.type}&` : '');
        query += ((!data.paginate && data.paginate === false) ? `paginate=${false}&` : `paginate=${true}&`);
        query += (data.limit ? `limit=${data.limit}&` : '');
        return this.sendRequest(this.axios.get(`${this.path}/${data.accountId}/transactions${query}`), callback).catch(err => {
            // console.log(err);
        });
    }
    async getCustomerCredits(data, callback) {
        return this.sendRequest(this.axios.get(`${this.path}/${data.accountId}/credits`), callback).catch(err => {
            // console.log(err);
        });
    }
    async getCustomerDebits(data, callback) {
        return this.sendRequest(this.axios.get(`${this.path}/${data.accountId}/debits`), callback).catch(err => {
            // console.log(err);
        });
    }
    async getIncome(data, callback) {
        return this.sendRequest(this.axios.get(`${this.path}/${data.accountId}/income`), callback).catch(err => {
            // console.log(err);
        });
    }
    async getIdentity(data, callback) {
        return this.sendRequest(this.axios.get(`${this.path}/${data.accountId}/identity`), callback).catch(err => {
            // console.log(err);
        });
    }
    async syncDataManually(data, callback) {
        return this.sendRequest(this.axios.post(`${this.path}/${data.accountId}/sync`), callback).catch(err => {
            // console.log(err);
        });
    }
    async reauthCode(data, callback) {
        return this.sendRequest(this.axios.post(`${this.path}/${data.accountId}/reauthorise`), callback).catch(err => {
            // console.log(err);
        });
    }
    async unlinkAccount(data, callback) {
        return this.sendRequest(this.axios.post(`${this.path}/${data.accountId}/unlink`), callback).catch(err => {
            // console.log(err);
        });
    }
}
exports.Account = Account;
// {
//   "extends": "../tsconfig.json",
//   "compilerOptions": {
//     "baseUrl": "./",
//     "module": "commonjs",
//     "experimentalDecorators": true,
//     "strictPropertyInitialization": false,
//     "isolatedModules": false,
//     "strict": false,
//     "noImplicitAny": false,
//     "typeRoots" : [
//       "../node_modules/@types"
//     ]
//   },
//   "exclude": [
//     "../node_modules"
//   ],
//   "include": [
//     "./**/*.ts"
//   ]
