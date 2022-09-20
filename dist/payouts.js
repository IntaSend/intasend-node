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
var crypto = require('crypto');
var buffer = require('buffer');
var requests_1 = require("./requests");
var Payouts = /** @class */ (function (_super) {
    __extends(Payouts, _super);
    function Payouts() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Payouts.prototype.initiate = function (payload) {
        return this.send(payload, '/api/v1/send-money/initiate', 'POST');
    };
    Payouts.prototype.sign = function (nonce) {
        var data = Buffer.from(nonce);
        var sign = crypto.sign('SHA256', data, this.private_key);
        return sign.toString('hex');
    };
    Payouts.prototype.approve = function (payload, sign_nonce) {
        payload['sign_nonce'] = sign_nonce;
        if (sign_nonce) {
            if (!this.private_key) {
                throw Error('Private key is required');
            }
            payload['nonce'] = this.sign(payload['nonce']);
        }
        return this.send(payload, '/api/v1/send-money/approve/', 'POST');
    };
    Payouts.prototype.status = function (payload) {
        return this.send(payload, '/api/v1/send-money/status/', 'POST');
    };
    return Payouts;
}(requests_1["default"]));
exports["default"] = Payouts;
