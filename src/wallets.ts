import RequestClient from './requests';
import {
  CreateWalletPayload,
  FundMpesaPayload,
  FundCheckoutPayload,
} from './types';

class Wallet extends RequestClient {
  list(): Promise<any> {
    return this.send({}, '/api/v1/wallets/', 'GET');
  }

  create(payload: CreateWalletPayload): Promise<any> {
    return this.send(payload, '/api/v1/wallets/', 'POST');
  }

  intraTransfer(
    sourceID: string,
    destinationID: string,
    amount: number,
    narrative: string
  ): Promise<any> {
    const payload = {
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

  get(walletID: string): Promise<any> {
    return this.send({}, `/api/v1/wallets/${walletID}/`, 'GET');
  }

  transactions(walletID: string): Promise<any> {
    return this.send({}, `/api/v1/wallets/${walletID}/transactions/`, 'GET');
  }

  fundMPesa(payload: FundMpesaPayload): Promise<any> {
    payload['method'] = 'M-PESA';
    payload['currency'] = 'KES';
    return this.send(payload, '/api/v1/payment/mpesa-stk-push/', 'POST');
  }

  fundCheckout(payload: FundCheckoutPayload): Promise<any> {
    this.secret_key = '';
    return this.send(payload, '/api/v1/checkout/', 'POST');
  }
}

export default Wallet;
