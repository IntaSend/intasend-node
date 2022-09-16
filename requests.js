"use strict";
exports.__esModule = true;
var https = require('https');
var RequestClient = /** @class */ (function () {
    function RequestClient(publishable_key, secret_key, test_mode) {
        this.prod_base_url = 'https://payment.intasend.com';
        this.test_base_url = 'https://sandbox.intasend.com';
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
                host: base_url,
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
                }
                console.log("Server request status code: ".concat(res.statusCode));
                resolve(res);
            });
            var p = JSON.stringify(payload);
            console.log("REQUEST PAYLOAD: ".concat(p));
            req.on('error', function (err) {
                console.log("totoal failuer: ".concat(err.message));
                reject(err.message);
            });
            req.write(JSON.stringify(payload));
            req.end();
        });
        // send(payload: object, service_path: string) {
        //   let base_url = this.prod_base_url;
        //   if (this.test_mode) {
        //     base_url = this.test_base_url;
        //   }
        //   let headers = { 'Content-Type': 'application/json' };
        //   if (this.secret_key) {
        //     headers['Authorization'] = `Bearer ${this.secret_key}`;
        //   }
        //   if (this.publishable_key) {
        //     payload['public_key'] = this.publishable_key;
        //   }
        //   console.log(
        //     `Request URL: ${base_url}${service_path}: ${JSON.stringify(headers)}`
        //   );
        //   return axios.post(`${base_url}${service_path}`, payload, {
        //     headers: headers,
        //   });
    };
    return RequestClient;
}());
exports["default"] = RequestClient;
