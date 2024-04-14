const RequestClient = require('./requests');

class Payouts extends RequestClient {
  initiate(payload) {
    return this.send(payload, '/api/v1/send-money/initiate/', 'POST');
  }

  mpesa(payload) {
    payload['provider'] = 'MPESA-B2C';
    return this.initiate(payload);
  }

  mpesaB2B(payload) {
    payload['provider'] = 'MPESA-B2B';
    return this.initiate(payload);
  }

  bank(payload) {
    payload['provider'] = 'PESALINK';
    return this.initiate(payload);
  }

  intasend(payload) {
    payload['provider'] = 'INTASEND';
    return this.initiate(payload);
  }
  
  airtime(payload) {
    payload['provider'] = 'AIRTIME';
    return this.initiate(payload);
  }

  approve(payload) {
    return this.send(payload, '/api/v1/send-money/approve/', 'POST');
  }

  status(payload) {
    return this.send(payload, '/api/v1/send-money/status/', 'POST');
  }
}

module.exports = Payouts;
