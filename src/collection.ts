import RequestClient from './requests';
import { ChargePayload, MpesaStkPushPayload } from './types';

class Collection extends RequestClient {
  charge(payload: ChargePayload): Promise<any> {
    this.secret_key = '';
    return this.send(payload, '/api/v1/checkout/', 'POST');
  }

  mpesaStkPush(payload: MpesaStkPushPayload): Promise<any> {
    payload['method'] = 'M-PESA';
    payload['currency'] = 'KES';
    return this.send(payload, '/api/v1/payment/mpesa-stk-push/', 'POST');
  }

  status(
    invoiceID: string,
    checkoutID: string = '',
    signature: string = ''
  ): Promise<any> {
    this.secret_key = '';
    const payload: Record<string, string> = {
      invoice_id: invoiceID,
    };
    if (checkoutID && signature) {
      payload['signature'] = signature;
      payload['checkout_id'] = checkoutID;
    }
    return this.send(payload, '/api/v1/payment/status/', 'POST');
  }
}

export default Collection;
