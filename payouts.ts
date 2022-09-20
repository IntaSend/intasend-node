const crypto = require('crypto');
const buffer = require('buffer');
import RequestClient from './requests';

class Payouts extends RequestClient {
  initiate(payload: Object) {
    return this.send(payload, '/api/v1/send-money/initiate');
  }

  sign(nonce) {
    const data = Buffer.from(nonce);
    const sign = crypto.sign('SHA256', data, this.private_key);
    return sign.toString('hex');
  }

  approve(payload: Object, sign_nonce: boolean) {
    payload['sign_nonce'] = sign_nonce;
    if (sign_nonce) {
      if (!this.private_key) {
        throw Error('Private key is required');
      }
      payload['nonce'] = this.sign(payload['nonce']);
    }
    return this.send(payload, '/api/v1/send-money/approve/');
  }

  status(payload: Object) {
    return this.send(payload, '/api/v1/send-money/status/');
  }
}

export default Payouts;
