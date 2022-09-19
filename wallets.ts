import RequestClient from './requests';

class Wallet extends RequestClient {
  create(payload: object) {
    return this.send(payload, '/api/v1/wallets/');
  }

  intraTransfer() {
    console.log('Fake transfer wallet');
  }
}

export default Wallet;
