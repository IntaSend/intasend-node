const crypto = require('crypto');
const Buffer = require('buffer');
const RequestClient = require('./requests');

class Payouts extends RequestClient {
  initiate(payload) {
    return this.send(payload, '/api/v1/send-money/initiate/', 'POST');
  }

  sign(nonce) {
    const data = Buffer.from(nonce);
    const sign = crypto.sign('SHA256', data, this.private_key);
    return sign.toString('hex');
  }

  approve(payload, sign_nonce) {
    payload['sign_nonce'] = sign_nonce;
    if (sign_nonce) {
      if (!this.private_key) {
        throw Error('Private key is required');
      }
      payload['nonce'] = this.sign(payload['nonce']);
    }
    return this.send(payload, '/api/v1/send-money/approve/', 'POST');
  }

  status(payload) {
    return this.send(payload, '/api/v1/send-money/status/', 'POST');
  }
}

module.exports = Payouts;
