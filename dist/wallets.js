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
    Wallet.prototype.list = function () {
        return this.send(null, '/api/v1/wallets/', 'GET');
    };
    Wallet.prototype.create = function (payload) {
        return this.send(payload, '/api/v1/wallets/', 'POST');
    };
    Wallet.prototype.intraTransfer = function (payload) {
        return this.send(payload, '/api/v1/wallets/', 'POST');
    };
    Wallet.prototype.get = function (payload) {
        return this.send(payload, "/api/v1/wallets/", 'POST');
    };
    Wallet.prototype.transactions = function (walletID) {
        return this.send(null, "/api/v1/wallets/".concat(walletID, "/transactions/"), 'GET');
    };
    Wallet.prototype.fundMPesa = function (payload, walletID) {
        return this.send(payload, "/api/v1/wallets/".concat(walletID, "/"), 'POST');
    };
    return Wallet;
}(requests_1["default"]));
exports["default"] = Wallet;
