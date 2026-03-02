import Axios, { AxiosInstance } from "axios";
import { BankData, TelcoData } from "./lib/Connect";
import { Customer } from "./lib/Customer";
import { Disburse, MoneyOperations, OneTimePayments, RecurringPayments, WhatsAppPayment } from "./lib/Payments";
import { BvnLookup, CacLookup, Lookup } from "./lib/Lookup";
import { Prove } from "./lib/Prove";
import { Misc } from "./lib/Misc";

/**
 * Mono Node.js SDK
 *
 * API groups: Customer, Connect (Bank Data, Telco Data), Payments (One-time, Recurring, Money Ops, WhatsApp, Disburse),
 * Lookup (general, BVN, CAC), Prove, Misc.
 *
 * Deprecated and not exposed: Re-auth Code, Wallet balance.
 *
 * @see https://docs.mono.co/api
 */
export default class Mono {
  public readonly customer: Customer;
  public readonly connect: {
    bankData: BankData;
    telcoData: TelcoData;
  };
  public readonly payments: {
    oneTime: OneTimePayments;
    recurring: RecurringPayments;
    moneyOperations: MoneyOperations;
    whatsappPayment: WhatsAppPayment;
    disburse: Disburse;
  };
  public readonly lookup: {
    general: Lookup;
    bvn: BvnLookup;
    cac: CacLookup;
  };
  public readonly prove: Prove;
  public readonly misc: Misc;

  constructor(privateKey: string) {
    const axios: AxiosInstance = Axios.create({
      baseURL: "https://api.withmono.com",
      headers: {
        "mono-sec-key": privateKey,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    this.customer = new Customer(axios);
    this.connect = {
      bankData: new BankData(axios),
      telcoData: new TelcoData(axios),
    };
    this.payments = {
      oneTime: new OneTimePayments(axios),
      recurring: new RecurringPayments(axios),
      moneyOperations: new MoneyOperations(axios),
      whatsappPayment: new WhatsAppPayment(axios),
      disburse: new Disburse(axios),
    };
    this.lookup = {
      general: new Lookup(axios),
      bvn: new BvnLookup(axios),
      cac: new CacLookup(axios),
    };
    this.prove = new Prove(axios);
    this.misc = new Misc(axios);
  }
}

export { Customer, BankData, TelcoData, OneTimePayments, RecurringPayments, MoneyOperations, WhatsAppPayment, Disburse, Lookup, BvnLookup, CacLookup, Prove, Misc };
