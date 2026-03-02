import { AxiosInstance } from "axios";
import { BaseLib } from "../base-lib/BaseLib";

/**
 * Mono Prove API – KYC verification: initiate, fetch details,
 * blacklist, whitelist, revoke data access.
 * @see https://docs.mono.co/api/prove/initiate
 */
export class Prove extends BaseLib {
  constructor(protected readonly axios: AxiosInstance) {
    super(axios);
  }

  /** Initiate Prove session. POST /v1/prove/initiate */
  initiate(data: Record<string, unknown>, callback?: (err: unknown, data: unknown) => void) {
    return this.sendRequest(this.axios.post("/v1/prove/initiate", data), callback);
  }

  /** Fetch customer details. GET /v1/prove/customers/:reference */
  fetchCustomerDetails(reference: string, callback?: (err: unknown, data: unknown) => void) {
    return this.sendRequest(this.axios.get(`/v1/prove/customers/${reference}`), callback);
  }

  /** Fetch all customer details. GET /v1/prove/customers */
  fetchAllDetails(params?: Record<string, string>, callback?: (err: unknown, data: unknown) => void) {
    return this.sendRequest(this.axios.get("/v1/prove/customers", { params }), callback);
  }

  /** Blacklist customer. POST /v1/prove/customers/blacklist */
  blacklist(data: Record<string, unknown>, callback?: (err: unknown, data: unknown) => void) {
    return this.sendRequest(this.axios.post("/v1/prove/customers/blacklist", data), callback);
  }

  /** Whitelist customer. POST /v1/prove/customers/whitelist */
  whitelist(data: Record<string, unknown>, callback?: (err: unknown, data: unknown) => void) {
    return this.sendRequest(this.axios.post("/v1/prove/customers/whitelist", data), callback);
  }

  /** Revoke data access. DELETE /v1/prove/customers/:reference */
  revokeDataAccess(reference: string, callback?: (err: unknown, data: unknown) => void) {
    return this.sendRequest(this.axios.delete(`/v1/prove/customers/${reference}`), callback);
  }
}
