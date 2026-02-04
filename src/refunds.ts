import RequestClient from './requests';
import { CreateRefundPayload } from './types';

class Refunds extends RequestClient {
  list(): Promise<any> {
    return this.send({}, '/api/v1/chargebacks/', 'GET');
  }

  create(payload: CreateRefundPayload): Promise<any> {
    return this.send(payload, '/api/v1/chargebacks/', 'POST');
  }

  get(chargebackID: string): Promise<any> {
    return this.send({}, `/api/v1/chargebacks/${chargebackID}/`, 'GET');
  }
}

export default Refunds;
