import RequestClient from './requests';
import Wallet from './wallets';
import Collection from './collection';
import Payouts from './payouts';
import Refunds from './refunds';

export {
  RequestClient,
  Wallet,
  Collection,
  Payouts,
  Refunds,
};

export * from './types';

class IntaSend extends RequestClient {
  constructor(publishable_key: string, secret_key: string, test_mode: boolean) {
    super(publishable_key, secret_key, test_mode);
  }

  wallets(): Wallet {
    return new Wallet(this.publishable_key, this.secret_key, this.test_mode);
  }

  collection(): Collection {
    return new Collection(
      this.publishable_key,
      this.secret_key,
      this.test_mode
    );
  }

  payouts(): Payouts {
    return new Payouts(this.publishable_key, this.secret_key, this.test_mode);
  }

  refunds(): Refunds {
    return new Refunds(this.publishable_key, this.secret_key, this.test_mode);
  }
}

export default IntaSend;
