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
var Refunds = /** @class */ (function (_super) {
    __extends(Refunds, _super);
    function Refunds() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Refunds.prototype.list = function () {
        return this.send(null, '/api/v1/chargebacks/', 'GET');
    };
    Refunds.prototype.create = function (payload) {
        return this.send(payload, '/api/v1/chargebacks/', 'POST');
    };
    Refunds.prototype.get = function (chargebackID) {
        return this.send(null, "/api/v1/chargebacks/".concat(chargebackID, "/"), 'GET');
    };
    return Refunds;
}(requests_1["default"]));
exports["default"] = Refunds;
