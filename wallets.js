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
var Wallet = /** @class */ (function (_super) {
    __extends(Wallet, _super);
    function Wallet() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Wallet.prototype.fund = function () {
        return this.send({
            name: 'ABC',
            wallet_type: 'WORKING',
            currency: 'KES'
        }, '/api/v1/wallets/');
    };
    Wallet.prototype.intraTransfer = function () {
        console.log('Fake transfer wallet');
    };
    return Wallet;
}(requests_1["default"]));
exports["default"] = Wallet;
