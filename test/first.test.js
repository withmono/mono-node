require('dotenv').config();

const Mono = require('../dist/index.js').default;

const secretKey = process.env.MONO_SECRET_KEY;
const accountId = process.env.MONO_ACCOUNT_ID || 'test-account-id';
const code = process.env.MONO_CODE || 'test-code';
const sessionId = process.env.MONO_SESSION_ID || 'test-session-id';
const statementJobId = process.env.MONO_STATEMENT_JOB_ID || 'test-job-id';
const customerId = process.env.MONO_CUSTOMER_ID || 'test-customer-id';
const mandateId = process.env.MONO_MANDATE_ID || 'test-mandate-id';
const disbursementId = process.env.MONO_DISBURSEMENT_ID || 'test-disbursement-id';
const sourceAccountId = process.env.MONO_SOURCE_ACCOUNT_ID || 'test-source-account-id';
const companyId = process.env.MONO_CAC_COMPANY_ID || 'test-company-id';
const rcNumber = process.env.MONO_CAC_RC_NUMBER || 'RC123456';
const fundRequestId = process.env.MONO_FUND_REQUEST_ID || 'test-fund-request-id';

const mono = secretKey ? new Mono(secretKey) : null;

function skipWithoutMono() {
  if (!mono) {
    console.warn('Skipping API tests: set MONO_SECRET_KEY in .env');
    return true;
  }
  return false;
}

describe('Mono SDK – Customer', () => {
  test('customer.create returns response', async () => {
    if (skipWithoutMono()) return;
    const result = await mono.customer.create({
      first_name: 'Test',
      last_name: 'User',
      email: 'test@example.com',
      phone: '08012345678',
      address: 'Lagos',
      type: 'individual',
      identity: { type: 'bvn', number: '22123456789' },
    });
    expect(result).toBeDefined();
  });

  test('customer.createBusiness returns response', async () => {
    if (skipWithoutMono()) return;
    const result = await mono.customer.createBusiness({
      business_name: 'Test Ltd',
      email: 'hello@test.com',
      phone: '08012345678',
      address: 'Lagos',
      type: 'business',
      identity: { type: 'bvn', number: '22123456789' },
    });
    expect(result).toBeDefined();
  });

  test('customer.retrieve returns response', async () => {
    if (skipWithoutMono()) return;
    const result = await mono.customer.retrieve(customerId);
    expect(result).toBeDefined();
  });

  test('customer.list returns response', async () => {
    if (skipWithoutMono()) return;
    const result = await mono.customer.list({ page: '1' });
    expect(result).toBeDefined();
  });

  test('customer.update returns response', async () => {
    if (skipWithoutMono()) return;
    const result = await mono.customer.update(customerId, { first_name: 'Updated' });
    expect(result).toBeDefined();
  });

  test('customer.getTransactions returns response', async () => {
    if (skipWithoutMono()) return;
    const result = await mono.customer.getTransactions(customerId, { period: 'last6months' });
    expect(result).toBeDefined();
  });

  test('customer.getLinkedAccounts returns response', async () => {
    if (skipWithoutMono()) return;
    const result = await mono.customer.getLinkedAccounts();
    expect(result).toBeDefined();
  });

  test('customer.delete returns response', async () => {
    if (skipWithoutMono()) return;
    const result = await mono.customer.delete(customerId);
    expect(result).toBeDefined();
  });
});

