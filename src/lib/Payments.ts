import { AxiosInstance } from "axios";
import { BaseLib } from "../base-lib/BaseLib";

/**
 * One-time payments – initiate, verify, fetch all.
 */
export class OneTimePayments extends BaseLib {
  constructor(protected readonly axios: AxiosInstance) {
    super(axios);
  }

  /** Initiate a payment. POST /v2/payments/initiate */
  initiate(data: Record<string, unknown>, callback?: (err: unknown, data: unknown) => void) {
    return this.sendRequest(this.axios.post("/v2/payments/initiate", data), callback);
  }

  /** Verify payment status. GET /v2/payments/verify/:reference */
  verify(reference: string, callback?: (err: unknown, data: unknown) => void) {
    return this.sendRequest(this.axios.get(`/v2/payments/verify/${reference}`), callback);
  }

  /** Fetch all payments. GET /v2/payments/transactions */
  fetchAll(params?: Record<string, string>, callback?: (err: unknown, data: unknown) => void) {
    return this.sendRequest(this.axios.get("/v2/payments/transactions", { params }), callback);
  }
}

/**
 * Recurring payments – mandates and mandate accounts.
 */
export class RecurringPayments extends BaseLib {
  constructor(protected readonly axios: AxiosInstance) {
    super(axios);
  }

  // --- Mandates ---
  /** Get banks. GET /v3/banks/list */
  getBanks(callback?: (err: unknown, data: unknown) => void) {
    return this.sendRequest(this.axios.get("/v3/banks/list"), callback);
  }

  /** Initiate mandate authorisation. POST /v2/payments/initiate (type: recurring-debit) */
  initiateMandate(data: Record<string, unknown>, callback?: (err: unknown, data: unknown) => void) {
    return this.sendRequest(this.axios.post("/v2/payments/initiate", data), callback);
  }

  /** Create a mandate. POST /v3/payments/mandates */
  createMandate(data: Record<string, unknown>, callback?: (err: unknown, data: unknown) => void) {
    return this.sendRequest(this.axios.post("/v3/payments/mandates", data), callback);
  }

  /** Retrieve a mandate. GET /v3/payments/mandates/:id */
  getMandate(id: string, callback?: (err: unknown, data: unknown) => void) {
    return this.sendRequest(this.axios.get(`/v3/payments/mandates/${id}`), callback);
  }

  /** Get all mandates. GET /v3/payments/mandates */
  getAllMandates(params?: Record<string, string>, callback?: (err: unknown, data: unknown) => void) {
    return this.sendRequest(this.axios.get("/v3/payments/mandates", { params }), callback);
  }

  /** Cancel mandate. PATCH /v3/payments/mandates/:id/cancel */
  cancelMandate(id: string, callback?: (err: unknown, data: unknown) => void) {
    return this.sendRequest(this.axios.patch(`/v3/payments/mandates/${id}/cancel`), callback);
  }

  /** Pause mandate. PATCH /v3/payments/mandates/:id/pause */
  pauseMandate(id: string, callback?: (err: unknown, data: unknown) => void) {
    return this.sendRequest(this.axios.patch(`/v3/payments/mandates/${id}/pause`), callback);
  }

  /** Reinstate mandate. PATCH /v3/payments/mandates/:id/reinstate */
  reinstateMandate(id: string, callback?: (err: unknown, data: unknown) => void) {
    return this.sendRequest(this.axios.patch(`/v3/payments/mandates/${id}/reinstate`), callback);
  }

  // --- Mandate accounts ---
  /** Balance inquiry. GET /v3/payments/mandates/:id/balance-inquiry */
  balanceInquiry(id: string, params?: Record<string, string>, callback?: (err: unknown, data: unknown) => void) {
    return this.sendRequest(this.axios.get(`/v3/payments/mandates/${id}/balance-inquiry`, { params }), callback);
  }

  /** Debit account. POST /v3/payments/mandates/:id/debit */
  debitAccount(id: string, data: Record<string, unknown>, callback?: (err: unknown, data: unknown) => void) {
    return this.sendRequest(this.axios.post(`/v3/payments/mandates/${id}/debit`, data), callback);
  }

  /** Retrieve a debit. GET /v3/payments/mandates/:id/debit/:reference */
  getDebit(mandateId: string, reference: string, callback?: (err: unknown, data: unknown) => void) {
    return this.sendRequest(this.axios.get(`/v3/payments/mandates/${mandateId}/debit/${reference}`), callback);
  }

  /** Retrieve all debits. GET /v3/payments/mandates/:id/debits */
  getAllDebits(id: string, params?: Record<string, string>, callback?: (err: unknown, data: unknown) => void) {
    return this.sendRequest(this.axios.get(`/v3/payments/mandates/${id}/debits`, { params }), callback);
  }
}

