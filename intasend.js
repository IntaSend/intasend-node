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
    return IntaSend;
}(requests_1["default"]));
exports["default"] = IntaSend;
var service = new IntaSend('ISPubKey_test_91ffc81a-8ac4-419e-8008-7091caa8d73f', 'ISSecretKey_test_82ab1e88-d97f-45b0-bec1-c59f6f4cbd2e', true);
var collection = service.collection();
collection
    .charge()
    .then(function (resp) {
    console.log("Charge Resp: ".concat(resp));
})["catch"](function (err) {
    console.error("Charge error: ".concat(err));
});
var wallet = service.wallet();
wallet
    .fund()
    .then(function (resp) {
    console.log("Funding response: ".concat(resp));
})["catch"](function (err) {
    console.error("Funding error: ".concat(err));
});
