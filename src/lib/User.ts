import {AxiosInstance, AxiosError} from 'axios'
import {BaseLib} from "../base-lib/BaseLib";

export class User extends BaseLib {
    protected readonly path: string;

    constructor(protected readonly axios: AxiosInstance) {
        super(axios);
        this.path = ''
    }

    async walletBalance(callback?: any) {
        return this.sendRequest(this.axios.get('/users/stats/wallet'), callback).catch(err => {
            // console.log(err);
        })
    }
}
