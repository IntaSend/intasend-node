import RequestClient from './requests';

class Wallet extends RequestClient {
  fund() {
    return this.send(
      {
        name: 'ABC',
        wallet_type: 'WORKING',
        currency: 'KES',
      },
      '/api/v1/wallets/'
    );
  }

  intraTransfer() {
    console.log('Fake transfer wallet');
  }
}

export default Wallet;
