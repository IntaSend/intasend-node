import https from 'https';

class RequestClient {
  publishable_key: string;
  secret_key: string;
  prod_base_url: string = 'payment.intasend.com';
  test_base_url: string = 'sandbox.intasend.com';
  test_mode: boolean = true;

  constructor(publishable_key: string, secret_key: string, test_mode: boolean) {
    this.publishable_key = publishable_key;
    this.secret_key = secret_key;
    this.test_mode = test_mode;
  }

  send<T = any>(
    payload: Record<string, any>,
    service_path: string,
    req_method: string = 'POST'
  ): Promise<T> {
    return new Promise((resolve, reject) => {
      let base_url = this.prod_base_url;
      if (this.test_mode) {
        base_url = this.test_base_url;
      }

      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
      };

      if (this.secret_key) {
        headers['Authorization'] = `Bearer ${this.secret_key}`;
      }
      if (this.publishable_key) {
        headers['INTASEND_PUBLIC_API_KEY'] = this.publishable_key;
        payload['public_key'] = this.publishable_key;
      }

      const options: https.RequestOptions = {
        hostname: base_url,
        port: 443,
        path: service_path,
        method: req_method,
        headers: headers,
      };

      const req = https.request(options, (res) => {
        if (res.statusCode !== 201 && res.statusCode !== 200) {
          console.error(`IntaSend Request HTTP Error Code: ${res.statusCode}`);
          res.resume();
          res.on('data', (data: Buffer) => {
            reject(data);
          });
          return;
        }

        let results = '';
        res.on('data', (data: Buffer) => {
          results += data;
        });
        res.on('end', () => {
          if (results) {
            resolve(JSON.parse(results));
            return;
          }
          resolve({} as T);
        });
      });

      req.on('error', (err) => {
        reject(err.message);
      });

      if (payload) {
        req.write(JSON.stringify(payload));
      }
      req.end();
    });
  }
}

export default RequestClient;
