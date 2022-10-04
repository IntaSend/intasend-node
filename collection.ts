import RequestClient from './requests';

class Collection extends RequestClient {
  charge(payload: Object) {
    this.secret_key = '';
    return this.send(payload, '/api/v1/checkout/', 'POST');
  }

  mpesaStkPush(payload: Object) {
    this.secret_key = '';
    payload['method'] = 'M-PESA';
    payload['currency'] = 'KES';
    return this.send(payload, '/api/v1/payment/collection/', 'POST');
  }
  
  status(invoiceID: String, checkoutID: String = None, signature:String = None) {
    payload = {
      "invoice_id": invoiceID,
    }
    if (checkout_id and signature) {
      payload = {
        "invoice_id": invoiceID,
        "signature": signature,
        "checkout_id": checkoutID
      }
    }
    return this.send(payload, '/api/v1/payment/status/', 'POST');
  }
}

export default Collection;
