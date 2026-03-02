# Mono Node

Node.js wrapper for the [Mono API](https://mono.co). Use it to integrate **Customer**, **Connect** (bank & telco data), **Payments** (one-time, recurring, disbursements, WhatsApp), **Lookup** (BVN, CAC, NIN, etc.), **Prove** (KYC), and **Misc** (e.g. bank coverage) in your application.

- [Mono Dashboard](https://app.mono.co)
- [API Reference](https://docs.mono.co/api)
- [Get API keys](https://app.mono.co/apps)

---

## Installation

```bash
npm install mono-node
```

or with Yarn:

```bash
yarn add mono-node
```

---

## Quick start (recommended)

Use the **Mono** class with your secret key. All methods return a **Promise** and accept an optional **callback**.

```js
// If the package main exports the Mono class:
const Mono = require("mono-node").default;
// or: import Mono from "mono-node";

// If your project uses the TypeScript source or a custom build:
// const Mono = require("./src/_index").default;
// import Mono from "./src/_index";

const mono = new Mono(process.env.MONO_SECRET_KEY);

// Create individual customer (POST /v2/customers).
const customer = await mono.customer.create({
  first_name: "Samuel",
  last_name: "Olamide",
  email: "samuel@example.com",
  phone: "08012345678",
  address: "Lagos, Nigeria",
  type: "individual",
  identity: { type: "bvn", number: "22123456789" },
});

// Retrieve customer by ID (GET /v2/customers/:id) – optional callback style.
mono.customer.retrieve(customer.data.id, (err, data) => {
  if (err) return console.error(err);
  console.log(data);
});
```

---

## API overview

The SDK is grouped to match the [Mono API](https://docs.mono.co/api):

| Group | Access | Description |
|-------|--------|-------------|
| **Customer** | `mono.customer` | Create (individual/business), retrieve, list, update, delete; customer transactions; linked accounts |
| **Connect** | `mono.connect.bankData` | Bank data: account linking, token exchange, accounts, statements, transactions, enrichment, etc. |
| **Connect** | `mono.connect.telcoData` | Telco data: auth, account details, balances, transactions, identity |
| **Payments** | `mono.payments.oneTime` | One-time payments: initiate, verify, fetch all |
| **Payments** | `mono.payments.recurring` | Mandates and mandate accounts (balance, debit, retrieve debits) |
| **Payments** | `mono.payments.moneyOperations` | Payouts, refunds, sub-accounts |
| **Payments** | `mono.payments.whatsappPayment` | WhatsApp: users, beneficiaries, fund requests, payments |
| **Payments** | `mono.payments.disburse` | Disburse: source accounts, disbursements, distributions |
| **Lookup** | `mono.lookup.general` | Bank listing, address, NIN, TIN, passport, account number, etc. |
| **Lookup** | `mono.lookup.bvn` | BVN: initiate, verify OTP, fetch details |
| **Lookup** | `mono.lookup.cac` | CAC: business, shareholder, PSC, directors, profile, status report |
| **Prove** | `mono.prove` | KYC: initiate, fetch details, blacklist, whitelist, revoke |
| **Misc** | `mono.misc` | Bank coverage (institutions) |

---

## Usage

### Customer

```js
// Create individual customer – creates a unique individual customer (POST /v2/customers).
await mono.customer.create({
  first_name: "Samuel",
  last_name: "Olamide",
  email: "samuel@example.com",
  phone: "08012345678",
  address: "Lagos",
  type: "individual",
  identity: { type: "bvn", number: "22123456789" },
});

// Create business customer – creates a unique business customer (POST /v2/customers, type: business).
await mono.customer.createBusiness({
  business_name: "Acme Ltd",
  email: "hello@acme.com",
  phone: "08012345678",
  address: "Lagos",
  type: "business",
  identity: { type: "bvn", number: "22123456789" },
});

// Retrieve customer – fetches a single customer by ID (GET /v2/customers/:id).
const one = await mono.customer.retrieve(customerId);

// List all customers – returns all customers with optional filters e.g. page, email, phone (GET /v2/customers).
const list = await mono.customer.list({ page: "1", email: "samuel@example.com" });

// Update customer – updates customer details (PATCH /v2/customers/:id).
await mono.customer.update(customerId, { first_name: "Sam" });

// Delete customer – removes a customer (DELETE /v2/customers/:id).
await mono.customer.delete(customerId);

// Get customer transactions – returns all transactions for a customer (GET /v2/customers/:id/transactions).
const txs = await mono.customer.getTransactions(customerId, { period: "last6months" });

// Get all linked accounts – returns all linked accounts (GET /v2/accounts).
const accounts = await mono.customer.getLinkedAccounts();
```

### Connect (Bank Data)

**Headers**

- **Partners API:** These endpoints require the **`x-session-id`** header (Connect session ID from `createSession`): **Login**, **Commit Session**, **Reauth Login**, **Retrieve Sandbox Credentials**. The SDK accepts `sessionId` as an argument and sends it as `x-session-id`.
- **Balance & Transactions:** You can pass an optional **`x-realtime`** (boolean) to request real-time data. See [Real-Time Data](https://docs.mono.co/docs/financial-data/realtime-data) for behaviour, response headers, and webhooks.

```js
// Initiate account linking – starts linking a bank account; returns mono_url for the Connect widget (POST /v2/accounts/initiate).
const link = await mono.connect.bankData.initiateAccountLinking({
  customer: { name: "Samuel Olamide", email: "samuel@example.com" },
  scope: "auth",
  redirect_url: "https://yourapp.com/callback",
  meta: { ref: "unique-ref-123" },
});
// Use link.data.mono_url for the Connect widget

// Exchange token – exchanges the code from the Connect callback for an account ID (POST /v2/accounts/auth).
const auth = await mono.connect.bankData.exchangeToken({ code: "code_from_callback" });
const accountId = auth.data.id;

// --- Partners API (require x-session-id = Connect session ID) ---
// Create connect session – creates a Connect session (POST /v2/connect/session).
const session = await mono.connect.bankData.createSession({ ... });
const sessionId = session.data.id; // use this as x-session-id for the four endpoints below

// Login – Connect login (POST /v2/connect/login). Requires sessionId.
await mono.connect.bankData.login({ ... }, sessionId);

// Commit session – commits the Connect session (POST /v2/connect/commit). Requires sessionId.
await mono.connect.bankData.commitSession({ ... }, sessionId);

// Reauth login – reauth login (POST /v2/connect/reauth/login). Requires sessionId.
await mono.connect.bankData.reauthLogin({ ... }, sessionId);

// Retrieve sandbox credentials – get sandbox credentials (POST /v2/connect/sandbox). Requires sessionId.
const creds = await mono.connect.bankData.getSandboxCredentials(sessionId);

// Get account details – returns account details, balance and data status (GET /v2/accounts/:id).
const details = await mono.connect.bankData.getAccountDetails(accountId);

// Get statement – returns bank statement for the account, 1–12 months (GET /v2/accounts/:id/statement).
const statement = await mono.connect.bankData.getStatement(accountId, { period: "last6months" });

// Get transactions – returns transactions on the account (GET /v2/accounts/:id/transactions). Optional realtime.
const transactions = await mono.connect.bankData.getTransactions(accountId, { limit: 20 });
const transactionsRealtime = await mono.connect.bankData.getTransactions(accountId, { limit: 20 }, { realtime: true });

// Get identity – returns identity data for the account (GET /v2/accounts/:id/identity).
const identity = await mono.connect.bankData.getIdentity(accountId);

// Get balance – returns account balance (GET /v2/accounts/:id/balance). Optional realtime.
const balance = await mono.connect.bankData.getBalance(accountId);
const balanceRealtime = await mono.connect.bankData.getBalance(accountId, { realtime: true });

// Get income – returns income information for the account (GET /v2/accounts/:id/income).
const income = await mono.connect.bankData.getIncome(accountId);

// Unlink account – unlinks the financial account (POST /v2/accounts/:id/unlink).
await mono.connect.bankData.unlink(accountId);
```

### Connect (Telco Data)

```js
// Login – initiates telco auth; sends OTP to the user's phone (POST /v2/telecom/auth).
await mono.connect.telcoData.login({ phone: "08012345678", provider: "MTN" });

// Verify OTP – verifies the OTP and completes telco authentication (POST /v2/telecom/verify).
await mono.connect.telcoData.verifyOtp({ session_id: "...", otp: "123456" });

// Get details – returns telco account details (GET /v2/accounts/:id).
const details = await mono.connect.telcoData.getDetails(accountId);

// Get balances – returns telco account balances (GET /v2/accounts/:id/balances).
const balances = await mono.connect.telcoData.getBalances(accountId);
```

### Payments – One-time

```js
// Initiate payment – creates a one-time payment and returns a payment link (POST /v2/payments/initiate).
const payment = await mono.payments.oneTime.initiate({
  amount: 20000, // kobo
  type: "onetime-debit",
  method: "account",
  account: accountId,
  description: "Order payment",
  reference: "order-ref-001",
  redirect_url: "https://yourapp.com/done",
  customer: { name: "Samuel", email: "samuel@example.com", phone: "08012345678" },
});
// Send user to payment.data.mono_url

// Verify payment – checks payment status by reference (GET /v2/payments/verify/:reference).
const status = await mono.payments.oneTime.verify("order-ref-001");

// Fetch all payments – lists payment transactions with optional filters (GET /v2/payments/transactions).
const all = await mono.payments.oneTime.fetchAll({ status: "successful" });
```

### Payments – Recurring (mandates)

```js
// Get banks – returns list of banks supported for mandates (GET /v3/banks/list).
const banks = await mono.payments.recurring.getBanks();

// Create mandate – creates a mandate (signed or e-mandate) for recurring debits (POST /v3/payments/mandates).
const mandate = await mono.payments.recurring.createMandate({
  customer: customerId,
  mandate_type: "emandate",
  debit_type: "variable",
  amount: 500000,
  reference: "mandate-ref-001",
  account_number: "0123456789",
  bank_code: "058",
  description: "Subscription",
  start_date: "2024-01-01",
  end_date: "2024-12-31",
});

// Balance inquiry – checks mandate account balance or sufficient funds (GET /v3/payments/mandates/:id/balance-inquiry).
const balance = await mono.payments.recurring.balanceInquiry(mandateId);

// Debit account – debits the mandate account (POST /v3/payments/mandates/:id/debit).
await mono.payments.recurring.debitAccount(mandateId, {
  amount: 10000,
  reference: "debit-001",
  narration: "Monthly fee",
});

// Get all debits – returns all debits for a mandate (GET /v3/payments/mandates/:id/debits).
const debits = await mono.payments.recurring.getAllDebits(mandateId);
```

### Payments – Disburse

```js
// Create source account – creates a funding source for disbursements (POST /v3/payments/disburse/source-accounts).
await mono.payments.disburse.createSourceAccount({
  app: appId,
  account_number: "0123456789",
  bank_code: "044",
  email: "finance@company.com",
});

// Create instant disbursement – creates an instant disbursement batch with one or more recipients (POST /v3/payments/disburse/disbursements).
const batch = await mono.payments.disburse.createInstantDisbursement({
  reference: "batch-001",
  source: "mandate",
  account: sourceAccountId,
  type: "instant",
  total_amount: 1000000,
  description: "Payroll",
  distribution: [
    { reference: "dist-1", recipient_email: "a@example.com", account: { account_number: "001", bank_code: "044" }, amount: 500000, narration: "Salary" },
  ],
});

// Get all disbursements – returns a paginated list of disbursement batches (GET /v3/payments/disburse/disbursements).
const list = await mono.payments.disburse.getAllDisbursements();

// Get disbursement – returns a single disbursement by ID (GET /v3/payments/disburse/disbursements/:id).
const one = await mono.payments.disburse.getDisbursement(disbursementId);
```

### Lookup

```js
// Bank listing (NIP) – returns all banks supported under NIBSS/NIP (GET /v3/lookup/banks).
const banks = await mono.lookup.general.bankListing();

// NIN lookup – verifies a national identification number (POST /v3/lookup/nin).
const ninResult = await mono.lookup.general.nin({ nin: "12345678901" });

// Address lookup – verifies address (POST /v3/lookup/address).
const addressResult = await mono.lookup.general.address({ ... });

// BVN initiate – starts a BVN consent flow (POST /v2/lookup/bvn/initiate).
await mono.lookup.bvn.initiate({ bvn: "22123456789", scope: "identity" });

// BVN verify OTP – verifies the BVN request via OTP (POST /v2/lookup/bvn/verify).
await mono.lookup.bvn.verifyOtp({ method: "phone", phone_number: "08012345678" });

// BVN fetch details – returns BVN information after OTP verification (POST /v2/lookup/bvn/details).
const bvnDetails = await mono.lookup.bvn.fetchDetails({ otp: "123456" });

// CAC business lookup – searches for a business by name or RC number (GET /v3/lookup/cac).
const companies = await mono.lookup.cac.business({ search: "Acme", exact: false });

// CAC directors – returns directors for a company (GET /v3/lookup/cac/company/:id/directors).
const directors = await mono.lookup.cac.directors(companyId);

// CAC profile – returns company profile by RC number (GET /v3/lookup/cac/profile/:rcnumber).
const profile = await mono.lookup.cac.profile(rcNumber);
```

### Prove (KYC)

```js
// Initiate Prove – starts a Mono Prove KYC session; returns mono_url for the user (POST /v1/prove/initiate).
const session = await mono.prove.initiate({
  customer: { name: "Samuel", phone: "08012345678", email: "samuel@example.com", identity: { type: "bvn", number: "22123456789" } },
  reference: "kyc-ref-001",
  redirect_url: "https://yourapp.com/kyc-done",
  kyc_level: "tier_1",
  bank_accounts: false,
});

// Fetch customer details – returns shared KYC details for one customer by reference (GET /v1/prove/customers/:reference).
const details = await mono.prove.fetchCustomerDetails("kyc-ref-001");

// Fetch all details – returns shared details for all Prove customers (GET /v1/prove/customers).
const all = await mono.prove.fetchAllDetails();

// Blacklist customer – blacklists a customer from Mono Prove (POST /v1/prove/customers/blacklist).
await mono.prove.blacklist({ reference: "kyc-ref-001", reason: "...", code: "101" });

// Whitelist customer – removes a customer from the blacklist (POST /v1/prove/customers/whitelist).
await mono.prove.whitelist({ reference: "kyc-ref-001" });

// Revoke data access – revokes a customer's shared data (DELETE /v1/prove/customers/:reference).
await mono.prove.revokeDataAccess("kyc-ref-001");
```

### Misc

```js
// Bank coverage – returns supported institutions and product scopes e.g. financial_data, Directpay (GET /v3/institutions).
const institutions = await mono.misc.bankCoverage({ country: "ng", scope: "financial_data" });
```

---

## Deprecated APIs

The following are **not** exposed on the new `Mono` class:

- **Re-auth Code** – previously used to re-authenticate an account via a Mono-generated code.
- **Wallet balance** – previously used to check wallet balance.

If you still need the legacy callback-based API (including deprecated endpoints), use the existing `mono-node` export:

```js
const client = require("mono-node");

client.getAccountId(secretKey, { code }, (err, results) => { ... });
client.getAccountInformation(secretKey, { accountId }, (err, results) => { ... });
// etc.
```

New integrations should use the `Mono` class and the endpoints documented above.

---

## Currency

Amounts in the API use the **smallest currency unit**:

- **NGN** – kobo  
- **GHC** – pesewa  
- **KSH** / **ZAR** – cents  

Example: NGN 200.00 = `20000` (kobo).

---

## Documentation

- [Mono API Reference](https://docs.mono.co/api)
- [Get API keys](https://app.mono.co/apps)
- [Support](https://support.mono.co)

---

## License

MIT. See [LICENSE](https://github.com/withmono/mono-node/blob/main/LICENSE.md) for details.
