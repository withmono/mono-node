import {AxiosInstance, AxiosError} from 'axios'
import {BaseLib} from "../base-lib/BaseLib";

interface BvnOptions {
    bvn: string
}

export class Misc extends BaseLib {
    protected readonly path: string;

    constructor(protected readonly axios: AxiosInstance) {
        super(axios);
        this.path = ''
    }

    async bvnLookup(data: BvnOptions, callback?: any) {
        return this.sendRequest(this.axios.post('/v1/lookup/bvn/identity', data), callback).catch(err => {
            // console.log(err);
        })
    }

    async institutions(callback?: any) {
        return this.sendRequest(this.axios.get('/coverage'), callback).catch(err => {
            // console.log(err);
        })
    }
}
