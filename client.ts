import axios from 'axios';

class RequestClient {
  publishable_key: string;
  secret_key: string;
  prod_base_url: string = 'https://payment.intasend.com';
  test_base_url: string = 'https://sandbox.intasend.com';
  test_mode: boolean;
  service_path: string;
  constructor(publishable_key: string, secret_key: string, test_mode: boolean) {
    this.publishable_key = publishable_key;
    this.secret_key = secret_key;
    this.test_mode = test_mode;
  }
  send(payload: object) {
    let base_url = this.prod_base_url;
    if (this.test_mode) {
      base_url = this.test_base_url;
    }
    let headers = { 'Content-Type': 'application/json' };
    if (this.secret_key) {
      headers['Authorization'] = 'Bearer ${this.secret_key}';
    }
    return axios.post(`${base_url}${this.service_path}`, payload, {
      headers: headers,
    });
  }
}
