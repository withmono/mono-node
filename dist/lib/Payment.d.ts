import { AxiosInstance } from 'axios';
import { BaseLib } from '../base-lib/BaseLib';
interface PaymentInitializationOptions {
    amount: number;
    type: 'onetime-debit';
    description: string;
    reference: string;
    accountID?: string;
    redirect_url?: string;
    meta: Object;
}
interface VerifyPaymentOption {
    reference: string;
}
export declare class Payment extends BaseLib {
    protected readonly axios: AxiosInstance;
    protected readonly path = "v1/payments/";
    constructor(axios: AxiosInstance);
    initiate(data: PaymentInitializationOptions, callback?: any): Promise<any>;
    verify(data: VerifyPaymentOption, callback?: any): Promise<any>;
}
export {};