describe('Mono SDK – Connect (Bank Data)', () => {
  test('initiateAccountLinking returns response', async () => {
    if (skipWithoutMono()) return;
    const result = await mono.connect.bankData.initiateAccountLinking({
      customer: { name: 'Test', email: 'test@example.com' },
      scope: 'auth',
      redirect_url: 'https://example.com/callback',
      meta: { ref: 'test-ref' },
    });
    expect(result).toBeDefined();
  });

  test('exchangeToken returns response', async () => {
    if (skipWithoutMono()) return;
    const result = await mono.connect.bankData.exchangeToken({ code });
    expect(result).toBeDefined();
  });

  test('createSession returns response', async () => {
    if (skipWithoutMono()) return;
    const result = await mono.connect.bankData.createSession({});
    expect(result).toBeDefined();
  });

  test('login (with sessionId) returns response', async () => {
    if (skipWithoutMono()) return;
    const result = await mono.connect.bankData.login({}, sessionId);
    expect(result).toBeDefined();
  });

  test('commitSession (with sessionId) returns response', async () => {
    if (skipWithoutMono()) return;
    const result = await mono.connect.bankData.commitSession({}, sessionId);
    expect(result).toBeDefined();
  });

  test('reauthSession returns response', async () => {
    if (skipWithoutMono()) return;
    const result = await mono.connect.bankData.reauthSession({});
    expect(result).toBeDefined();
  });

  test('reauthLogin (with sessionId) returns response', async () => {
    if (skipWithoutMono()) return;
    const result = await mono.connect.bankData.reauthLogin({}, sessionId);
    expect(result).toBeDefined();
  });

  test('getSandboxCredentials (with sessionId) returns response', async () => {
    if (skipWithoutMono()) return;
    const result = await mono.connect.bankData.getSandboxCredentials(sessionId);
    expect(result).toBeDefined();
  });

  test('getAccountDetails returns response', async () => {
    if (skipWithoutMono()) return;
    const result = await mono.connect.bankData.getAccountDetails(accountId);
    expect(result).toBeDefined();
  });

  test('getBalance returns response', async () => {
    if (skipWithoutMono()) return;
    const result = await mono.connect.bankData.getBalance(accountId);
    expect(result).toBeDefined();
  });

  test('getBalance with realtime option returns response', async () => {
    if (skipWithoutMono()) return;
    const result = await mono.connect.bankData.getBalance(accountId, { realtime: true });
    expect(result).toBeDefined();
  });

  test('getStatement returns response', async () => {
    if (skipWithoutMono()) return;
    const result = await mono.connect.bankData.getStatement(accountId, { period: 'last6months' });
    expect(result).toBeDefined();
  });

  test('pollPdfStatus returns response', async () => {
    if (skipWithoutMono()) return;
    const result = await mono.connect.bankData.pollPdfStatus(accountId, statementJobId);
    expect(result).toBeDefined();
  });

  test('getTransactions returns response', async () => {
    if (skipWithoutMono()) return;
    const result = await mono.connect.bankData.getTransactions(accountId, { limit: '10' });
    expect(result).toBeDefined();
  });

  test('getTransactions with realtime option returns response', async () => {
    if (skipWithoutMono()) return;
    const result = await mono.connect.bankData.getTransactions(accountId, { limit: '10' }, { realtime: true });
    expect(result).toBeDefined();
  });

  test('getIdentity returns response', async () => {
    if (skipWithoutMono()) return;
    const result = await mono.connect.bankData.getIdentity(accountId);
    expect(result).toBeDefined();
  });

  test('getIncome returns response', async () => {
    if (skipWithoutMono()) return;
    const result = await mono.connect.bankData.getIncome(accountId);
    expect(result).toBeDefined();
  });

  test('getIncomeRecords returns response', async () => {
    if (skipWithoutMono()) return;
    const result = await mono.connect.bankData.getIncomeRecords(accountId);
    expect(result).toBeDefined();
  });

  test('getAccounts returns response', async () => {
    if (skipWithoutMono()) return;
    const result = await mono.connect.bankData.getAccounts();
    expect(result).toBeDefined();
  });

  test('getCreditworthiness returns response', async () => {
    if (skipWithoutMono()) return;
    const result = await mono.connect.bankData.getCreditworthiness(accountId);
    expect(result).toBeDefined();
  });

  test('getCredits returns response', async () => {
    if (skipWithoutMono()) return;
    const result = await mono.connect.bankData.getCredits(accountId);
    expect(result).toBeDefined();
  });

  test('getDebits returns response', async () => {
    if (skipWithoutMono()) return;
    const result = await mono.connect.bankData.getDebits(accountId);
    expect(result).toBeDefined();
  });

  test('unlink returns response', async () => {
    if (skipWithoutMono()) return;
    const result = await mono.connect.bankData.unlink(accountId);
    expect(result).toBeDefined();
  });
});

