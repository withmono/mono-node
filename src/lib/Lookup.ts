import { AxiosInstance } from "axios";
import { BaseLib } from "../base-lib/BaseLib";

/**
 * General lookup – bank listing, address, passport, TIN, NIN, driver's license,
 * account number, credit history, mashup.
 */
export class Lookup extends BaseLib {
  constructor(protected readonly axios: AxiosInstance) {
    super(axios);
  }

  /** Bank listing (NIP). GET /v3/lookup/banks */
  bankListing(callback?: (err: unknown, data: unknown) => void) {
    return this.sendRequest(this.axios.get("/v3/lookup/banks"), callback);
  }

  /** Address lookup. POST /v3/lookup/address */
  address(data: Record<string, unknown>, callback?: (err: unknown, data: unknown) => void) {
    return this.sendRequest(this.axios.post("/v3/lookup/address", data), callback);
  }

  /** International passport. POST /v3/lookup/passport */
  intlPassport(data: Record<string, unknown>, callback?: (err: unknown, data: unknown) => void) {
    return this.sendRequest(this.axios.post("/v3/lookup/passport", data), callback);
  }

  /** TIN lookup. POST /v3/lookup/tin */
  tin(data: Record<string, unknown>, callback?: (err: unknown, data: unknown) => void) {
    return this.sendRequest(this.axios.post("/v3/lookup/tin", data), callback);
  }

  /** NIN lookup. POST /v3/lookup/nin */
  nin(data: Record<string, unknown>, callback?: (err: unknown, data: unknown) => void) {
    return this.sendRequest(this.axios.post("/v3/lookup/nin", data), callback);
  }

  /** Poll NIN job. GET /v3/lookup/nin/:jobId/job */
  pollNinJob(jobId: string, callback?: (err: unknown, data: unknown) => void) {
    return this.sendRequest(this.axios.get(`/v3/lookup/nin/${jobId}/job`), callback);
  }

  /** Driver's license. POST /v3/lookup/driver_license */
  driversLicense(data: Record<string, unknown>, callback?: (err: unknown, data: unknown) => void) {
    return this.sendRequest(this.axios.post("/v3/lookup/driver_license", data), callback);
  }

  /** Account number lookup. POST /v3/lookup/account-number */
  accountNumber(data: Record<string, unknown>, callback?: (err: unknown, data: unknown) => void) {
    return this.sendRequest(this.axios.post("/v3/lookup/account-number", data), callback);
  }

  /** Credit history. POST /v3/lookup/credit-history/:provider */
  creditHistory(provider: string, data: Record<string, unknown>, callback?: (err: unknown, data: unknown) => void) {
    return this.sendRequest(this.axios.post(`/v3/lookup/credit-history/${provider}`, data), callback);
  }

  /** Mashup. POST /v3/lookup/mashup */
  mashup(data: Record<string, unknown>, callback?: (err: unknown, data: unknown) => void) {
    return this.sendRequest(this.axios.post("/v3/lookup/mashup", data), callback);
  }
}

/**
 * BVN lookup – initiate, verify OTP, fetch details.
 */
export class BvnLookup extends BaseLib {
  constructor(protected readonly axios: AxiosInstance) {
    super(axios);
  }

  /** Initiate BVN lookup. POST /v2/lookup/bvn/initiate */
  initiate(data: Record<string, unknown>, callback?: (err: unknown, data: unknown) => void) {
    return this.sendRequest(this.axios.post("/v2/lookup/bvn/initiate", data), callback);
  }

  /** Verify BVN OTP. POST /v2/lookup/bvn/verify */
  verifyOtp(data: Record<string, unknown>, callback?: (err: unknown, data: unknown) => void) {
    return this.sendRequest(this.axios.post("/v2/lookup/bvn/verify", data), callback);
  }

  /** Fetch BVN details. POST /v2/lookup/bvn/details */
  fetchDetails(data: Record<string, unknown>, callback?: (err: unknown, data: unknown) => void) {
    return this.sendRequest(this.axios.post("/v2/lookup/bvn/details", data), callback);
  }
}

/**
 * CAC lookup – business, shareholder, PSC, secretary, directors, profile, status report.
 */
export class CacLookup extends BaseLib {
  constructor(protected readonly axios: AxiosInstance) {
    super(axios);
  }

  /** Lookup a business. GET /v3/lookup/cac (query: search, exact?) */
  business(params: { search: string; exact?: boolean }, callback?: (err: unknown, data: unknown) => void) {
    return this.sendRequest(this.axios.get("/v3/lookup/cac", { params }), callback);
  }

  /** Shareholder details. GET /v3/lookup/cac/company/:id */
  shareholder(id: string, callback?: (err: unknown, data: unknown) => void) {
    return this.sendRequest(this.axios.get(`/v3/lookup/cac/company/${id}`), callback);
  }

  /** Persons with significant control. GET /v3/lookup/cac/company/:id/psc */
  psc(id: string, callback?: (err: unknown, data: unknown) => void) {
    return this.sendRequest(this.axios.get(`/v3/lookup/cac/company/${id}/psc`), callback);
  }

  /** Secretary. GET /v3/lookup/cac/company/:id/secretary */
  secretary(id: string, callback?: (err: unknown, data: unknown) => void) {
    return this.sendRequest(this.axios.get(`/v3/lookup/cac/company/${id}/secretary`), callback);
  }

  /** Directors. GET /v3/lookup/cac/company/:id/directors */
  directors(id: string, callback?: (err: unknown, data: unknown) => void) {
    return this.sendRequest(this.axios.get(`/v3/lookup/cac/company/${id}/directors`), callback);
  }

  /** Profile. GET /v3/lookup/cac/profile/:rcnumber */
  profile(rcNumber: string, callback?: (err: unknown, data: unknown) => void) {
    return this.sendRequest(this.axios.get(`/v3/lookup/cac/profile/${encodeURIComponent(rcNumber)}`), callback);
  }

  /** Status report. GET /v3/lookup/cac/company/:id/status-report */
  statusReport(id: string, callback?: (err: unknown, data: unknown) => void) {
    return this.sendRequest(this.axios.get(`/v3/lookup/cac/company/${id}/status-report`), callback);
  }
}
