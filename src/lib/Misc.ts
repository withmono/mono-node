import { AxiosInstance } from "axios";
import { BaseLib } from "../base-lib/BaseLib";

/**
 * Miscellaneous API – bank coverage (institutions).
 * @see https://docs.mono.co/api/miscellaneous/bank-coverage
 */
export class Misc extends BaseLib {
  constructor(protected readonly axios: AxiosInstance) {
    super(axios);
  }

  /** Bank coverage – supported institutions and product scopes. GET /v3/institutions */
  bankCoverage(params?: Record<string, string>, callback?: (err: unknown, data: unknown) => void) {
    return this.sendRequest(this.axios.get("/v3/institutions", { params }), callback);
  }
}
