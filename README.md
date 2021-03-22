Convenient Node.js wrapper to the Mono API


# Mono Node
Mono-Node is a node.js wrapper for <a href="https://mono.co"> Mono </a>  
For complete information about the API, head to the <a href="https://docs.mono.co/reference">docs</a>.
<br /><br />

## Getting Started

- Register on <a href="https://app.withmono.com/dashboard"> Mono </a>  website and get your Authorization key.
- Setup your mono connect with your mono public key.

<br/>

## Installation
Using NPM
```js
   npm install mono-node
```
Using Yarn
```js
   yarn add mono-node
```

<br />

## Import the module
```js
const {Mono} = require("mono-node");
```

## Set Secret Key
```js
const monoClient = new Mono({
    secretKey: "live_sk_random",
});
```


## Features

- Wallet Balance
- Get Account ID. from Auth Code.
- Account Information
- Account Statement
- Poll Account Statement PDF
- Transactions
- Credits
- Debits
- Income Information
- Identity
- Sync Data
- Re-auth Code
- Institutions
- BVN Lookup
- Account Unlink
<br /><br />
# Implementation

### - Get Wallet Balance
This resource allows you to check the available balance in your Mono wallet

```js
monoClient.user.walletBalance((err, results) => {
    // Handle errors
    if (err) {
        console.log(err);
    }
    if (results){
        console.log(results);
    };
});
```

<br />

### - Get Account Information
This resource returns the account details with the financial institution.

```js
monoClient.account.getAccountInformation({accountId: '604f8efd4dbec95bd65a1583'}, (err, results) => {
    // Handle errors
    if (err) {
        console.log(err);
    }
    if (results){
        console.log(results);
    };
});
```

<br />

### - Get Account Id from token
This resource returns the account id (that identifies the authenticated account) after successful enrolment on the Mono connect widget.
```js
monoClient.auth.getAccountId({code: 'code_IjyfZzzMML1ZXc8tTpYG'}, (err, results) => {
    // Handle errors
    if (err) {
        console.log(err);
    }
    if (results){
        console.log(results);
    };
});

```


### - Get Account Statement in JSON
This resource returns the bank statement of the connected financial account in JSON.  
You can query 1-12 months bank statement in one single call.
```js
monoClient.account.getAccountStatement({accountId: '604f8efd4dbec95bd65a1583', output: 'json'}, (err, results) => {
    // Handle errors
    if (err) {
        console.log(err);
    }
    if (results){
        console.log(results);
    };
});

```

### - Get Account Statement in PDF
This resource returns the bank statement of the connected financial account in PDF.  
You can query 1-12 months bank statement in one single call.
```js
monoClient.account.getAccountStatement({accountId: '604f8efd4dbec95bd65a1583', output: 'pdf'}, (err, results) => {
    // Handle errors
    if (err) {
        console.log(err);
    }
    if (results){
        console.log(results);
    };
});

```

### - Poll Account Statement in PDF
With this resource, you set the output as PDF, and you can use this endpoint to poll the status
```js
monoClient.account.pollPdfAccountStatementStatus({accountId: '604f8efd4dbec95bd65a1583', jobId: 'QEP34KCSynTZgYXQr4e1'}, (err, results) => {
    // Handle errors
    if (err) {
        console.log(err);
    }
    if (results){
        console.log(results);
    };
});

```

### - Get Account Transactions
This resource returns the known transactions on the account.

```js
monoClient.account.getAccountTransactions({accountId: '604f8efd4dbec95bd65a1583', type: 'credit'}, (err, results) => {
    // Handle errors
    if (err) {
        console.log(err);
    }
    if (results){
        console.log(results);
    };
});
```

### - Get Customer's Credits
This resource returns the historical credits on the account
```js
monoClient.account.getCustomerCredits({accountId: '604f8efd4dbec95bd65a1583'}, (err, results) => {
    // Handle errors
    if (err) {
        console.log(err);
    }
    if (results){
        console.log(results);
    };
});
```

### - Get Customer's Debits
This resource returns the historical debits on the account
```js
monoClient.account.getCustomerDebits({accountId: '604f8efd4dbec95bd65a1583'}, (err, results) => {
    // Handle errors
    if (err) {
        console.log(err);
    }
    if (results){
        console.log(results);
    };
});
```

### - Get Income Information
This resource will return income information on the account.
```js
monoClient.account.getIncome({accountId: '604f8efd4dbec95bd65a1583'}, (err, results) => {
    // Handle errors
    if (err) {
        console.log(err);
    }
    if (results){
        console.log(results);
    };
});
```


### - Get Account Identity
This resource returns a high level overview of an account identity data.
```js
monoClient.account.getIdentity({accountId: '604f8efd4dbec95bd65a1583'}, (err, results) => {
    // Handle errors
    if (err) {
        console.log(err);
    }
    if (results){
        console.log(results);
    };
});
```

### - Synchronise Data
This resource attempts to Sync data manually.
```js
monoClient.account.syncDataManually({accountId: '604f8efd4dbec95bd65a1583'}, (err, results) => {
    // Handle errors
    if (err) {
        console.log(err);
    }
    if (results){
        console.log(results);
    };
});
```

### - Get Re-auth Code. 
This resource returns a Re-auth code which is a mono generated code for the account you want to re-authenticate,
```js
monoClient.account.reauthCode({accountId: '604f8efd4dbec95bd65a1583'}, (err, results) => {
    // Handle errors
    if (err) {
        console.log(err);
    }
    if (results){
        console.log(results);
    };
});
```

### - Get Financial Institutions
This resource returns the available institutions on Mono
```js
monoClient.misc.institutions((err, results) => {
    // Handle errors
    if (err) {
        console.log(err);
    }
    if (results){
        console.log(results);
    };
});

```


### - BVN Lookup
This resource looks up BVN.
```js
monoClient.misc.bvnLookup({bvn: '22354058195'}, (err, results) => {
    // Handle errors
    if (err) {
        console.log(err);
    }
    if (results){
        console.log(results);
    };
});
```


### - Unlink Account
This resource provides your customers with the option to unlink their financial account(s)
```js
monoClient.account.unlinkAccount({accountId: '604f8efd4dbec95bd65a1583'}, (err, results) => {
    // Handle errors
    if (err) {
        console.log(err);
    }
    if (results){
        console.log(results);
    };
});
```

## License

The MIT License (MIT). Please see <a href="https://github.com/withmono/mono-node/blob/main/LICENSE.md">License File</a> for more information.
