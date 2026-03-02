import {AxiosInstance} from 'axios'
import {BaseLib} from "../base-lib/BaseLib";

export class User extends BaseLib {
    protected readonly path: string;

    constructor(protected readonly axios: AxiosInstance) {
        super(axios)
        this.path = '/users';
    }

    async getWalletBalance(callback: any) {
        return this.sendRequest(this.axios.get(`${this.path}/stats/wallet`), callback).catch(err => {
            throw err;
        })
    }
}