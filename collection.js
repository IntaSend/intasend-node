const RequestClient = require('./requests');

class Collection extends RequestClient {
  charge(payload) {
    this.secret_key = '';
    return this.send(payload, '/api/v1/checkout/', 'POST');
  }

  mpesaStkPush(payload) {
    this.secret_key = '';
    payload['method'] = 'M-PESA';
    payload['currency'] = 'KES';
    return this.send(payload, '/api/v1/payment/collection/', 'POST');
  }

  status(invoiceID, checkoutID = '', signature = '') {
    let payload = {
      invoice_id: invoiceID,
    };
    if (checkoutID && signature) {
      payload['signature'] = signature;
      payload['checkout_id'] = checkoutID;
    }
    return this.send(payload, '/api/v1/payment/status/', 'POST');
  }
}

module.exports = Collection;
