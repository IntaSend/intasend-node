"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var requests_1 = require("./requests");
var wallets_1 = require("./wallets");
var collection_1 = require("./collection");
var payouts_1 = require("./payouts");
var refunds_1 = require("./refunds");
var IntaSend = /** @class */ (function (_super) {
    __extends(IntaSend, _super);
    function IntaSend(publishable_key, secret_key, test_mode) {
        return _super.call(this, publishable_key, secret_key, test_mode) || this;
    }
    IntaSend.prototype.wallet = function () {
        return new wallets_1["default"](this.publishable_key, this.secret_key, this.test_mode);
    };
    IntaSend.prototype.collection = function () {
        return new collection_1["default"](this.publishable_key, this.secret_key, this.test_mode);
    };
    IntaSend.prototype.payouts = function () {
        return new payouts_1["default"](this.publishable_key, this.secret_key, this.test_mode);
    };
    IntaSend.prototype.refunds = function () {
        return new refunds_1["default"](this.publishable_key, this.secret_key, this.test_mode);
    };
    return IntaSend;
}(requests_1["default"]));
exports["default"] = IntaSend;
// let intasend = new IntaSend(
//   'ISPubKey_test_91ffc81a-8ac4-419e-8008-7091caa8d73f',
//   'ISSecretKey_test_82ab1e88-d97f-45b0-bec1-c59f6f4cbd2e',
//   true
// );
// let collection = intasend.collection();
// collection
//   .charge({
//     first_name: 'FELIX',
//     last_name: 'Cheruiyot',
//     email: 'felix@intasend.com',
//     host: 'https://stackblitz.com',
//     amount: 10,
//     currency: 'KES',
//     api_ref: 'test',
//   })
//   .then((resp) => {
//     console.log(`Charge Resp: ${resp}`);
//   })
//   .catch((err) => {
//     console.error(`Charge error: ${err}`);
//   });
// collection
//   .mpesaStkPush({
//     phone_number: '254723890353',
//     name: 'Felix Cheruiyot',
//     email: 'felix@intasend.com',
//     amount: 10,
//     api_ref: 'test',
//   })
//   .then((resp) => {
//     console.log(`Resp: ${resp}`);
//   })
//   .catch((err) => {
//     console.error(`error: ${err}`);
//   });
// let wallet = intasend.wallet();
// wallet
//   .create({
//     label: 'NodeJS-SDK-TEST',
//     wallet_type: 'WORKING',
//     currency: 'KES',
//   })
//   .then((resp) => {
//     console.log(`Funding response: ${resp}`);
//   })
//   .catch((err) => {
//     console.error(`Funding error: ${err}`);
//   });
// let payouts = intasend.payouts();
// payouts
//   .initiate({
//     label: 'NodeJS-SDK-TEST',
//     wallet_type: 'WORKING',
//     currency: 'KES',
//   })
//   .then((resp) => {
//     console.log(`Payouts response: ${resp}`);
//     // Approve payouts
//     payouts
//       .approve(resp, false)
//       .then((resp) => {
//         console.log(`Payouts approve: ${resp}`);
//       })
//       .catch((err) => {
//         console.error(`Payouts approve error: ${err}`);
//       });
//   })
//   .catch((err) => {
//     console.error(`Payouts error: ${err}`);
//   });
// let refunds = intasend.refunds();
// refunds
//   .create({
//     invoice: 'INVOICE-NUMBER',
//     amount: 200,
//     reason: 'UNAVAIBLE',
//     reason_details: 'Service unavailable',
//   })
//   .then((resp) => {
//     console.log(`Invoice response: ${resp}`);
//   })
//   .catch((err) => {
//     console.error(`Invoice error: ${err}`);
//   });
