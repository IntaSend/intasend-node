const RequestClient = require('./requests');

class Collection extends RequestClient {
  charge(payload) {
    this.secret_key = '';
    return this.send(payload, '/api/v1/checkout/', 'POST');
  }

  mpesaStkPush(payload) {
    payload['method'] = 'M-PESA';
    payload['currency'] = 'KES';
    return this.send(payload, '/api/v1/payment/mpesa-stk-push/', 'POST');
  }

  status(invoiceID, checkoutID = '', signature = '') {
    this.secret_key = '';
    let payload = {
      invoice_id: invoiceID
    };
    if (checkoutID && signature) {
      payload['signature'] = signature;
      payload['checkout_id'] = checkoutID;
    }
    return this.send(payload, '/api/v1/payment/status/', 'POST');
  }
}

module.exports = Collection;
