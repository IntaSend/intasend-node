import RequestClient from './requests';
import Wallet from './wallets';
import Collection from './collection';

export default class IntaSend extends RequestClient {
  constructor(publishable_key: string, secret_key: string, test_mode: boolean) {
    super(publishable_key, secret_key, test_mode);
  }
  wallet() {
    return new Wallet(this.publishable_key, this.secret_key, this.test_mode);
  }
  collection() {
    return new Collection(
      this.publishable_key,
      this.secret_key,
      this.test_mode
    );
  }
}

let service = new IntaSend('', '', true);
// let collection = service.collection();
// collection
//   .charge()
//   .then((resp) => {
//     console.log(`statusCode: ${resp.status}`);
//     let resp_data = JSON.stringify(resp.data);
//     console.log(`Successful Charge: ${resp_data}`);
//   })
//   .catch((err) => {
//     console.error(`Charge error: ${JSON.stringify(err)}`);
//   });
let wallet = service.wallet();
wallet
  .fund()
  .then((resp) => {
    console.log(`statusCode: ${resp.status}`);
    let resp_data = JSON.stringify(resp.data);
    console.log(`Successful funding: ${resp_data}`);
  })
  .catch((err) => {
    console.error(`Funding error: ${JSON.stringify(err)}`);
  });
