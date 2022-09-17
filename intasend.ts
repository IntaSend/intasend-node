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

let service = new IntaSend(
  'ISPubKey_test_91ffc81a-8ac4-419e-8008-7091caa8d73f',
  'ISSecretKey_test_82ab1e88-d97f-45b0-bec1-c59f6f4cbd2e',
  true
);
let collection = service.collection();
collection
  .charge()
  .then((resp) => {
    console.log(`Charge Resp: ${resp}`);
  })
  .catch((err) => {
    console.error(`Charge error: ${err}`);
  });

let wallet = service.wallet();
wallet
  .fund()
  .then((resp) => {
    console.log(`Funding response: ${resp}`);
  })
  .catch((err) => {
    console.error(`Funding error: ${err}`);
  });
