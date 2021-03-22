import {AxiosInstance, AxiosError} from 'axios'
import {BaseLib} from "../base-lib/BaseLib";

interface AccountCodeOptions{
    code: string
}

export class Auth extends BaseLib {
    protected readonly path: string;

    constructor(protected readonly axios: AxiosInstance) {
        super(axios);
        this.path = '/account/auth'
    }

    async getAccountId(data: AccountCodeOptions, callback?: any) {
        return this.sendRequest(this.axios.post(this.path,data), callback).catch(err => {
            // console.log(err);
        })
    }
}