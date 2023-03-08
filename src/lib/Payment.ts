import { AxiosInstance } from 'axios';
import { BaseLib } from '../base-lib/BaseLib';

interface PaymentInitializationOptions {
  // this should be represented as kobo.
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

export class Payment extends BaseLib {
  protected readonly path = '/payments/';

  constructor(protected readonly axios: AxiosInstance) {
    super(axios);
  }

  async initiate(data: PaymentInitializationOptions, callback?: any) {
    return this.sendRequest(
      this.axios.post(`${this.path}/initiate`),
      callback
    ).catch((err) => {
      // err
    });
  }

  async verify(data: VerifyPaymentOption, callback?: any) {
    return this.sendRequest(
      this.axios.get(`${this.path}/verify/${data.reference}`),
      callback
    ).catch((err) => {
      // err
    });
  }
}
