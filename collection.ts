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
}

export default Collection;