describe('Mono SDK – Connect (Telco Data)', () => {
  test('telcoData.login returns response', async () => {
    if (skipWithoutMono()) return;
    const result = await mono.connect.telcoData.login({ phone: '08012345678', provider: 'MTN' });
    expect(result).toBeDefined();
  });

  test('telcoData.verifyOtp returns response', async () => {
    if (skipWithoutMono()) return;
    const result = await mono.connect.telcoData.verifyOtp({ session_id: 'test-session', otp: '123456' });
    expect(result).toBeDefined();
  });

  test('telcoData.getDetails returns response', async () => {
    if (skipWithoutMono()) return;
    const result = await mono.connect.telcoData.getDetails(accountId);
    expect(result).toBeDefined();
  });

  test('telcoData.getBalances returns response', async () => {
    if (skipWithoutMono()) return;
    const result = await mono.connect.telcoData.getBalances(accountId);
    expect(result).toBeDefined();
  });

  test('telcoData.getTransactions returns response', async () => {
    if (skipWithoutMono()) return;
    const result = await mono.connect.telcoData.getTransactions(accountId, { limit: '10' });
    expect(result).toBeDefined();
  });

  test('telcoData.getIdentity returns response', async () => {
    if (skipWithoutMono()) return;
    const result = await mono.connect.telcoData.getIdentity(accountId);
    expect(result).toBeDefined();
  });
});

describe('Mono SDK – Payments (One-time)', () => {
  test('oneTime.initiate returns response', async () => {
    if (skipWithoutMono()) return;
    const result = await mono.payments.oneTime.initiate({
      amount: 20000,
      type: 'onetime-debit',
      method: 'account',
      account: accountId,
      description: 'Test payment',
      reference: 'test-ref-001',
      redirect_url: 'https://example.com/done',
      customer: { name: 'Test', email: 'test@example.com', phone: '08012345678' },
    });
    expect(result).toBeDefined();
  });

  test('oneTime.verify returns response', async () => {
    if (skipWithoutMono()) return;
    const result = await mono.payments.oneTime.verify('test-ref-001');
    expect(result).toBeDefined();
  });

  test('oneTime.fetchAll returns response', async () => {
    if (skipWithoutMono()) return;
    const result = await mono.payments.oneTime.fetchAll({ status: 'successful' });
    expect(result).toBeDefined();
  });
});

describe('Mono SDK – Payments (Recurring)', () => {
  test('recurring.getBanks returns response', async () => {
    if (skipWithoutMono()) return;
    const result = await mono.payments.recurring.getBanks();
    expect(result).toBeDefined();
  });

  test('recurring.createMandate returns response', async () => {
    if (skipWithoutMono()) return;
    const result = await mono.payments.recurring.createMandate({
      customer: customerId,
      mandate_type: 'emandate',
      debit_type: 'variable',
      amount: 500000,
      reference: 'mandate-ref-001',
      account_number: '0123456789',
      bank_code: '058',
      description: 'Subscription',
      start_date: '2024-01-01',
      end_date: '2024-12-31',
    });
    expect(result).toBeDefined();
  });

  test('recurring.getMandate returns response', async () => {
    if (skipWithoutMono()) return;
    const result = await mono.payments.recurring.getMandate(mandateId);
    expect(result).toBeDefined();
  });

  test('recurring.getAllMandates returns response', async () => {
    if (skipWithoutMono()) return;
    const result = await mono.payments.recurring.getAllMandates();
    expect(result).toBeDefined();
  });

  test('recurring.balanceInquiry returns response', async () => {
    if (skipWithoutMono()) return;
    const result = await mono.payments.recurring.balanceInquiry(mandateId);
    expect(result).toBeDefined();
  });

  test('recurring.debitAccount returns response', async () => {
    if (skipWithoutMono()) return;
    const result = await mono.payments.recurring.debitAccount(mandateId, {
      amount: 10000,
      reference: 'debit-001',
      narration: 'Test fee',
    });
    expect(result).toBeDefined();
  });

  test('recurring.getAllDebits returns response', async () => {
    if (skipWithoutMono()) return;
    const result = await mono.payments.recurring.getAllDebits(mandateId);
    expect(result).toBeDefined();
  });

  test('recurring.getDebit returns response', async () => {
    if (skipWithoutMono()) return;
    const result = await mono.payments.recurring.getDebit(mandateId, 'debit-001');
    expect(result).toBeDefined();
  });
});

