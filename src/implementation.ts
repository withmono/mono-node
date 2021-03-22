const {Mono} = require('./index');

const monoClient = new Mono({
    secretKey: "live_sk_random",
});

const wallet = monoClient.user.walletBalance((err:any, results:any) => {
    if (err) {
        console.log(err);
    }
    if (results){
        console.log(results);
    };
});

const accountId = monoClient.auth.getAccountId({code: 'code_IjyfZzzMML1ZXc8tTpYG'}, (err:any, results:any) => {
    if (err) {
        console.log(err);
    }
    if (results){
        console.log(results);
    };
});

const information = monoClient.account.getAccountInformation({accountId: '604f8efd4dbec95bd65a1583'}, (err:any, results:any) => {
    if (err) {
        console.log(err);
    }
    if (results){
        console.log(results);
    };
});

const accountStatement = monoClient.account.getAccountStatement({accountId: '604f8efd4dbec95bd65a1583', output: 'pdf'}, (err:any, results:any) => {
    if (err) {
        console.log(err);
    }
    if (results){
        console.log(results);
    };
});

const pollPdfAccountStatementStatus = monoClient.account.pollPdfAccountStatementStatus({accountId: '604f8efd4dbec95bd65a1583', jobId: 'QEP34KCSynTZgYXQr4e1'}, (err:any, results:any) => {
    if (err) {
        console.log(err);
    }
    if (results){
        console.log(results);
    };
});

const transactions = monoClient.account.getAccountTransactions({accountId: '604f8efd4dbec95bd65a1583', type: 'credit'}, (err:any, results:any) => {
    if (err) {
        console.log(err);
    }
    if (results){
        console.log(results);
    };
});

const credits = monoClient.account.getCustomerCredits({accountId: '604f8efd4dbec95bd65a1583'}, (err:any, results:any) => {
    if (err) {
        console.log(err);
    }
    if (results){
        console.log(results);
    };
});

const debits = monoClient.account.getCustomerDebits({accountId: '604f8efd4dbec95bd65a1583'}, (err:any, results:any) => {
    if (err) {
        console.log(err);
    }
    if (results){
        console.log(results);
    };
});

const income = monoClient.account.getIncome({accountId: '604f8efd4dbec95bd65a1583'}, (err:any, results:any) => {
    if (err) {
        console.log(err);
    }
    if (results){
        console.log(results);
    };
});

const identity = monoClient.account.getIdentity({accountId: '604f8efd4dbec95bd65a1583'}, (err:any, results:any) => {
    if (err) {
        console.log(err);
    }
    if (results){
        console.log(results);
    };
});

const syncDataManually = monoClient.account.syncDataManually({accountId: '604f8efd4dbec95bd65a1583'}, (err:any, results:any) => {
    if (err) {
        console.log(err);
    }
    if (results){
        console.log(results);
    };
});

const reauthCode = monoClient.account.reauthCode({accountId: '604f8efd4dbec95bd65a1583'}, (err:any, results:any) => {
    if (err) {
        console.log(err);
    }
    if (results){
        console.log(results);
    };
});

const unlink = monoClient.account.unlinkAccount({accountId: '604f8efd4dbec95bd65a1583'}, (err:any, results:any) => {
    if (err) {
        console.log(err);
    }
    if (results){
        console.log(results);
    };
});

const lookupBvn = monoClient.misc.bvnLookup({bvn: '12345678901'}, (err:any, results:any) => {
    if (err) {
        console.log(err);
    }
    if (results){
        console.log(results);
    };
});

const institutions = monoClient.misc.institutions((err:any, results:any) => {
    if (err) {
        console.log(err);
    }
    if (results){
        console.log(results);
    };
});
