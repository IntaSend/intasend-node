import IntaSend from '../src/intasend';
import Wallet from '../src/wallets';
import Collection from '../src/collection';
import Payouts from '../src/payouts';
import Refunds from '../src/refunds';

describe('IntaSend', () => {
  const pubKey = 'ISPubKey_test_abc123';
  const secretKey = 'ISSecretKey_test_secret';

  describe('constructor', () => {
    it('stores publishable_key', () => {
      const client = new IntaSend(pubKey, secretKey, true);
      expect(client.publishable_key).toBe(pubKey);
    });

    it('stores secret_key', () => {
      const client = new IntaSend(pubKey, secretKey, true);
      expect(client.secret_key).toBe(secretKey);
    });

    it('stores test_mode', () => {
      const client = new IntaSend(pubKey, secretKey, true);
      expect(client.test_mode).toBe(true);
    });
  });

  describe('test mode', () => {
    it('uses sandbox URL when test_mode is true', () => {
      const client = new IntaSend(pubKey, secretKey, true);
      expect(client.test_base_url).toBe('sandbox.intasend.com');
    });

    it('uses production URL when test_mode is false', () => {
      const client = new IntaSend(pubKey, secretKey, false);
      expect(client.prod_base_url).toBe('payment.intasend.com');
      expect(client.test_mode).toBe(false);
    });
  });

  describe('service factories', () => {
    it('wallets() returns a Wallet instance', () => {
      const client = new IntaSend(pubKey, secretKey, true);
      const wallets = client.wallets();
      expect(wallets).toBeInstanceOf(Wallet);
    });

    it('collection() returns a Collection instance', () => {
      const client = new IntaSend(pubKey, secretKey, true);
      const collection = client.collection();
      expect(collection).toBeInstanceOf(Collection);
    });

    it('payouts() returns a Payouts instance', () => {
      const client = new IntaSend(pubKey, secretKey, true);
      const payouts = client.payouts();
      expect(payouts).toBeInstanceOf(Payouts);
    });

    it('refunds() returns a Refunds instance', () => {
      const client = new IntaSend(pubKey, secretKey, true);
      const refunds = client.refunds();
      expect(refunds).toBeInstanceOf(Refunds);
    });
  });

  describe('service credential propagation', () => {
    it('wallets() receives correct credentials', () => {
      const client = new IntaSend(pubKey, secretKey, true);
      const wallets = client.wallets();
      expect(wallets.publishable_key).toBe(pubKey);
      expect(wallets.secret_key).toBe(secretKey);
      expect(wallets.test_mode).toBe(true);
    });

    it('collection() receives correct credentials', () => {
      const client = new IntaSend(pubKey, secretKey, false);
      const collection = client.collection();
      expect(collection.publishable_key).toBe(pubKey);
      expect(collection.secret_key).toBe(secretKey);
      expect(collection.test_mode).toBe(false);
    });

    it('payouts() receives correct credentials', () => {
      const client = new IntaSend(pubKey, secretKey, true);
      const payouts = client.payouts();
      expect(payouts.publishable_key).toBe(pubKey);
      expect(payouts.secret_key).toBe(secretKey);
      expect(payouts.test_mode).toBe(true);
    });

    it('refunds() receives correct credentials', () => {
      const client = new IntaSend(pubKey, secretKey, true);
      const refunds = client.refunds();
      expect(refunds.publishable_key).toBe(pubKey);
      expect(refunds.secret_key).toBe(secretKey);
      expect(refunds.test_mode).toBe(true);
    });
  });
});
