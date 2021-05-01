import {AxiosInstance, AxiosError} from 'axios'
import {BaseLib} from "../base-lib/BaseLib";

interface AccountId {
    accountId: string
}

interface AccountStatementOptions {
    accountId: string,
    period: string,
    output?: "pdf" | "json"
}

interface pollPdfAccountStatementStatusOptions {
    accountId: string,
    jobId: string
}

interface AccountTransactionsOptions {
    accountId: string,
    start?: string,
    end?: string,
    narration?: string,
    type?: "debit" | "credit",
    paginate?: boolean,
    limit?: number,
}

export class Account extends BaseLib {
    protected readonly path: string;

    constructor(protected readonly axios: AxiosInstance) {
        super(axios);
        this.path = '/accounts'
    }

    async getAccountInformation(data: AccountId, callback?: any) {
        return this.sendRequest( this.axios.get(`${this.path}/${data.accountId}` ), callback).catch(err => {
            // console.log(err);
        })
    }

    async getAccountStatement(data: AccountStatementOptions, callback?: any) {
        let query = "?";
        query += (data.period ? `period=${data.period}&` : '');
        query += (data.output ? `output=${data.output}&` : '');
        
        return this.sendRequest( this.axios.get(`${this.path}/${data.accountId}/statement${query}` ), callback).catch(err => {
            // console.log(err);
        })
    }

    async pollPdfAccountStatementStatus(data: pollPdfAccountStatementStatusOptions, callback?: any) {
        return this.sendRequest( this.axios.get(`${this.path}/${data.accountId}/statement/jobs/${data.jobId}` ), callback).catch(err => {
            // console.log(err);
        })
    }

    async getAccountTransactions(data: AccountTransactionsOptions, callback?: any) {
        let query = "?";
        query += (data.start ? `start=${data.start}&` : '');
        query += (data.end ? `end=${data.end}&` : '');
        query += (data.narration ? `narration=${data.narration}&` : '');
        query += (data.type ? `type=${data.type}&` : '');
        query += ((!data.paginate && data.paginate === false) ? `paginate=${false}&` : `paginate=${true}&`);
        query += (data.limit ? `limit=${data.limit}&` : '');
        
        return this.sendRequest( this.axios.get(`${this.path}/${data.accountId}/transactions${query}` ), callback).catch(err => {
            // console.log(err);
        })
    }

    async getCustomerCredits(data: AccountId, callback?: any) {
        return this.sendRequest( this.axios.get(`${this.path}/${data.accountId}/credits` ), callback).catch(err => {
            // console.log(err);
        })
    }

    async getCustomerDebits(data: AccountId, callback?: any) {
        return this.sendRequest( this.axios.get(`${this.path}/${data.accountId}/debits` ), callback).catch(err => {
            // console.log(err);
        })
    }

    async getIncome(data: AccountId, callback?: any) {
        return this.sendRequest( this.axios.get(`${this.path}/${data.accountId}/income` ), callback).catch(err => {
            // console.log(err);
        })
    }

    async getIdentity(data: AccountId, callback?: any) {
        return this.sendRequest( this.axios.get(`${this.path}/${data.accountId}/identity` ), callback).catch(err => {
            // console.log(err);
        })
    }

    async syncDataManually(data: AccountId, callback?: any) {
        return this.sendRequest( this.axios.post(`${this.path}/${data.accountId}/sync` ), callback).catch(err => {
            // console.log(err);
        })
    }

    async reauthCode(data: AccountId, callback?: any) {
        return this.sendRequest( this.axios.post(`${this.path}/${data.accountId}/reauthorise` ), callback).catch(err => {
            // console.log(err);
        })
    }

    async unlinkAccount(data: AccountId, callback?: any) {
        return this.sendRequest( this.axios.post(`${this.path}/${data.accountId}/unlink` ), callback).catch(err => {
            // console.log(err);
        })
    }
    
}


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