/**
 * Money operations – payout, refund, sub-accounts.
 */
export class MoneyOperations extends BaseLib {
  constructor(protected readonly axios: AxiosInstance) {
    super(axios);
  }

  /** Payouts. GET /v2/payments/payouts */
  getPayouts(params?: Record<string, string>, callback?: (err: unknown, data: unknown) => void) {
    return this.sendRequest(this.axios.get("/v2/payments/payouts", { params }), callback);
  }

  /** Payout transactions. GET /v2/payments/payout/:payout/transactions */
  getPayoutTransactions(payoutId: string, params?: Record<string, string>, callback?: (err: unknown, data: unknown) => void) {
    return this.sendRequest(this.axios.get(`/v2/payments/payout/${payoutId}/transactions`, { params }), callback);
  }

  /** Refund. POST /v2/payments/refund */
  refund(data: Record<string, unknown>, callback?: (err: unknown, data: unknown) => void) {
    return this.sendRequest(this.axios.post("/v2/payments/refund", data), callback);
  }

  /** Create sub-account. POST /v2/payments/payout/sub-account */
  createSubAccount(data: Record<string, unknown>, callback?: (err: unknown, data: unknown) => void) {
    return this.sendRequest(this.axios.post("/v2/payments/payout/sub-account", data), callback);
  }

  /** Fetch all sub-accounts. GET /v2/payments/payout/sub-accounts */
  getSubAccounts(callback?: (err: unknown, data: unknown) => void) {
    return this.sendRequest(this.axios.get("/v2/payments/payout/sub-accounts"), callback);
  }
}

/**
 * WhatsApp (OWO) payment – users, beneficiaries, fund requests, payments.
 */
export class WhatsAppPayment extends BaseLib {
  constructor(protected readonly axios: AxiosInstance) {
    super(axios);
  }

  /** Check user status. GET /owo/v1/users/status */
  checkUserStatus(params?: Record<string, string>, callback?: (err: unknown, data: unknown) => void) {
    return this.sendRequest(this.axios.get("/owo/v1/users/status", { params }), callback);
  }

  /** Link beneficiary. POST /owo/v1/beneficiaries/link */
  linkBeneficiary(data: Record<string, unknown>, callback?: (err: unknown, data: unknown) => void) {
    return this.sendRequest(this.axios.post("/owo/v1/beneficiaries/link", data), callback);
  }

  /** Unlink beneficiary. POST /owo/v1/beneficiaries/unlink */
  unlinkBeneficiary(data: Record<string, unknown>, callback?: (err: unknown, data: unknown) => void) {
    return this.sendRequest(this.axios.post("/owo/v1/beneficiaries/unlink", data), callback);
  }

  /** Get beneficiary. GET /owo/v1/beneficiaries/:id */
  getBeneficiary(id: string, callback?: (err: unknown, data: unknown) => void) {
    return this.sendRequest(this.axios.get(`/owo/v1/beneficiaries/${id}`), callback);
  }

  /** Get all beneficiaries. GET /owo/v1/beneficiaries */
  getAllBeneficiaries(callback?: (err: unknown, data: unknown) => void) {
    return this.sendRequest(this.axios.get("/owo/v1/beneficiaries"), callback);
  }

  /** One-time fund request. POST /owo/v1/fund-requests */
  createFundRequestOneTime(data: Record<string, unknown>, callback?: (err: unknown, data: unknown) => void) {
    return this.sendRequest(this.axios.post("/owo/v1/fund-requests", data), callback);
  }

  /** Recurring fund request. POST /owo/v1/fund-requests */
  createFundRequestRecurring(data: Record<string, unknown>, callback?: (err: unknown, data: unknown) => void) {
    return this.sendRequest(this.axios.post("/owo/v1/fund-requests", data), callback);
  }

  /** All fund requests. GET /owo/v1/fund-requests */
  getAllFundRequests(params?: Record<string, string>, callback?: (err: unknown, data: unknown) => void) {
    return this.sendRequest(this.axios.get("/owo/v1/fund-requests", { params }), callback);
  }

  /** Fund request by ID. GET /owo/v1/fund-requests/:id */
  getFundRequest(id: string, callback?: (err: unknown, data: unknown) => void) {
    return this.sendRequest(this.axios.get(`/owo/v1/fund-requests/${id}`), callback);
  }

  /** All payment details for a fund request. GET /owo/v1/fund-requests/:fund_request_id/payments */
  getAllPayments(fundRequestId: string, callback?: (err: unknown, data: unknown) => void) {
    return this.sendRequest(this.axios.get(`/owo/v1/fund-requests/${fundRequestId}/payments`), callback);
  }

