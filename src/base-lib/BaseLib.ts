import {ifCallbackIsSupplied} from "../utils";
import {AxiosError, AxiosInstance} from "axios";

export class BaseLib {
    constructor(protected readonly axios: AxiosInstance) {
    }

    protected async sendRequest(axiosRequest: any, callback?: any) {
        try {
            const response = await axiosRequest;
            if (ifCallbackIsSupplied(callback)) {
                callback(null, response.data);
            }
            return Promise.resolve(response);
        } catch(error ){
            const err = error as AxiosError;

            if (ifCallbackIsSupplied(callback)) {
                callback(err.response ? err.response.data : err, null)
            }
            return Promise.reject(err)
        }
    }
}