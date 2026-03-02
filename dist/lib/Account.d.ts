import { AxiosInstance } from 'axios';
import { BaseLib } from "../base-lib/BaseLib";
export declare class Account extends BaseLib {
    protected readonly axios: AxiosInstance;
    protected readonly path: string;
    constructor(axios: AxiosInstance);
    getAccountId(data: any, callback?: any): Promise<any>;
}
//# sourceMappingURL=Account.d.ts.map