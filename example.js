const IntaSend = require('./intasend');

const privateKey = `-----BEGIN RSA PRIVATE KEY-----
MIIEpQIBAAKCAQEA6194XLgIl8lozJozjgDgGDX4StEpf8qF5AgG8SbuS9AiIril
b4e/sWFDqy8Vvg87UY0SQ9Z2m/lVDQapWu1l/79CSkPQQPF8SEUF/NbQ9YrwnHIz
cVAm3s6L6B0Y9OH6ieoLB2a26bBym0RvLOF+ubIEOslDs775MeZc0ZOwHZTBvqlZ
Ks7MaqZFYzMSsoq1p89uLdO3WSau3LY57kMRW0hrFMWSneh85duC2+v6PnsofLOz
K384EeH9/i4KiEcRBVspN+9HnG6mfFH5SMmG6eXzuFGkVj2lT/wqLEuA38NGmLde
01Bw4K8FxZe/o25r3z9V1GjUoNxp0JTindzWrwIDAQABAoIBAQC/jM+wbVkY5iGy
uR+RxmaZbXqmsLgcNt5l6J51rSArdLQDG9APByPbIHPooYYJSe4VfUBLEwMuBmjQ
FAbJaAAldSpms++MmrpxOjMYRF6EJdGREGOLKRapJuC3Qs7no+y4Rk85c78SSbXL
ZJMxrEXsq9JDYT4GzzmQAZCyQoYGW1UPI/MwJe83+dCB1KO2IGbOKp1wXIqpG7/Y
u/ta7q/eTZB0NxyUHH4r029eqGckHo6hropa0dkJnLe6Vz6tsZ1AJ3qdxqRT1QfP
Lpt8sX0adBT8L8ib4ISiPpMK/X9iUYX1JmG7AHkyFi6G07Qnar75G9cKUT564952
l9FvXaIRAoGBAPej580fSmWHKDe64g0cIxuBOpB4aPA/6sqzMfP7BbkWMLFIZwtf
E//6E5ouG0nEdWl4rzvp0lr/mibprzOhB4PNnRALyi3n2+0O25PSubT2UFFeMHty
gBytXeoI4M0Cy1rn75I5/Z+YrgQInbIa+BGIRhFrgdj+EUB0o/nwDvupAoGBAPNR
jRQMW0jdsuW6r0/xcCfjNq40ZHYFbEnSF9H4x0iqZqpPbSs4vRoMIQRlzKExAPd5
pYPZgM03HahOJEy/4OOmVlOg61L5kvYT1TgNm4o5CtDMhoTmSdmfzfDCsUNtdDdc
m9Gac1Nw33K2U+9Yod3QKUUSRyxEcPdEBGpU4vaXAoGBAOO3LKhKZbcGmczlZIh5
ny7jnl7K2nRR0i2iqgSYh6Ky7QOYeGjUfSedZfkY/K7QoMbj2v9U+8IB2FZ//EOV
h7uDjzH6JWghFPLf/rnnxCzLcv/fhOV/XJ8CLKHQmCbssuJc9MeZ28auNxYudhQZ
CJPWo9fQ7A4FUwfaOg7S2HRBAoGAQtq6b7LBdjDsEbEMsGN/VIZapNziaYct7M6c
GuZHI1Emqk7uiPyrALgqbkHmSrfjMxwqfSLLABfPv0nRMYFbMlGm0I2bew318kUa
xa7/eKgZr6syntuDmRcOh8OG3yb40qlQavQMEfYmfydXwqDQwNiMLl1KTwBzJY17
xReT0PsCgYEAwnIli+mpAvHqKrc2BGL3yQQX6ksGnGd8/Rb5r9d542ZJNe2LxOAj
RXIy2TyqejdtgP6jW3NS0PE6cNL6exl2hCKGPZtMXu/fT4CH/vCNn0t3a02FuqyJ
rXHiaVDBZNv4cJp10C6nxf2WRJ69ljzdj/Y+OWWEKvU6LKLOyJgt/yM=
-----END RSA PRIVATE KEY-----`

let intasend = new IntaSend(
  'ISPubKey_test_91ffc81a-8ac4-419e-8008-7091caa8d73f',
  'ISSecretKey_test_7a8d06c8-e3b2-4bff-9f9d-ac0807fa9880',
  true,
  privateKey
);

/*let collection = intasend.collection();
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
    console.log(`Charge Resp: ${resp}`);
  })
  .catch((err) => {
    console.log(`Charge error: ${err}`);
  });

collection
  .mpesaStkPush({
    phone_number: '254723890353',
    name: 'Felix Cheruiyot',
    email: 'felix@intasend.com',
    amount: 10,
    api_ref: 'test',
  })
  .then((resp) => {
    console.log(`Resp: ${resp}`);
  })
  .catch((err) => {
    console.error(`error: ${err}`);
  });

let wallet = intasend.wallet();
wallet
  .create({
    label: 'NodeJS-SDK-TEST',
    wallet_type: 'WORKING',
    currency: 'KES',
  })
  .then((resp) => {
    console.log(`Funding response: ${resp}`);
  })
  .catch((err) => {
    console.error(`Funding error: ${err}`);
  });
*/
let payouts = intasend.payouts();
payouts
  .initiate({
	  device_id: 'KR0DNYO',
    provider: 'MPESA-B2B',
    currency: 'KES',
	  transactions: [
		{
            "name": "ABC",
            "account": 247247,
            "amount": "100",
            "account_type": "PayBill",
            "account_reference": "11111111"
        }
	  ]
  })
  .then((resp) => {
    console.log(`Payouts response: ${resp}`);
    // Approve payouts
    payouts
      .approve(resp, true)
      .then((resp) => {
        console.log(`Payouts approve: ${resp}`);
      })
      .catch((err) => {
        console.error(`Payouts approve error: ${err}`);
      });
  })
  .catch((err) => {
    console.error(`Payouts error: ${err}`);
  });
/*
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
 */
