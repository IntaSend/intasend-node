"use strict";
exports.__esModule = true;
var axios_1 = require("axios");
var RequestClient = /** @class */ (function () {
    function RequestClient(publishable_key, secret_key, test_mode) {
        this.prod_base_url = 'https://payment.intasend.com';
        this.test_base_url = 'https://sandbox.intasend.com';
        this.publishable_key = publishable_key;
        this.secret_key = secret_key;
        this.test_mode = test_mode;
    }
    RequestClient.prototype.send = function (payload, service_path) {
        var base_url = this.prod_base_url;
        if (this.test_mode) {
            base_url = this.test_base_url;
        }
        var headers = { 'Content-Type': 'application/json' };
        if (this.secret_key) {
            headers['Authorization'] = "Bearer ".concat(this.secret_key);
        }
        if (this.publishable_key) {
            payload['public_key'] = this.publishable_key;
        }
        console.log("Request URL: ".concat(base_url).concat(service_path, ": ").concat(JSON.stringify(headers)));
        return axios_1["default"].post("".concat(base_url).concat(service_path), payload, {
            headers: headers
        });
    };
    return RequestClient;
}());
exports["default"] = RequestClient;
