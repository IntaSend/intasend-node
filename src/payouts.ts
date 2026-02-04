import RequestClient from './requests';
import { PayoutPayload } from './types';

class Payouts extends RequestClient {
  initiate(payload: PayoutPayload): Promise<any> {
    return this.send(payload, '/api/v1/send-money/initiate/', 'POST');
  }

  mpesa(payload: PayoutPayload): Promise<any> {
    payload.provider = 'MPESA-B2C';
    return this.initiate(payload);
  }

  mpesaB2B(payload: PayoutPayload): Promise<any> {
    payload.provider = 'MPESA-B2B';
    return this.initiate(payload);
  }

  bank(payload: PayoutPayload): Promise<any> {
    payload.provider = 'PESALINK';
    return this.initiate(payload);
  }

  intasend(payload: PayoutPayload): Promise<any> {
    payload.provider = 'INTASEND';
    return this.initiate(payload);
  }

  airtime(payload: PayoutPayload): Promise<any> {
    payload.provider = 'AIRTIME';
    return this.initiate(payload);
  }

  approve(payload: Record<string, any>): Promise<any> {
    return this.send(payload, '/api/v1/send-money/approve/', 'POST');
  }

  status(payload: Record<string, any>): Promise<any> {
    return this.send(payload, '/api/v1/send-money/status/', 'POST');
  }
}

export default Payouts;
