const RequestClient = require('./requests');

class Wallet extends RequestClient {
  list() {
    return this.send({}, '/api/v1/wallets/', 'GET');
  }
  create(payload) {
    return this.send(payload, '/api/v1/wallets/', 'POST');
  }

  intraTransfer(sourceID, destinationID, amount, narrative) {
    let payload = {
      wallet_id: destinationID,
      amount: amount,
      narrative: narrative,
    };
    return this.send(
      payload,
      `/api/v1/wallets/${sourceID}/intra_transfer/`,
      'POST'
    );
  }

  get(walletID) {
    return this.send({}, `/api/v1/wallets/${walletID}/`, 'GET');
  }

  transactions(walletID) {
    return this.send({}, `/api/v1/wallets/${walletID}/transactions/`, 'GET');
  }

  fundMPesa(payload, walletID) {
    return this.send(payload, `/api/v1/wallets/${walletID}/`, 'POST');
  }
}

module.exports = Wallet;
