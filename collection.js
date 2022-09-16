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
var Collection = /** @class */ (function (_super) {
    __extends(Collection, _super);
    function Collection() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Collection.prototype.charge = function () {
        this.secret_key = '';
        return this.send({
            first_name: 'FELIX',
            last_name: 'Cheruiyot',
            email: 'felix@intasend.com',
            host: 'https://stackblitz.com',
            amount: 10,
            currency: 'KES',
            api_ref: 'test'
        }, '/api/v1/checkout/');
    };
    return Collection;
}(requests_1["default"]));
exports["default"] = Collection;
