import { AxiosInstance } from "axios";
import { BaseLib } from "../base-lib/BaseLib";

/**
 * Bank Data API – authorisation, partners API, account, statements,
 * transactions, investment, data enrichment, inflow/outflow.
 * Excludes deprecated: Re-auth Code (POST /accounts/:id/reauthorise).
 */
export class BankData extends BaseLib {
  constructor(protected readonly axios: AxiosInstance) {
    super(axios);
  }

  // --- Authorisation ---
  /** Initiate account linking. POST /v2/accounts/initiate */
  initiateAccountLinking(data: Record<string, unknown>, callback?: (err: unknown, data: unknown) => void) {
    return this.sendRequest(this.axios.post("/v2/accounts/initiate", data), callback);
  }

  /** Exchange token for account ID. POST /v2/accounts/auth */
  exchangeToken(data: { code: string }, callback?: (err: unknown, data: unknown) => void) {
    return this.sendRequest(this.axios.post("/v2/accounts/auth", data), callback);
  }

  /** Initiate account re-authorisation. POST /v2/accounts/initiate (re-auth flow) */
  initiateAccountReauth(data: Record<string, unknown>, callback?: (err: unknown, data: unknown) => void) {
    return this.sendRequest(this.axios.post("/v2/accounts/initiate", data), callback);
  }

  // --- Partners API ---
  /** Create connect session. POST /v2/connect/session */
  createSession(data: Record<string, unknown>, callback?: (err: unknown, data: unknown) => void) {
    return this.sendRequest(this.axios.post("/v2/connect/session", data), callback);
  }

  /**
   * Login. POST /v2/connect/login
   * Requires x-session-id header (Connect session ID from createSession).
   */
  login(data: Record<string, unknown>, sessionId: string, callback?: (err: unknown, data: unknown) => void) {
    return this.sendRequest(
      this.axios.post("/v2/connect/login", data, { headers: { "x-session-id": sessionId } }),
      callback
    );
  }

  /**
   * Commit session. POST /v2/connect/commit
   * Requires x-session-id header (Connect session ID).
   */
  commitSession(data: Record<string, unknown>, sessionId: string, callback?: (err: unknown, data: unknown) => void) {
    return this.sendRequest(
      this.axios.post("/v2/connect/commit", data, { headers: { "x-session-id": sessionId } }),
      callback
    );
  }

  /** Reauth session. POST /v2/connect/reauth/session */
  reauthSession(data: Record<string, unknown>, callback?: (err: unknown, data: unknown) => void) {
    return this.sendRequest(this.axios.post("/v2/connect/reauth/session", data), callback);
  }

  /**
   * Reauth login. POST /v2/connect/reauth/login
   * Requires x-session-id header (Connect session ID).
   */
  reauthLogin(data: Record<string, unknown>, sessionId: string, callback?: (err: unknown, data: unknown) => void) {
    return this.sendRequest(
      this.axios.post("/v2/connect/reauth/login", data, { headers: { "x-session-id": sessionId } }),
      callback
    );
  }

  /**
   * Retrieve sandbox credentials. POST /v2/connect/sandbox
   * Requires x-session-id header (Connect session ID).
   */
  getSandboxCredentials(sessionId: string, data?: Record<string, unknown>, callback?: (err: unknown, data: unknown) => void) {
    return this.sendRequest(
      this.axios.post("/v2/connect/sandbox", data ?? {}, { headers: { "x-session-id": sessionId } }),
      callback
    );
  }

  // --- Account ---
  /** Account details. GET /v2/accounts/:id */
  getAccountDetails(id: string, callback?: (err: unknown, data: unknown) => void) {
    return this.sendRequest(this.axios.get(`/v2/accounts/${id}`), callback);
  }

  /** Account identity. GET /v2/accounts/:id/identity */
  getIdentity(id: string, callback?: (err: unknown, data: unknown) => void) {
    return this.sendRequest(this.axios.get(`/v2/accounts/${id}/identity`), callback);
  }

  /**
   * Account balance. GET /v2/accounts/:id/balance
   * Optional: pass { realtime: true } to request real-time data (x-realtime header). See https://docs.mono.co/docs/financial-data/realtime-data
   */
  getBalance(
    id: string,
    optionsOrCallback?: { realtime?: boolean } | ((err: unknown, data: unknown) => void),
    callback?: (err: unknown, data: unknown) => void
  ) {
    const options = typeof optionsOrCallback === "function" ? undefined : optionsOrCallback;
    const cb = typeof optionsOrCallback === "function" ? optionsOrCallback : callback;
    const headers = options?.realtime ? { "x-realtime": "true" } : undefined;
    return this.sendRequest(this.axios.get(`/v2/accounts/${id}/balance`, { headers }), cb);
  }

