const https = require('https');

class RequestClient {
  publishable_key;
  secret_key;
  prod_base_url = 'payment.intasend.com';
  test_base_url = 'sandbox.intasend.com';
  test_mode = true;
  constructor(publishable_key, secret_key, test_mode) {
    this.publishable_key = publishable_key;
    this.secret_key = secret_key;
    this.test_mode = test_mode;
  }
  send(payload, service_path, req_method) {
    let method = req_method || 'POST';
    return new Promise((resolve, reject) => {
      let base_url = this.prod_base_url;
      if (this.test_mode) {
        base_url = this.test_base_url;
      }
      let headers = { 'Content-Type': 'application/json' };
      if (this.secret_key) {
        headers['Authorization'] = `Bearer ${this.secret_key}`;
      }
      if (this.publishable_key) {
        headers['INTASEND_PUBLIC_API_KEY'] = this.publishable_key;
        payload['public_key'] = this.publishable_key;
      }
      const options = {
        hostname: base_url,
        port: 443,
        path: service_path,
        method: method,
        headers: headers,
      };
      const req = https.request(options, (res) => {
        if (res.statusCode !== 201 && res.statusCode !== 200) {
          console.error(`IntaSend Request HTTP Error Code: ${res.statusCode}`);
          res.resume();
          res.on('data', (data) => {
            reject(data);
          });
          return;
        }
        var results = '';
        res.on('data', (data) => {
          results += data;
        });
        res.on('end', () => {
          if (results) {
            resolve(JSON.parse(results));
            return;
          }
          resolve({});
        });
      });
      req.on('error', (err) => {
        reject(err.message);
        return;
      });
      if (payload) {
        req.write(JSON.stringify(payload));
      }
      req.end();
    });
  }
}

module.exports = RequestClient;
