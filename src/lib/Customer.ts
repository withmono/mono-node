import { AxiosInstance } from "axios";
import { BaseLib } from "../base-lib/BaseLib";
/**
 * Customer API – create, retrieve, list, update, delete customers;
 * customer transactions; linked accounts.
 * @see https://docs.mono.co/api
 */
export class Customer extends BaseLib {
  constructor(protected readonly axios: AxiosInstance) {
    super(axios);
  }

  /** Create an individual customer. POST /v2/customers */
  async create(data: Record<string, unknown>, callback?: (err: unknown, data: unknown) => void) {
    return this.sendRequest(this.axios.post("/v2/customers", data), callback);
  }

  /** Create a business customer. POST /v2/customers (type: business) */
  async createBusiness(data: Record<string, unknown>, callback?: (err: unknown, data: unknown) => void) {
    return this.sendRequest(this.axios.post("/v2/customers", data), callback);
  }

  /** Retrieve a single customer. GET /v2/customers/:id */
  async retrieve(id: string, callback?: (err: unknown, data: unknown) => void) {
    return this.sendRequest(this.axios.get(`/v2/customers/${id}`), callback);
  }

  /** List all customers. GET /v2/customers */
  async list(params?: Record<string, string>, callback?: (err: unknown, data: unknown) => void) {
    return this.sendRequest(this.axios.get("/v2/customers", { params }), callback);
  }

  /** Get all transactions for a customer. GET /v2/customers/:id/transactions */
  async getTransactions(id: string, params?: Record<string, string>, callback?: (err: unknown, data: unknown) => void) {
    return this.sendRequest(this.axios.get(`/v2/customers/${id}/transactions`, { params }), callback);
  }

  /** Fetch all linked accounts. GET /v2/accounts */
  async getLinkedAccounts(params?: Record<string, string>, callback?: (err: unknown, data: unknown) => void) {
    return this.sendRequest(this.axios.get("/v2/accounts", { params }), callback);
  }

  /** Update a customer. PATCH /v2/customers/:id */
  async update(id: string, data: Record<string, unknown>, callback?: (err: unknown, data: unknown) => void) {
    return this.sendRequest(this.axios.patch(`/v2/customers/${id}`, data), callback);
  }

  /** Delete a customer. DELETE /v2/customers/:id */
  async delete(id: string, callback?: (err: unknown, data: unknown) => void) {
    return this.sendRequest(this.axios.delete(`/v2/customers/${id}`), callback);
  }
}
