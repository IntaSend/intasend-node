const https = require('https');

export default class RequestClient {
  publishable_key: string;
  secret_key: string;
  prod_base_url: string = 'payment.intasend.com';
  test_base_url: string = 'sandbox.intasend.com';
  test_mode: boolean;
  constructor(publishable_key: string, secret_key: string, test_mode: boolean) {
    this.publishable_key = publishable_key;
    this.secret_key = secret_key;
    this.test_mode = test_mode;
  }
  send(payload: object, service_path: string) {
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
        payload['public_key'] = this.publishable_key;
      }
      const options = {
        hostname: base_url,
        port: 443,
        path: service_path,
        method: 'POST',
        headers: headers,
      };
      const req = https.request(options, (res) => {
        console.log(`statusCode: ${res.statusCode}`);
        if (res.statusCode !== 201 && res.statusCode !== 200) {
          console.log(`Resp Code: ${res.statusCode}`);
          res.resume();
          res.on('data', (data) => {
            reject(data);
          });
          return;
        }
        console.log(`Resp Code: ${res.statusCode}`);
        res.on('data', (data) => {
          resolve(data);
          return;
        });
      });
      req.on('error', (err) => {
        reject(err.message);
        return;
      });
      req.write(JSON.stringify(payload));
      req.end();
    });
  }
}
