import { AxiosInstance } from "axios";
export declare class BaseLib {
    protected readonly axios: AxiosInstance;
    constructor(axios: AxiosInstance);
    protected sendRequest(axiosRequest: any, callback?: any): Promise<any>;
}
