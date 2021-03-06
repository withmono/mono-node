import {AxiosInstance, AxiosError} from 'axios'
import {ifCallbackIsSupplied} from "../utils";
import {BaseLib} from "../base-lib/BaseLib";

export class Account extends BaseLib {
    protected readonly path: string;

    constructor(protected readonly axios: AxiosInstance) {
        super(axios)
        this.path = '/accounts'
    }

    async getAccountId(data: any, callback?: any) {
        return this.sendRequest(this.axios.get(`${this.path}/stats/wallet`), callback).catch(err => {
            throw err;
        })

    }
}