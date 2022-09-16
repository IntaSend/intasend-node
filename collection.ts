import RequestClient from './requests';

class Collection extends RequestClient {
  charge() {
    this.secret_key = '';
    return this.send(
      {
        first_name: 'FELIX',
        last_name: 'Cheruiyot',
        email: 'felix@intasend.com',
        host: 'https://stackblitz.com',
        amount: 10,
        currency: 'KES',
        api_ref: 'test',
      },
      '/api/v1/checkout/'
    );
  }
}

export default Collection;
