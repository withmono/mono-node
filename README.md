Convenient Node.js wrapper to the Mono API


# Mono Node
Mono-Node is a node.js wrapper for <a href="https://mono.co"> Mono </a>
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
   yarn install mono-node
```

<br />

## Import the module
```js
import client from "mono-node";
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
client.getWalletBalance(secretKey, (err, results) => {
    // Handle errors
    if (err) console.log(err);

    const data = results.balance;
});
```

<br />

### - Get Account Information
This resource returns the account details with the financial institution.

```js
client.getAccountInformation(secretKey, {accountId: accountId}, (err, results) => {
    // Handle errors
    if (err) console.log(err);

    const data = results;
});
```

<br />

### - Get Account Id from token
This resource returns the account id (that identifies the authenticated account) after successful enrolment on the Mono connect widget.
```js
client.getAccountId(secretKey, {code: code}, (err, results) => {
    // Handle errors
    if (err) console.log(err);

    const data = results.id;
});

```


### - Get Account Statement in JSON
This resource returns the bank statement of the connected financial account in JSON.  
You can query 1-12 months bank statement in one single call.
```js
client.getAccountStatement(secretKey, {accountId: accountId,output:"json",period:"last2months"}, (err, results) => {
    // Handle errors
    if (err) console.log(err);

    const data = results;
});

```

### - Get Account Statement in PDF
This resource returns the bank statement of the connected financial account in PDF.  
You can query 1-12 months bank statement in one single call.
```js
client.getAccountStatement(secretKey, {accountId: accountId,output:"pdf",period:"last2months"}, (err, results) => {
    // Handle errors
    if (err) console.log(err);

    const data = results.path;
});

```

### - Poll Account Statement in PDF
With this resource, you set the output as PDF, and you can use this endpoint to poll the status
```js
client.pollAccountStatementPdf(secretKey, {accountId: accountId, jobId:jobId}, (err, results) => {
    // Handle errors
    if (err) console.log(err);

    const data = results.path;
});

```

### - Get Account Transactions
This resource returns the known transactions on the account.

```js
client.getAccountTransactions(secretKey, {
    accountId: accountId,
    start:'01-10-2020',
    end:'07-10-2020',
    narration: 'Uber transactions',
    type:'debit',
    paginate: false,
    limit: 3
}, (err, results) => {
    // Handle errors
    if (err) console.log(err);

    const data = results.data;
    const total = results.paging.total;
    const page = results.paging.page;
    const previous = results.paging.previous;
    const next = results.paging.next;
});

```

### - Get Customer's Credits
This resource returns the historical credits on the account
```js
client.getCustomerCredit(secretKey, {accountId: accountId}, (err, results) => {
    // Handle errors
    if (err) console.log(err);

    const data = results.total;
    const history = results.history;
});

```

### - Get Customer's Debits
This resource returns the historical debits on the account
```js
client.getCustomerDebit(secretKey, {accountId: accountId}, (err, results) => {
    // Handle errors
    if (err) console.log(err);

    const data = results.total;
    const history = results.history;
});

```

### - Get Income Information
This resource will return income information on the account.
```js
client.getIncomeInformation(secretKey, {accountId: accountId}, (err, results) => {
    // Handle errors
    if (err) console.log(err);

    const type = results.type;
    const amount = results.amount;
    const confidence = results.confidence;
});

```


### - Get Account Identity
This resource returns a high level overview of an account identity data.
```js
client.getIdentity(secretKey, {accountId: accountId}, (err, results) => {
    // Handle errors
    if (err) console.log(err);

    const data = results;
});

```

### - Synchronise Data
This resource attempts to Sync data manually.
```js
client.syncData(secretKey, {accountId: accountId}, (err, results) => {
    // Handle errors
    if (err) console.log(err);

    const status = results.status;
    const code = results.code;
});

```

### - Get Re-auth Code. 
This resource returns a Re-auth code which is a mono generated code for the account you want to re-authenticate,
```js
client.getReauthCode(secretKey, {accountId: accountId}, (err, results) => {
    // Handle errors
    if (err) console.log(err);

    const token = results.token;
});

```

### - Get Financial Institutions
This resource returns the available institutions on Mono
```js
client.getInstitutions(secretKey, (err, results) => {
    // Handle errors
    if (err) console.log(err);

    const data = results;
});

```


### - BVN Lookup
This resource looks up BVN.
```js
client.bvnLookup(secretKey, {bvn: '1234567890'}, (err, results) => {
    // Handle errors
    if (err) console.log(err);

    const data = results;
});

```


### - Unlink Account
This resource provides your customers with the option to unlink their financial account(s)
```js
client.unlinkAccount(secretKey, {accountId: accountId}, (err, results) => {
    // Handle errors
    if (err) console.log(err);

    const data = results;
});

```

The MIT License (MIT). Please see <a href="https://github.com/withmono/mono-node/blob/main/LICENSE.md">License File</a> for more information.
