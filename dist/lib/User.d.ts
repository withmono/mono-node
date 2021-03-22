import { AxiosInstance } from 'axios';
import { BaseLib } from "../base-lib/BaseLib";
export declare class User extends BaseLib {
    protected readonly axios: AxiosInstance;
    protected readonly path: string;
    constructor(axios: AxiosInstance);
    walletBalance(callback?: any): Promise<any>;
}