  /** Income. GET /v2/accounts/:id/income */
  getIncome(id: string, params?: Record<string, string>, callback?: (err: unknown, data: unknown) => void) {
    return this.sendRequest(this.axios.get(`/v2/accounts/${id}/income`, { params }), callback);
  }

  /** Income records. GET /v2/accounts/:id/income-records */
  getIncomeRecords(id: string, params?: Record<string, string>, callback?: (err: unknown, data: unknown) => void) {
    return this.sendRequest(this.axios.get(`/v2/accounts/${id}/income-records`, { params }), callback);
  }

  /** Get all accounts. GET /v2/accounts */
  getAccounts(params?: Record<string, string>, callback?: (err: unknown, data: unknown) => void) {
    return this.sendRequest(this.axios.get("/v2/accounts", { params }), callback);
  }

  /** Creditworthiness. POST /v2/accounts/:id/creditworthiness */
  getCreditworthiness(id: string, data?: Record<string, unknown>, callback?: (err: unknown, data: unknown) => void) {
    return this.sendRequest(this.axios.post(`/v2/accounts/${id}/creditworthiness`, data ?? {}), callback);
  }

  /** Unlink account. POST /v2/accounts/:id/unlink */
  unlink(id: string, callback?: (err: unknown, data: unknown) => void) {
    return this.sendRequest(this.axios.post(`/v2/accounts/${id}/unlink`), callback);
  }

  // --- Statements ---
  /** Bank statement. GET /v2/accounts/:id/statement */
  getStatement(id: string, params?: Record<string, string>, callback?: (err: unknown, data: unknown) => void) {
    return this.sendRequest(this.axios.get(`/v2/accounts/${id}/statement`, { params }), callback);
  }

  /** Poll PDF status. GET /v2/accounts/:id/statement/jobs/:jobId */
  pollPdfStatus(accountId: string, jobId: string, callback?: (err: unknown, data: unknown) => void) {
    return this.sendRequest(this.axios.get(`/v2/accounts/${accountId}/statement/jobs/${jobId}`), callback);
  }

  // --- Transactions ---
  /**
   * Account transactions. GET /v2/accounts/:id/transactions
   * Optional: pass options.realtime true to request real-time data (x-realtime header). See https://docs.mono.co/docs/financial-data/realtime-data
   */
  getTransactions(
    id: string,
    params?: Record<string, string>,
    optionsOrCallback?: { realtime?: boolean } | ((err: unknown, data: unknown) => void),
    callback?: (err: unknown, data: unknown) => void
  ) {
    const options = typeof optionsOrCallback === "function" ? undefined : optionsOrCallback;
    const cb = typeof optionsOrCallback === "function" ? optionsOrCallback : callback;
    const headers = options?.realtime ? { "x-realtime": "true" } : undefined;
    return this.sendRequest(this.axios.get(`/v2/accounts/${id}/transactions`, { params, headers }), cb);
  }

  // --- Investment ---
  /** Assets. GET /v2/accounts/:id/assets */
  getAssets(id: string, callback?: (err: unknown, data: unknown) => void) {
    return this.sendRequest(this.axios.get(`/v2/accounts/${id}/assets`), callback);
  }

  /** Earnings. GET /v2/accounts/:id/earnings */
  getEarnings(id: string, callback?: (err: unknown, data: unknown) => void) {
    return this.sendRequest(this.axios.get(`/v2/accounts/${id}/earnings`), callback);
  }

  // --- Data Enrichment ---
  /** Transaction categorisation. POST /v2/accounts/:id/transactions/categorise */
  categoriseTransactions(id: string, data?: Record<string, unknown>, callback?: (err: unknown, data: unknown) => void) {
    return this.sendRequest(this.axios.post(`/v2/accounts/${id}/transactions/categorise`, data ?? {}), callback);
  }

  /** Transaction categorisation (CSV upload). POST /v2/enrichments/transaction-categorisation */
  categoriseTransactionsCsv(data: Record<string, unknown>, callback?: (err: unknown, data: unknown) => void) {
    return this.sendRequest(this.axios.post("/v2/enrichments/transaction-categorisation", data), callback);
  }

