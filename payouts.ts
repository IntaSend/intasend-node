import RequestClient from './requests';

class Payouts extends RequestClient {
  initiate(payload: Object) {
    return this.send(payload, '/api/v1/send-money/initiate');
  }

  approve(payload: Object) {
    return this.send(payload, '/api/v1/send-money/approve/');
  }
}

export default Payouts;
