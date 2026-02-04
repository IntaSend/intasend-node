import { mockHttpsRequest, resetMocks } from './helpers';
import Wallet from '../src/wallets';

describe('Wallet', () => {
  const pubKey = 'ISPubKey_test_abc123';
  const secretKey = 'ISSecretKey_test_secret';

  afterEach(() => {
    resetMocks();
  });

  describe('list()', () => {
    it('GETs /api/v1/wallets/', async () => {
      const { captured } = mockHttpsRequest({
        statusCode: 200,
        body: [{ wallet_id: 'w1', label: 'Main' }],
      });
      const wallet = new Wallet(pubKey, secretKey, true);

      const result = await wallet.list();

      expect(captured.options.path).toBe('/api/v1/wallets/');
      expect(captured.options.method).toBe('GET');
      expect(result).toEqual([{ wallet_id: 'w1', label: 'Main' }]);
    });

    it('includes auth header', async () => {
      const { captured } = mockHttpsRequest({
        statusCode: 200,
        body: [],
      });
      const wallet = new Wallet(pubKey, secretKey, true);

      await wallet.list();

      expect(captured.options.headers).toHaveProperty(
        'Authorization',
        `Bearer ${secretKey}`
      );
    });
  });

  describe('create()', () => {
    it('POSTs to /api/v1/wallets/', async () => {
      const { captured } = mockHttpsRequest({
        statusCode: 201,
        body: { wallet_id: 'w_new', label: 'SDK-Test' },
      });
      const wallet = new Wallet(pubKey, secretKey, true);

      await wallet.create({
        label: 'SDK-Test',
        wallet_type: 'WORKING',
        currency: 'KES',
      });

      expect(captured.options.path).toBe('/api/v1/wallets/');
      expect(captured.options.method).toBe('POST');
    });

    it('sends correct payload', async () => {
      const { captured } = mockHttpsRequest({
        statusCode: 201,
        body: { wallet_id: 'w_new' },
      });
      const wallet = new Wallet(pubKey, secretKey, true);

      await wallet.create({
        label: 'My Wallet',
        wallet_type: 'WORKING',
        currency: 'KES',
      });

      const body = JSON.parse(captured.body);
      expect(body.label).toBe('My Wallet');
      expect(body.wallet_type).toBe('WORKING');
      expect(body.currency).toBe('KES');
    });
  });

  describe('get()', () => {
    it('GETs /api/v1/wallets/{id}/', async () => {
      const { captured } = mockHttpsRequest({
        statusCode: 200,
        body: { wallet_id: 'w_123', label: 'Main', available_balance: '1000.00' },
      });
      const wallet = new Wallet(pubKey, secretKey, true);

      const result = await wallet.get('w_123');

      expect(captured.options.path).toBe('/api/v1/wallets/w_123/');
      expect(captured.options.method).toBe('GET');
      expect(result.wallet_id).toBe('w_123');
    });
  });

  describe('transactions()', () => {
    it('GETs /api/v1/wallets/{id}/transactions/', async () => {
      const { captured } = mockHttpsRequest({
        statusCode: 200,
        body: [{ id: 'txn_1', amount: '500.00' }],
      });
      const wallet = new Wallet(pubKey, secretKey, true);

      const result = await wallet.transactions('w_123');

      expect(captured.options.path).toBe('/api/v1/wallets/w_123/transactions/');
      expect(captured.options.method).toBe('GET');
      expect(result).toEqual([{ id: 'txn_1', amount: '500.00' }]);
    });
  });

  describe('intraTransfer()', () => {
    it('POSTs to /api/v1/wallets/{sourceID}/intra_transfer/', async () => {
      const { captured } = mockHttpsRequest({
        statusCode: 200,
        body: { status: 'Complete' },
      });
      const wallet = new Wallet(pubKey, secretKey, true);

      await wallet.intraTransfer('w_source', 'w_dest', 500, 'Test transfer');

      expect(captured.options.path).toBe('/api/v1/wallets/w_source/intra_transfer/');
      expect(captured.options.method).toBe('POST');
    });

    it('sends wallet_id, amount, and narrative in payload', async () => {
      const { captured } = mockHttpsRequest({
        statusCode: 200,
        body: { status: 'Complete' },
      });
      const wallet = new Wallet(pubKey, secretKey, true);

      await wallet.intraTransfer('w_src', 'w_dst', 250, 'Payment for services');

      const body = JSON.parse(captured.body);
      expect(body.wallet_id).toBe('w_dst');
      expect(body.amount).toBe(250);
      expect(body.narrative).toBe('Payment for services');
    });
  });

  describe('fundMPesa()', () => {
    it('POSTs to /api/v1/payment/mpesa-stk-push/', async () => {
      const { captured } = mockHttpsRequest({
        statusCode: 200,
        body: { invoice: { invoice_id: 'inv_fund' } },
      });
      const wallet = new Wallet(pubKey, secretKey, true);

      await wallet.fundMPesa({
        phone_number: '254722000000',
        name: 'John',
        email: 'john@example.com',
        amount: 1000,
      });

      expect(captured.options.path).toBe('/api/v1/payment/mpesa-stk-push/');
      expect(captured.options.method).toBe('POST');
    });

    it('adds method M-PESA and currency KES', async () => {
      const { captured } = mockHttpsRequest({
        statusCode: 200,
        body: { invoice: { invoice_id: 'inv_fund' } },
      });
      const wallet = new Wallet(pubKey, secretKey, true);

      await wallet.fundMPesa({
        phone_number: '254722000000',
        name: 'John',
        email: 'john@example.com',
        amount: 1000,
      });

      const body = JSON.parse(captured.body);
      expect(body.method).toBe('M-PESA');
      expect(body.currency).toBe('KES');
      expect(body.phone_number).toBe('254722000000');
    });
  });

  describe('fundCheckout()', () => {
    it('POSTs to /api/v1/checkout/', async () => {
      const { captured } = mockHttpsRequest({
        statusCode: 200,
        body: { id: 'chk_fund', url: 'https://sandbox.intasend.com/checkout/fund/' },
      });
      const wallet = new Wallet(pubKey, secretKey, true);

      await wallet.fundCheckout({
        first_name: 'John',
        last_name: 'Doe',
        email: 'john@example.com',
        host: 'https://example.com',
        amount: 500,
        currency: 'KES',
      });

      expect(captured.options.path).toBe('/api/v1/checkout/');
      expect(captured.options.method).toBe('POST');
    });

    it('clears secret_key for public endpoint', async () => {
      const { captured } = mockHttpsRequest({
        statusCode: 200,
        body: { id: 'chk_fund' },
      });
      const wallet = new Wallet(pubKey, secretKey, true);

      await wallet.fundCheckout({
        first_name: 'John',
        last_name: 'Doe',
        email: 'john@example.com',
        host: 'https://example.com',
        amount: 500,
        currency: 'KES',
      });

      expect(captured.options.headers).not.toHaveProperty('Authorization');
    });
  });
});