  /** Transaction metadata. POST /v2/accounts/:id/transactions/metadata */
  getTransactionMetadata(id: string, data?: Record<string, unknown>, callback?: (err: unknown, data: unknown) => void) {
    return this.sendRequest(this.axios.post(`/v2/accounts/${id}/transactions/metadata`, data ?? {}), callback);
  }

  /** Transaction metadata (CSV). POST /v2/enrichments/transaction-metadata */
  getTransactionMetadataCsv(data: Record<string, unknown>, callback?: (err: unknown, data: unknown) => void) {
    return this.sendRequest(this.axios.post("/v2/enrichments/transaction-metadata", data), callback);
  }

  /** Statement insights. GET /v2/accounts/:id/statement/insights */
  getStatementInsights(id: string, callback?: (err: unknown, data: unknown) => void) {
    return this.sendRequest(this.axios.get(`/v2/accounts/${id}/statement/insights`), callback);
  }

  /** Enrichment records. GET /v2/enrichments/record/:jobId */
  getEnrichmentRecords(jobId: string, callback?: (err: unknown, data: unknown) => void) {
    return this.sendRequest(this.axios.get(`/v2/enrichments/record/${jobId}`), callback);
  }

  /** Job tracker. GET /v2/accounts/jobs/:id */
  getJob(id: string, callback?: (err: unknown, data: unknown) => void) {
    return this.sendRequest(this.axios.get(`/v2/accounts/jobs/${id}`), callback);
  }

  // --- Inflow/Outflow ---
  /** Credits. GET /v2/accounts/:id/credits */
  getCredits(id: string, params?: Record<string, string>, callback?: (err: unknown, data: unknown) => void) {
    return this.sendRequest(this.axios.get(`/v2/accounts/${id}/credits`, { params }), callback);
  }

  /** Debits. GET /v2/accounts/:id/debits */
  getDebits(id: string, params?: Record<string, string>, callback?: (err: unknown, data: unknown) => void) {
    return this.sendRequest(this.axios.get(`/v2/accounts/${id}/debits`, { params }), callback);
  }

  /** Manual data sync. POST /accounts/:id/sync */
  manualSync(id: string, params?: Record<string, string>, callback?: (err: unknown, data: unknown) => void) {
    return this.sendRequest(this.axios.post(`/accounts/${id}/sync`, null, { params }), callback);
  }
}

/**
 * Telco Data API – authenticate, account details, balances, transactions, identity.
 */
export class TelcoData extends BaseLib {
  constructor(protected readonly axios: AxiosInstance) {
    super(axios);
  }

  /** Login. POST /v2/telecom/auth */
  login(data: Record<string, unknown>, callback?: (err: unknown, data: unknown) => void) {
    return this.sendRequest(this.axios.post("/v2/telecom/auth", data), callback);
  }

  /** OTP verification. POST /v2/telecom/verify */
  verifyOtp(data: Record<string, unknown>, callback?: (err: unknown, data: unknown) => void) {
    return this.sendRequest(this.axios.post("/v2/telecom/verify", data), callback);
  }

  /** Token exchange. POST /v2/accounts/auth */
  tokenExchange(data: Record<string, unknown>, callback?: (err: unknown, data: unknown) => void) {
    return this.sendRequest(this.axios.post("/v2/accounts/auth", data), callback);
  }

  /** Account details. GET /v2/accounts/:id */
  getDetails(id: string, callback?: (err: unknown, data: unknown) => void) {
    return this.sendRequest(this.axios.get(`/v2/accounts/${id}`), callback);
  }

  /** Balances. GET /v2/accounts/:id/balances */
  getBalances(id: string, callback?: (err: unknown, data: unknown) => void) {
    return this.sendRequest(this.axios.get(`/v2/accounts/${id}/balances`), callback);
  }

  /** Transactions. GET /v2/accounts/:id/transactions */
  getTransactions(id: string, params?: Record<string, string>, callback?: (err: unknown, data: unknown) => void) {
    return this.sendRequest(this.axios.get(`/v2/accounts/${id}/transactions`, { params }), callback);
  }

  /** Identity. GET /v2/accounts/:id/identity */
  getIdentity(id: string, callback?: (err: unknown, data: unknown) => void) {
    return this.sendRequest(this.axios.get(`/v2/accounts/${id}/identity`), callback);
  }
}
