import { AxiosInstance } from "axios";
import { BaseLib } from "../base-lib/BaseLib";
interface AccountId {
    accountId: string;
}
interface AccountStatementOptions {
    accountId: string;
    period: string;
    output?: "pdf" | "json";
}
interface pollPdfAccountStatementStatusOptions {
    accountId: string;
    jobId: string;
}
interface AccountTransactionsOptions {
    accountId: string;
    start?: string;
    end?: string;
    narration?: string;
    type?: "debit" | "credit";
    paginate?: boolean;
    limit?: number;
}
export declare class Account extends BaseLib {
    protected readonly axios: AxiosInstance;
    protected readonly path: string;
    constructor(axios: AxiosInstance);
    getAccountInformation(data: AccountId, callback?: any): Promise<any>;
    getAccountStatement(data: AccountStatementOptions, callback?: any): Promise<any>;
    pollPdfAccountStatementStatus(data: pollPdfAccountStatementStatusOptions, callback?: any): Promise<any>;
    getAccountTransactions(data: AccountTransactionsOptions, callback?: any): Promise<any>;
    getCustomerCredits(data: AccountId, callback?: any): Promise<any>;
    getCustomerDebits(data: AccountId, callback?: any): Promise<any>;
    getIncome(data: AccountId, callback?: any): Promise<any>;
    getIdentity(data: AccountId, callback?: any): Promise<any>;
    syncDataManually(data: AccountId, callback?: any): Promise<any>;
    reauthCode(data: AccountId, callback?: any): Promise<any>;
    unlinkAccount(data: AccountId, callback?: any): Promise<any>;
}
export {};