describe('Mono SDK – Payments (Money Operations)', () => {
  test('moneyOperations.getPayouts returns response', async () => {
    if (skipWithoutMono()) return;
    const result = await mono.payments.moneyOperations.getPayouts();
    expect(result).toBeDefined();
  });

  test('moneyOperations.getPayoutTransactions returns response', async () => {
    if (skipWithoutMono()) return;
    const result = await mono.payments.moneyOperations.getPayoutTransactions('test-payout-id');
    expect(result).toBeDefined();
  });

  test('moneyOperations.refund returns response', async () => {
    if (skipWithoutMono()) return;
    const result = await mono.payments.moneyOperations.refund({ reference: 'test-ref' });
    expect(result).toBeDefined();
  });

  test('moneyOperations.createSubAccount returns response', async () => {
    if (skipWithoutMono()) return;
    const result = await mono.payments.moneyOperations.createSubAccount({ name: 'Test Sub' });
    expect(result).toBeDefined();
  });

  test('moneyOperations.getSubAccounts returns response', async () => {
    if (skipWithoutMono()) return;
    const result = await mono.payments.moneyOperations.getSubAccounts();
    expect(result).toBeDefined();
  });
});

describe('Mono SDK – Payments (WhatsApp)', () => {
  test('whatsappPayment.checkUserStatus returns response', async () => {
    if (skipWithoutMono()) return;
    const result = await mono.payments.whatsappPayment.checkUserStatus({ phone: '08012345678' });
    expect(result).toBeDefined();
  });

  test('whatsappPayment.getAllBeneficiaries returns response', async () => {
    if (skipWithoutMono()) return;
    const result = await mono.payments.whatsappPayment.getAllBeneficiaries();
    expect(result).toBeDefined();
  });

  test('whatsappPayment.getAllFundRequests returns response', async () => {
    if (skipWithoutMono()) return;
    const result = await mono.payments.whatsappPayment.getAllFundRequests();
    expect(result).toBeDefined();
  });

  test('whatsappPayment.getFundRequest returns response', async () => {
    if (skipWithoutMono()) return;
    const result = await mono.payments.whatsappPayment.getFundRequest(fundRequestId);
    expect(result).toBeDefined();
  });
});

describe('Mono SDK – Payments (Disburse)', () => {
  test('disburse.createSourceAccount returns response', async () => {
    if (skipWithoutMono()) return;
    const result = await mono.payments.disburse.createSourceAccount({
      app: 'test-app-id',
      account_number: '0123456789',
      bank_code: '044',
      email: 'finance@example.com',
    });
    expect(result).toBeDefined();
  });

  test('disburse.getSourceAccounts returns response', async () => {
    if (skipWithoutMono()) return;
    const result = await mono.payments.disburse.getSourceAccounts();
    expect(result).toBeDefined();
  });

  test('disburse.getSourceAccount returns response', async () => {
    if (skipWithoutMono()) return;
    const result = await mono.payments.disburse.getSourceAccount(sourceAccountId);
    expect(result).toBeDefined();
  });

  test('disburse.createInstantDisbursement returns response', async () => {
    if (skipWithoutMono()) return;
    const result = await mono.payments.disburse.createInstantDisbursement({
      reference: 'batch-001',
      source: 'mandate',
      account: sourceAccountId,
      type: 'instant',
      total_amount: 1000000,
      description: 'Payroll',
      distribution: [
        {
          reference: 'dist-1',
          recipient_email: 'a@example.com',
          account: { account_number: '001', bank_code: '044' },
          amount: 500000,
          narration: 'Salary',
        },
      ],
    });
    expect(result).toBeDefined();
  });

  test('disburse.getAllDisbursements returns response', async () => {
    if (skipWithoutMono()) return;
    const result = await mono.payments.disburse.getAllDisbursements();
    expect(result).toBeDefined();
  });

  test('disburse.getDisbursement returns response', async () => {
    if (skipWithoutMono()) return;
    const result = await mono.payments.disburse.getDisbursement(disbursementId);
    expect(result).toBeDefined();
  });
});

describe('Mono SDK – Lookup (General)', () => {
  test('lookup.general.bankListing returns response', async () => {
    if (skipWithoutMono()) return;
    const result = await mono.lookup.general.bankListing();
    expect(result).toBeDefined();
  });

  test('lookup.general.nin returns response', async () => {
    if (skipWithoutMono()) return;
    const result = await mono.lookup.general.nin({ nin: '12345678901' });
    expect(result).toBeDefined();
  });

  test('lookup.general.address returns response', async () => {
    if (skipWithoutMono()) return;
    const result = await mono.lookup.general.address({ address: 'test-address-id' });
    expect(result).toBeDefined();
  });

  test('lookup.general.accountNumber returns response', async () => {
    if (skipWithoutMono()) return;
    const result = await mono.lookup.general.accountNumber({ account_number: '0123456789', bank_code: '058' });
    expect(result).toBeDefined();
  });
});

