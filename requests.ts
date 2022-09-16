const https = require('https');

export default class RequestClient {
  publishable_key: string;
  secret_key: string;
  prod_base_url: string = 'https://payment.intasend.com';
  test_base_url: string = 'https://sandbox.intasend.com';
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
        host: base_url,
        port: 443,
        path: service_path,
        method: 'POST',
        headers: headers,
      };
      let op = JSON.stringify(options);
      console.log(`REQUEST OPTIONS: ${op}`);
      const req = https.request(options, (res) => {
        console.log(`statusCode: ${res.statusCode}`);
        if (res.statusCode !== 201 || res.statusCode !== 200) {
          console.log(`Server request failed: ${res.statusCode}`);
          res.resume();
          reject(res);
        }
        console.log(`Server request status code: ${res.statusCode}`);
        resolve(res);
      });
      let p = JSON.stringify(payload);
      console.log(`REQUEST PAYLOAD: ${p}`);
      req.on('error', (err) => {
        console.log(`totoal failuer: ${err.message}`);
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
  }
}
