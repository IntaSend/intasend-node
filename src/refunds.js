const RequestClient = require('./requests');

class Refunds extends RequestClient {
  list() {
    return this.send({}, '/api/v1/chargebacks/', 'GET');
  }

  create(payload) {
    return this.send(payload, '/api/v1/chargebacks/', 'POST');
  }

  get(chargebackID) {
    return this.send({}, `/api/v1/chargebacks/${chargebackID}/`, 'GET');
  }
}

module.exports = Refunds;
