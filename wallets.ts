import RequestClient from './requests';

class Wallet extends RequestClient {
  list() {
    return this.send(null, '/api/v1/wallets/', 'GET');
  }
  create(payload: object) {
    return this.send(payload, '/api/v1/wallets/', 'POST');
  }

  intraTransfer(payload: Object) {
    return this.send(payload, '/api/v1/wallets/', 'POST');
  }

  get(payload: Object) {
    return this.send(payload, `/api/v1/wallets/`, 'POST');
  }

  transactions(walletID: string) {
    return this.send(null, `/api/v1/wallets/${walletID}/transactions/`, 'GET');
  }

  fundMPesa(payload: object, walletID: string) {
    return this.send(payload, `/api/v1/wallets/${walletID}/`, 'POST');
  }
}

export default Wallet;