  /** Single payment details. GET /owo/v1/fund-requests/:fund_request_id/payments/:payment_id */
  getPayment(fundRequestId: string, paymentId: string, callback?: (err: unknown, data: unknown) => void) {
    return this.sendRequest(this.axios.get(`/owo/v1/fund-requests/${fundRequestId}/payments/${paymentId}`), callback);
  }
}

/**
 * Disburse – source accounts, disbursements, distributions.
 */
export class Disburse extends BaseLib {
  constructor(protected readonly axios: AxiosInstance) {
    super(axios);
  }

  /** Create source account. POST /v3/payments/disburse/source-accounts */
  createSourceAccount(data: Record<string, unknown>, callback?: (err: unknown, data: unknown) => void) {
    return this.sendRequest(this.axios.post("/v3/payments/disburse/source-accounts", data), callback);
  }

  /** Update source account. PUT /v3/payments/disburse/source-accounts/:id/status */
  updateSourceAccount(id: string, data: Record<string, unknown>, callback?: (err: unknown, data: unknown) => void) {
    return this.sendRequest(this.axios.put(`/v3/payments/disburse/source-accounts/${id}/status`, data), callback);
  }

  /** Fetch source accounts. GET /v3/payments/disburse/source-accounts */
  getSourceAccounts(callback?: (err: unknown, data: unknown) => void) {
    return this.sendRequest(this.axios.get("/v3/payments/disburse/source-accounts"), callback);
  }

  /** Fetch a source account. GET /v3/payments/disburse/source-accounts/:id */
  getSourceAccount(id: string, callback?: (err: unknown, data: unknown) => void) {
    return this.sendRequest(this.axios.get(`/v3/payments/disburse/source-accounts/${id}`), callback);
  }

  /** Create instant disbursement. POST /v3/payments/disburse/disbursements */
  createInstantDisbursement(data: Record<string, unknown>, callback?: (err: unknown, data: unknown) => void) {
    return this.sendRequest(this.axios.post("/v3/payments/disburse/disbursements", data), callback);
  }

  /** Create scheduled disbursement. POST /v3/payments/disburse/disbursements */
  createScheduledDisbursement(data: Record<string, unknown>, callback?: (err: unknown, data: unknown) => void) {
    return this.sendRequest(this.axios.post("/v3/payments/disburse/disbursements", data), callback);
  }

  /** Transition disbursement. POST /v3/payments/disburse/disbursements/:batch_id/transition */
  transitionDisbursement(batchId: string, data: Record<string, unknown>, callback?: (err: unknown, data: unknown) => void) {
    return this.sendRequest(this.axios.post(`/v3/payments/disburse/disbursements/${batchId}/transition`, data), callback);
  }

  /** Add distributions to batch. POST /v3/payments/disburse/disbursements/:batch_id/distributions */
  addDistributions(batchId: string, data: Record<string, unknown>, callback?: (err: unknown, data: unknown) => void) {
    return this.sendRequest(this.axios.post(`/v3/payments/disburse/disbursements/${batchId}/distributions`, data), callback);
  }

  /** Update distribution in batch. PATCH /v3/payments/disburse/disbursements/:batch_id/distributions/:distribution_id/update */
  updateDistribution(batchId: string, distributionId: string, data: Record<string, unknown>, callback?: (err: unknown, data: unknown) => void) {
    return this.sendRequest(this.axios.patch(`/v3/payments/disburse/disbursements/${batchId}/distributions/${distributionId}/update`, data), callback);
  }

  /** Fetch all disbursements. GET /v3/payments/disburse/disbursements */
  getAllDisbursements(params?: Record<string, string>, callback?: (err: unknown, data: unknown) => void) {
    return this.sendRequest(this.axios.get("/v3/payments/disburse/disbursements", { params }), callback);
  }

  /** Fetch a disbursement. GET /v3/payments/disburse/disbursements/:disbursement_id */
  getDisbursement(disbursementId: string, callback?: (err: unknown, data: unknown) => void) {
    return this.sendRequest(this.axios.get(`/v3/payments/disburse/disbursements/${disbursementId}`), callback);
  }

  /** Fetch all distributions in a batch. GET /v3/payments/disburse/disbursements/:batch_id/distributions */
  getAllDistributions(batchId: string, callback?: (err: unknown, data: unknown) => void) {
    return this.sendRequest(this.axios.get(`/v3/payments/disburse/disbursements/${batchId}/distributions`), callback);
  }

  /** Fetch a single distribution. GET /v3/payments/disburse/disbursements/:batch_id/distribution/:distribution_id */
  getDistribution(batchId: string, distributionId: string, callback?: (err: unknown, data: unknown) => void) {
    return this.sendRequest(this.axios.get(`/v3/payments/disburse/disbursements/${batchId}/distribution/${distributionId}`), callback);
  }
}
