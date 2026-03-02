import { AxiosInstance } from "axios";
import { BaseLib } from "../base-lib/BaseLib";
/**
 * Miscellaneous API – bank coverage (institutions).
 * @see https://docs.mono.co/api/miscellaneous/bank-coverage
 */
export declare class Misc extends BaseLib {
    protected readonly axios: AxiosInstance;
    constructor(axios: AxiosInstance);
    /** Bank coverage – supported institutions and product scopes. GET /v3/institutions */
    bankCoverage(params?: Record<string, string>, callback?: (err: unknown, data: unknown) => void): Promise<any>;
}
//# sourceMappingURL=Misc.d.ts.map