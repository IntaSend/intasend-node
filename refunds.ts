import RequestClient from './requests';

class Refunds extends RequestClient {
  list() {
    return this.send(null, '/api/v1/chargebacks/', 'GET');
  }

  create(payload: object) {
    return this.send(payload, '/api/v1/chargebacks/', 'POST');
  }

  get(chargebackID: string) {
    return this.send(null, `/api/v1/chargebacks/${chargebackID}/`, 'GET');
  }
}

export default Refunds;
