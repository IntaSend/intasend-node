"use strict";
exports.__esModule = true;
var https = require('https');
var RequestClient = /** @class */ (function () {
    function RequestClient(publishable_key, secret_key, test_mode) {
        this.prod_base_url = 'payment.intasend.com';
        this.test_base_url = 'sandbox.intasend.com';
        this.publishable_key = publishable_key;
        this.secret_key = secret_key;
        this.test_mode = test_mode;
    }
    RequestClient.prototype.send = function (payload, service_path) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var base_url = _this.prod_base_url;
            if (_this.test_mode) {
                base_url = _this.test_base_url;
            }
            var headers = { 'Content-Type': 'application/json' };
            if (_this.secret_key) {
                headers['Authorization'] = "Bearer ".concat(_this.secret_key);
            }
            if (_this.publishable_key) {
                payload['public_key'] = _this.publishable_key;
            }
            var options = {
                hostname: base_url,
                port: 443,
                path: service_path,
                method: 'POST',
                headers: headers
            };
            var op = JSON.stringify(options);
            console.log("REQUEST OPTIONS: ".concat(op));
            var req = https.request(options, function (res) {
                console.log("statusCode: ".concat(res.statusCode));
                if (res.statusCode !== 201 || res.statusCode !== 200) {
                    console.log("Server request failed: ".concat(res.statusCode));
                    res.resume();
                    reject(res);
                    return;
                }
                console.log("Server request status code: ".concat(res.statusCode));
                res.on('data', function (data) {
                    resolve(data);
                    return;
                });
            });
            var p = JSON.stringify(payload);
            console.log("REQUEST PAYLOAD: ".concat(p));
            req.on('error', function (err) {
                console.log("totoal failuer: ".concat(err.message));
                reject(err.message);
                return;
            });
            req.write(JSON.stringify(payload));
            req.end();
        });
    };
    return RequestClient;
}());
exports["default"] = RequestClient;
