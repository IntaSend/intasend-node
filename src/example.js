const IntaSend = require('./intasend');

// IMPORTANT:
// =================================
// The keys below have been added for example purposes only i.e for you to test easily
// You can also obtain your test keys from https://sandbox.intasend.com
// Here is our full API reference - https://developers.intasend.com/reference/ and documentation https://developers.intasend.com/docs/
// In your code, do not place the keys and commit to code repositories.
// We recommend using environment variables and 12Factor web approach. Please check it out here: https://12factor.net/

let intasend = new IntaSend(
  'ISPubKey_test_91ffc81a-8ac4-419e-8008-7091caa8d73f',
  'ISSecretKey_test_15515fe9-fb5d-4362-970e-625532df8181',
  true
);

// Create checkout page i.e payment collection link
let collection = intasend.collection();
collection
  .charge({
    first_name: 'FELIX',
    last_name: 'Cheruiyot',
    email: 'felix@intasend.com',
    host: 'https://stackblitz.com',
    amount: 10,
    currency: 'KES',
    api_ref: 'test',
  })
  .then((resp) => {
    console.log(`Charge Resp: ${JSON.stringify(resp)}`);
  })
  .catch((err) => {
    console.log(`Charge error: ${err}`);
  });

// How to trigger STK Push
collection
  .mpesaStkPush({
    phone_number: '25472xxxxxxx',
    name: 'John Doe',
    email: 'test@intasend.com',
    amount: 10,
    api_ref: 'test',
  })
  .then((resp) => {
    console.log(`Resp: ${JSON.stringify(resp)}`);
  })
  .catch((err) => {
    console.error(`error: ${err}`);
  });

// How to create and interact with Wallets
let wallets = intasend.wallets();
wallets
  .create({
    label: 'NodeJS-SDK-TEST',
    wallet_type: 'WORKING',
    currency: 'KES',
  })
  .then((resp) => {
    console.log(`Funding response: ${JSON.stringify(resp)}`);
  })
  .catch((err) => {
    console.error(`Funding error: ${err}`);
  });

// How to send money M-PESA (B2C, B2B, BANK, INTASEND P2P)
// Learn more from our API reference on provider types and fields here - https://developers.intasend.com/reference/send-money_initiate_create
let payouts = intasend.payouts();
payouts
  .initiate({
    provider: 'MPESA-B2B',
    currency: 'KES',
    transactions: [
      {
        name: 'ABC',
        account: 247247,
        amount: '100',
        account_type: 'PayBill',
        account_reference: '11111111',
      },
    ],
  })
  .then((resp) => {
    console.log(`Payouts response: ${JSON.stringify(resp)}`);
    // Approve payouts
    payouts
      .approve(resp)
      .then((resp) => {
        console.log(`Payouts approve: ${JSON.stringify(resp)}`);
      })
      .catch((err) => {
        console.error(`Payouts approve error: ${err}`);
      });
  })
  .catch((err) => {
    console.error(`Payouts error: ${err}`);
  });

// How to handle refunds
let refunds = intasend.refunds();
refunds
  .create({
    invoice: 'INVOICE-NUMBER',
    amount: 200,
    reason: 'UNAVAIBLE',
    reason_details: 'Service unavailable',
  })
  .then((resp) => {
    console.log(`Invoice response: ${resp}`);
  })
  .catch((err) => {
    console.error(`Invoice error: ${err}`);
  });
