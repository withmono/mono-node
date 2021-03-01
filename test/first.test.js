const api = require('../src');

// beforeEach(async () => {
//     jest.setTimeout(100000);
// });

describe("Testing getWalletBalance Api", () => {
    test("getWalletBalance get response", async () => {
      const response = await api.getWalletBalance(tokenKey, (err, results) => {
        if (results) return true;
    });
    expect(response).toBe(true);
    });
});

describe("Testing getAccountInformation Api", () => {
    test("getAccountInformation get response", async () => {
      const response = await api.getAccountInformation(tokenKey, {accountId: aid}, (err, results) => {
        if (results) return true;
    });
    expect(response).toBe(true);
    });
});

describe("Testing getAccountId Api", () => {
    test("getAccountId post response", async () => {
      const response = await api.getAccountId(tokenKey, {code: code}, (err, results) => {
        console.log(err);
        if (results) return true;
    });
    expect(response).toBe(true);
    });
});

describe("Testing getAccountStatement Api", () => {
    test("getAccountStatement get response", async () => {
      const response = await api.getAccountStatement(tokenKey, {accountId: aid,output:"pdf",period:"last2months"}, (err, results) => {
        if (results) return true;
    });
    expect(response).toBe(true);
    });
});

describe("Testing pollAccountStatementPdf Api", () => {
    test("pollAccountStatementPdf get response", async () => {
      const response = await api.pollAccountStatementPdf(tokenKey, {accountId: aid, jobId:"oZGDBZiaUiuw28UbhF8k"}, (err, results) => {
        if (results) return true;
    });
    expect(response).toBe(true);
    });
});

describe("Testing getAccountTransactions Api", () => {
    test("getAccountTransactions get response", async () => {
      const response = await api.getAccountTransactions(tokenKey, {accountId: aid, limit: 3}, (err, results) => {
        if (results) return true;
    });
    expect(response).toBe(true);
    });
});

describe("Testing getCustomerCredit Api", () => {
    test("getCustomerCredit get response", async () => {
      const response = await api.getCustomerCredit(tokenKey, {accountId: aid}, (err, results) => {
        if (results) return true;
    });
    expect(response).toBe(true);
    });
});

describe("Testing getCustomerDebit Api", () => {
    test("getCustomerDebit get response", async () => {
      const response = await api.getCustomerDebit(tokenKey, {accountId: aid}, (err, results) => {
        if (results) return true;
    });
    expect(response).toBe(true);
    });
});

describe("Testing getIncomeInformation Api", () => {
    test("getIncomeInformation get response", async () => {
      const response = await api.getIncomeInformation(tokenKey, {accountId: aid}, (err, results) => {
        if (results) return true;
    });
    expect(response).toBe(true);
    });
});

describe("Testing getIdentity Api", () => {
    test("getIdentity get response", async () => {
      const response = await api.getIdentity(tokenKey, {accountId: aid}, (err, results) => {
        if (results) return true;
    });
    expect(response).toBe(true);
    });
});

describe("Testing syncData Api", () => {
    test("syncData get response", async () => {
      const response = await api.syncData(tokenKey, {accountId: aid}, (err, results) => {
        if (results) return true;
    });
    expect(response).toBe(true);
    });
});

describe("Testing getReauthCode Api", () => {
    test("getReauthCode get response", async () => {
      const response = await api.getReauthCode(tokenKey, {accountId: aid}, (err, results) => {
        if (results) return true;
    });
    expect(response).toBe(true);
    });
});

describe("Testing getInstitutions Api", () => {
    test("getInstitutions get response", async () => {
      const response = await api.getInstitutions(tokenKey, (err, results) => {
        if (results) return true;
    });
    expect(response).toBe(true);
    });
});

describe("Testing bvnLookup Api", () => {
    test("bvnLookup get response", async () => {
      const response = await api.bvnLookup(tokenKey, {bvn: '1234567890'}, (err, results) => {
        if (results) return true;
    });
    expect(response).toBe(true);
    });
});

describe("Testing unlinkAccount Api", () => {
    test("unlinkAccount get response", async () => {
      const response = await api.unlinkAccount(tokenKey, {accountId: aid}, (err, results) => {
        if (results) return true;
    });
    expect(response).toBe(true);
    });
});