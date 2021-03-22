import { AxiosInstance } from 'axios';
import { BaseLib } from "../base-lib/BaseLib";
interface AccountCodeOptions {
    code: string;
}
export declare class Auth extends BaseLib {
    protected readonly axios: AxiosInstance;
    protected readonly path: string;
    constructor(axios: AxiosInstance);
    getAccountId(data: AccountCodeOptions, callback?: any): Promise<any>;
}
export {};
