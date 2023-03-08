# Mono Node.js Library

The Mono Node library provides convenient access to the Mono API from
applications written in server-side JavaScript.

For connecting customer accounts in the browser or an app, use the [Mono Connect Widget](https://github.com/withmono/connect.js).

## Documentation

For complete information about the API, head to the [docs](https://docs.mono.co/reference/documentation-intro).


## Getting Started

1. Register on the [Mono](https://app.withmono.com/dashboard) website and get your public and secret keys.
2. Setup your [Mono Connect Widget](https://docs.mono.co/docs/intro-to-mono-connect-widget) with your Mono public key.

## Installation

Install the package with:

```sh
npm install mono-node --save
# or
yarn add mono-node
```

## Usage

The package needs to be configured with your account's `secretKey`, which is
available in the [Mono Dashboard](https://app.withmono.com/apps).

```js

// import the module
const { Mono } = require("mono-node");

// set the secret key
const monoClient = new Mono({
    secretKey: "test_sk_...",
});

// get your Mono Wallet balance
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

## Features

- [Wallet Balance](#wallet)
- [Get Account ID from Auth Code](#account_id)
- [Unlink Account](#unlink)
- [Account Information](#info)
- [Account Statement](#statement)
- [Poll Account Statement PDF](#statement_pdf)
- [Transactions](#transactions)
- [Credits](#credits)
- [Debits](#debits)
- [Income Information](#income)
- [Identity](#identity)
- [Sync Data](#sync)
- [Re-auth Code](#reauth)
- [Institutions](#institutions)
- [Create Payment](#create-payment)
- [Verify payment](#verify-payment)

# Implementation

## Methods

Once an instance of the client has been created you use the following methods:


### <a name="wallet"></a>Get Wallet Balance
This resource allows you to check the available balance in your Mono wallet

```js
monoClient.user.walletBalance(callback);
```



### <a name="account_id"></a>Get Account Id from token
This resource returns the account id (that identifies the authenticated account) after successful enrolment on the Mono Connect Widget.
```js
monoClient.auth.getAccountId({code: String}, callback);

```

### <a name="unlink"></a>Unlink Account
This resource provides your customers with the option to unlink their financial account(s)
```js
monoClient.account.unlinkAccount({accountId: String}, callback);
```

### <a name="info"></a>Get Account Information
This resource returns the account details with the financial institution.

```js
monoClient.account.getAccountInformation({accountId: String}, callback);
```


### <a name="statement"></a>Get Account Statement in JSON
This resource returns the bank statement of the connected financial account in JSON.
You can query 1-12 months bank statement in one single call.
```js
monoClient.account.getAccountStatement({accountId: String, output: 'json'}, callback);

```

### Get Account Statement in PDF
This resource returns the bank statement of the connected financial account in PDF.
You can query 1-12 months bank statement in one single call.
```js
monoClient.account.getAccountStatement({accountId: String, output: 'pdf'}, callback);

```

### <a name="statement_pdf"></a>Poll Account Statement in PDF
With this resource, you set the output as PDF, and you can use this endpoint to poll the status
```js
monoClient.account.pollPdfAccountStatementStatus({accountId: String, jobId: Striing}, callback);

```

### <a name="transactions"></a>Get Account Transactions
This resource returns the known transactions on the account.

```js
monoClient.account.getAccountTransactions({accountId: String, type: 'credit'}, callback);
```

### <a name="credits"></a>Get Customer's Credits
This resource returns the historical credits on the account
```js
monoClient.account.getCustomerCredits({accountId: String}, callback);
```

### <a name="debits"></a>Get Customer's Debits
This resource returns the historical debits on the account
```js
monoClient.account.getCustomerDebits({accountId: String}, callback);
```

### <a name="income"></a>Get Income Information
This resource will return income information on the account.
```js
monoClient.account.getIncome({accountId: String}, callback);
```

### <a name="identity"></a>Get Account Identity
This resource returns a high level overview of an account identity data.
```js
monoClient.account.getIdentity({accountId: String}, callback);
```

### <a name="sync"></a>Synchronise Data
This resource attempts to Sync data manually.
```js
monoClient.account.syncDataManually({accountId: String}, callback);
```

### <a name="reauth"></a>Get Re-auth Code.
This resource returns a Re-auth code which is a mono generated code for the account you want to re-authenticate,
```js
monoClient.account.reauthCode({accountId: String}, callback);
```

### <a name="institutions"></a>Get Financial Institutions
This resource returns the available institutions on Mono
```js
monoClient.misc.institutions(callback);

```

### <a name="create-payment"></a>create payment link
This resource initializes a direct pay session.
```ts

  client.payment.initiate(
    {
      reference: '2498y58y59',
      amount: 100000,
      description: 'Test payment',
      meta: {
        name: 'Lanre',
      },
      type: 'onetime-debit',
    },
    (err: any, results: any) => {
      console.log(err);
      console.log(results);
    }
  );

```

### <a name="verify-payment"></a>verify payment
This resource verifies a payment.
```ts

  client.payment.verify(
    { reference: '2498y58y59' },
    (err: any, results: any) => {
      console.log(err, results);
    }
  );

```


## Callbacks

All requests have callbacks of the following form:

```js
function callback(err, results) {
    // Handle errors
    if (err) {
        console.log(err);
    }
    if (results){
        console.log(results);
    };
}
```

## Error Handling

The `err` argument passed to the callback is a [Mono API error](https://docs.mono.co/docs/errors).

```js
function callback(err, results) {
  if (err != null) {
      console.log(err)
  }
}
```

## Examples

Exchange an auth `code` from [Mono Connect Widget](https://docs.mono.co/docs/widgets) for an `accountId` and then retrive account data:

**Note:** If the meta `data_status` is still in the processing stage, you have to wait before calling the APIs below e.g **Statement**, **Transaction**, **Income** and **Identity** Endpoints. Some banks are faster than others, so it may be available instantly after authorization and some banks might take a few seconds or minutes.

```js
// code from Mono Connect Widget
const authCode = 'RANDOM_CODE'

monoClient.auth.getAccountId({code: authCode}, (err, results) => {
  const accountId = results.id

  monoClient.account.getAccountInformation({accountId: accountId}, (err, results) => {
    console.log(results.account)
    if(results.meta.data_status == 'AVAILABLE'){
         console.log('Account data ready for use.')
    }
  });
});
```

Get account [transactions](https://docs.mono.co/reference/transactions) for the last thirty days:


```js
const now = moment();
const today = now.format('DD-MM-YYYY');
const thirtyDaysAgo = now.subtract(30, 'days').format('DD-MM-YYYY');

monoClient.account.getAccountTransactions({accountId: String, start: today, end: thirtyDaysAgo, paginate: false}, (err, results) => {
  console.log(`You have ${results.data.length} transactions from the last thirty days.`);
});
```

Get [income](https://docs.mono.co/reference/income) for an account:

**Note:** This is a number estimated by Mono. It is not nesecarrily 100% correct, however, a confidence interval is provided to show the estimations accuracy.

```js
monoClient.account.getIncome({accountId: String}, (err, results) => {
  console.log(`Your ${results.type} is ${results.amount}. You work at ${results.employer}`);
});
```

Get an [identity](https://docs.mono.co/reference/identity) for an account:

**Note:** Not all banks return identity information. [See Coverage](https://docs.mono.co/docs/bvn-coverage)
```js
monoClient.account.getIdentity({accountId: String}, (err, results) => {
  console.log(`Your ${results.type} is ${results.amount}. You work at ${results.employer}`);
});
```

Manual [data sync](https://docs.mono.co/reference/intro#manually-trigger) for an account:

**Note:** This may require some users to re-authorize their bank account with Mono. [See Re-authorization](https://docs.mono.co/reference/intro#reauthorisation)
```js
monoClient.account.syncDataManually({accountId: String}, (err, results) => {
  console.log(`Status: ${results.status}`);
});
```

Get [re-auth code](https://docs.mono.co/reference/intro#reauth-code) for an account:

**Note:** Please note that this Re-auth code/token expires in 10 minutes. You will need to pass the re-auth code to a Mono Connect Widget to complete verification.
```js
monoClient.account.reauthCode({accountId: String}, (err, results) => {
  console.log(results.token);
});
```

Unlink a bank account:

It is strongly recommend to implement this feature to build trust with your users and allow them to have complete control of their data. [See Docs](https://docs.mono.co/reference/mono-unlink-account)

```js
monoClient.account.unlinkAccount({accountId: String}, (err, results) => {
  console.log(results.message);
});
```

## Support
If you're having general trouble with Mono Node.js or your Mono integration, please reach out to us at <hi@mono.co> or come chat with us on [Slack](https://join.slack.com/t/devwithmono/shared_invite/zt-gvkqczzk-Ldt4FQpHtOL7FFTqh4Ux6A). We're proud of our level of service, and we're more than happy to help you out with your integration to Mono.

## Contributing
If you would like to contribute to the Mono Node.js Library, please make sure to read our [contributor guidelines](https://github.com/withmono/mono-node/tree/main/CONTRIBUTING.md).


## License

[MIT](https://github.com/withmono/mono-node/blob/develop/LICENSE) for more information.
