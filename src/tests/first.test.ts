const {Mono} = require('../index');

beforeEach(async () => {
    jest.setTimeout(100000);
});

const monoClient = new Mono({
    secretKey: "live_sk_ppoioioooojuunu",
});

describe("Testing walletBalance Api", () => {
  it("getWalletBalance get response", async () => {
    const response = await monoClient.user.walletBalance((err:any, results:any) => {
      if (results) return true;
    });
    expect(response).toBeTruthy();   
  });
});

describe("Testing getAccountId Api", () => {
  it("getAccountId post response", async () => {
    const response = await monoClient.auth.getAccountId({code: 'code_IjyfZzzMML1ZXc8tTpYG'}, (err:any, results:any) => {
      if (results) return true;
    });
    expect(response).toBeTruthy();
  });
});

describe("Testing getAccountInformation Api", () => {
  it("getAccountInformation get response", async () => {
    const response = await monoClient.account.getAccountInformation({accountId: '604f8efd4dbec95bd65a1583'}, (err:any, results:any) => {
      if (results) return true;
    });
    expect(response).toBeTruthy();
  });
});

describe("Testing getAccountStatement Api", () => {
  it("getAccountStatement get response", async () => {
    const response = await monoClient.account.getAccountStatement({accountId: '604f8efd4dbec95bd65a1583', output: 'pdf'}, (err:any, results:any) => {
      if (results) return true;
  });
  expect(response).toBeTruthy();
  });
});

describe("Testing pollAccountStatementPdf Api", () => {
  it("pollAccountStatementPdf get response", async () => {
    const response = await monoClient.account.pollPdfAccountStatementStatus({accountId: '604f8efd4dbec95bd65a1583', jobId: 'QEP34KCSynTZgYXQr4e1'}, (err:any, results:any) => {
      if (results) return true;
  });
  expect(response).toBeTruthy();
  });
});


describe("Testing getCustomerCredits Api", () => {
  it("getCustomerCredits get response", async () => {
    const response = await monoClient.account.getCustomerCredits({accountId: '604f8efd4dbec95bd65a1583'}, (err:any, results:any) => {
      if (results) return true;
  });
  expect(response).toBeTruthy();
  });
});

describe("Testing getCustomerDebits Api", () => {
  it("getCustomerDebits get response", async () => {
    const response = await monoClient.account.getCustomerDebits({accountId: '604f8efd4dbec95bd65a1583'}, (err:any, results:any) => {
      if (results) return true;
  });
  expect(response).toBeTruthy();
  });
});



describe("Testing getAccountTransactions Api", () => {
  it("getAccountTransactions get response", async () => {
    const response = await monoClient.account.getAccountTransactions({accountId: '604f8efd4dbec95bd65a1583', type: 'credit'}, (err:any, results:any) => {
      if (results) return true;
  });
  expect(response).toBeTruthy();
  });
});

describe("Testing getIncomeInformation Api", () => {
  it("getIncomeInformation get response", async () => {
    const response = await monoClient.account.getIncome({accountId: '604f8efd4dbec95bd65a1583'}, (err:any, results:any) => {
      if (results) return true;
  });
  expect(response).toBeTruthy();
  });
});

describe("Testing getIdentity Api", () => {
  it("getIdentity get response", async () => {
    const response = await monoClient.account.getIdentity({accountId: '604f8efd4dbec95bd65a1583'}, (err:any, results:any) => {
      if (results) return true;
  });
  expect(response).toBeTruthy();
  });
});

describe("Testing syncData Api", () => {
  it("syncData get response", async () => {
    const response = await monoClient.account.syncDataManually({accountId: '604f8efd4dbec95bd65a1583'}, (err:any, results:any) => {
      if (results) return true;
  });
  expect(response).toBeTruthy();
  });
});

describe("Testing getReauthCode Api", () => {
  it("getReauthCode get response", async () => {
    const response = await monoClient.account.reauthCode({accountId: '604f8efd4dbec95bd65a1583'}, (err:any, results:any) => {
      if (results) return true;
  });
  expect(response).toBeTruthy();
  });
});

describe("Testing getInstitutions Api", () => {
  it("getInstitutions get response", async () => {
    const response = await monoClient.misc.institutions((err:any, results:any) => {
      if (results) return true;
  });
  expect(response).toBeTruthy();
  });
});

describe("Testing bvnLookup Api", () => {
  it("bvnLookup get response", async () => {
    const response = await monoClient.misc.bvnLookup({bvn: '22354058195'}, (err:any, results:any) => {
      if (results) return true;
  });
  expect(response).toBeTruthy();
  });
});


describe("Testing unlinkAccount Api", () => {
  test("unlinkAccount get response", async () => {
    const response = await monoClient.account.unlinkAccount({accountId: '604f8efd4dbec95bd65a1583'}, (err:any, results:any) => {
      if (results) return true;
  });
  expect(response).toBeTruthy();
  });
});

export {};