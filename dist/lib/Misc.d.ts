import { AxiosInstance } from 'axios';
import { BaseLib } from "../base-lib/BaseLib";
interface BvnOptions {
    bvn: string;
}
export declare class Misc extends BaseLib {
    protected readonly axios: AxiosInstance;
    protected readonly path: string;
    constructor(axios: AxiosInstance);
    bvnLookup(data: BvnOptions, callback?: any): Promise<any>;
    institutions(callback?: any): Promise<any>;
}
export {};