describe('Mono SDK – Lookup (BVN)', () => {
  test('lookup.bvn.initiate returns response', async () => {
    if (skipWithoutMono()) return;
    const result = await mono.lookup.bvn.initiate({ bvn: '22123456789', scope: 'identity' });
    expect(result).toBeDefined();
  });

  test('lookup.bvn.verifyOtp returns response', async () => {
    if (skipWithoutMono()) return;
    const result = await mono.lookup.bvn.verifyOtp({ method: 'phone', phone_number: '08012345678' });
    expect(result).toBeDefined();
  });

  test('lookup.bvn.fetchDetails returns response', async () => {
    if (skipWithoutMono()) return;
    const result = await mono.lookup.bvn.fetchDetails({ otp: '123456' });
    expect(result).toBeDefined();
  });
});

describe('Mono SDK – Lookup (CAC)', () => {
  test('lookup.cac.business returns response', async () => {
    if (skipWithoutMono()) return;
    const result = await mono.lookup.cac.business({ search: 'Acme', exact: false });
    expect(result).toBeDefined();
  });

  test('lookup.cac.directors returns response', async () => {
    if (skipWithoutMono()) return;
    const result = await mono.lookup.cac.directors(companyId);
    expect(result).toBeDefined();
  });

  test('lookup.cac.profile returns response', async () => {
    if (skipWithoutMono()) return;
    const result = await mono.lookup.cac.profile(rcNumber);
    expect(result).toBeDefined();
  });

  test('lookup.cac.shareholder returns response', async () => {
    if (skipWithoutMono()) return;
    const result = await mono.lookup.cac.shareholder(companyId);
    expect(result).toBeDefined();
  });

  test('lookup.cac.psc returns response', async () => {
    if (skipWithoutMono()) return;
    const result = await mono.lookup.cac.psc(companyId);
    expect(result).toBeDefined();
  });

  test('lookup.cac.secretary returns response', async () => {
    if (skipWithoutMono()) return;
    const result = await mono.lookup.cac.secretary(companyId);
    expect(result).toBeDefined();
  });

  test('lookup.cac.statusReport returns response', async () => {
    if (skipWithoutMono()) return;
    const result = await mono.lookup.cac.statusReport(companyId);
    expect(result).toBeDefined();
  });
});

describe('Mono SDK – Prove (KYC)', () => {
  test('prove.initiate returns response', async () => {
    if (skipWithoutMono()) return;
    const result = await mono.prove.initiate({
      customer: {
        name: 'Test',
        phone: '08012345678',
        email: 'test@example.com',
        identity: { type: 'bvn', number: '22123456789' },
      },
      reference: 'kyc-ref-001',
      redirect_url: 'https://example.com/kyc-done',
      kyc_level: 'tier_1',
      bank_accounts: false,
    });
    expect(result).toBeDefined();
  });

  test('prove.fetchCustomerDetails returns response', async () => {
    if (skipWithoutMono()) return;
    const result = await mono.prove.fetchCustomerDetails('kyc-ref-001');
    expect(result).toBeDefined();
  });

  test('prove.fetchAllDetails returns response', async () => {
    if (skipWithoutMono()) return;
    const result = await mono.prove.fetchAllDetails();
    expect(result).toBeDefined();
  });

  test('prove.blacklist returns response', async () => {
    if (skipWithoutMono()) return;
    const result = await mono.prove.blacklist({ reference: 'kyc-ref-001', reason: 'Test', code: '101' });
    expect(result).toBeDefined();
  });

  test('prove.whitelist returns response', async () => {
    if (skipWithoutMono()) return;
    const result = await mono.prove.whitelist({ reference: 'kyc-ref-001' });
    expect(result).toBeDefined();
  });

  test('prove.revokeDataAccess returns response', async () => {
    if (skipWithoutMono()) return;
    const result = await mono.prove.revokeDataAccess('kyc-ref-001');
    expect(result).toBeDefined();
  });
});

describe('Mono SDK – Misc', () => {
  test('misc.bankCoverage returns response', async () => {
    if (skipWithoutMono()) return;
    const result = await mono.misc.bankCoverage({ country: 'ng', scope: 'financial_data' });
    expect(result).toBeDefined();
  });
});
