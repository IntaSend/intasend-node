const RequestClient = require('./requests');
const Wallet = require('./wallets');
const Collection = require('./collection');
const Payouts = require('./payouts');
const Refunds = require('./refunds');

class IntaSend extends RequestClient {
  constructor(publishable_key, secret_key, test_mode, private_key) {
    super(publishable_key, secret_key, test_mode, private_key);
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
  payouts() {
    return new Payouts(
      this.publishable_key,
      this.secret_key,
      this.test_mode,
      this.private_key
    );
  }
  refunds() {
    return new Refunds(this.publishable_key, this.secret_key, this.test_mode);
  }
}

module.exports = IntaSend;
