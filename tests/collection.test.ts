import { mockHttpsRequest, resetMocks } from './helpers';
import Collection from '../src/collection';

describe('Collection', () => {
  const pubKey = 'ISPubKey_test_abc123';
  const secretKey = 'ISSecretKey_test_secret';

  afterEach(() => {
    resetMocks();
  });

  describe('charge()', () => {
    it('POSTs to /api/v1/checkout/', async () => {
      const { captured } = mockHttpsRequest({
        statusCode: 200,
        body: { id: 'chk_123', url: 'https://sandbox.intasend.com/checkout/123/' },
      });
      const collection = new Collection(pubKey, secretKey, true);

      await collection.charge({
        first_name: 'John',
        last_name: 'Doe',
        email: 'john@example.com',
        host: 'https://example.com',
        amount: 100,
        currency: 'KES',
        api_ref: 'test-ref',
      });

      expect(captured.options.path).toBe('/api/v1/checkout/');
      expect(captured.options.method).toBe('POST');
    });

    it('clears secret_key for public endpoint', async () => {
      const { captured } = mockHttpsRequest({
        statusCode: 200,
        body: { id: 'chk_123' },
      });
      const collection = new Collection(pubKey, secretKey, true);

      await collection.charge({
        first_name: 'John',
        last_name: 'Doe',
        email: 'john@example.com',
        host: 'https://example.com',
        amount: 100,
        currency: 'KES',
      });

      expect(captured.options.headers).not.toHaveProperty('Authorization');
    });

    it('sends correct payload fields', async () => {
      const { captured } = mockHttpsRequest({
        statusCode: 200,
        body: { id: 'chk_123' },
      });
      const collection = new Collection(pubKey, secretKey, true);

      await collection.charge({
        first_name: 'John',
        last_name: 'Doe',
        email: 'john@example.com',
        host: 'https://example.com',
        amount: 500,
        currency: 'KES',
        api_ref: 'order-001',
      });

      const body = JSON.parse(captured.body);
      expect(body.first_name).toBe('John');
      expect(body.last_name).toBe('Doe');
      expect(body.email).toBe('john@example.com');
      expect(body.host).toBe('https://example.com');
      expect(body.amount).toBe(500);
      expect(body.currency).toBe('KES');
      expect(body.api_ref).toBe('order-001');
    });

    it('returns parsed response', async () => {
      mockHttpsRequest({
        statusCode: 200,
        body: { id: 'chk_789', url: 'https://sandbox.intasend.com/checkout/789/' },
      });
      const collection = new Collection(pubKey, secretKey, true);

      const result = await collection.charge({
        first_name: 'John',
        last_name: 'Doe',
        email: 'john@example.com',
        host: 'https://example.com',
        amount: 100,
        currency: 'KES',
      });

      expect(result.id).toBe('chk_789');
      expect(result.url).toBe('https://sandbox.intasend.com/checkout/789/');
    });
  });

  describe('mpesaStkPush()', () => {
    it('POSTs to /api/v1/payment/mpesa-stk-push/', async () => {
      const { captured } = mockHttpsRequest({
        statusCode: 200,
        body: { invoice: { invoice_id: 'inv_123' } },
      });
      const collection = new Collection(pubKey, secretKey, true);

      await collection.mpesaStkPush({
        phone_number: '254722000000',
        name: 'John Doe',
        email: 'john@example.com',
        amount: 10,
        api_ref: 'test',
      });

      expect(captured.options.path).toBe('/api/v1/payment/mpesa-stk-push/');
      expect(captured.options.method).toBe('POST');
    });

    it('adds method M-PESA and currency KES to payload', async () => {
      const { captured } = mockHttpsRequest({
        statusCode: 200,
        body: { invoice: { invoice_id: 'inv_123' } },
      });
      const collection = new Collection(pubKey, secretKey, true);

      await collection.mpesaStkPush({
        phone_number: '254722000000',
        name: 'John Doe',
        email: 'john@example.com',
        amount: 10,
      });

      const body = JSON.parse(captured.body);
      expect(body.method).toBe('M-PESA');
      expect(body.currency).toBe('KES');
      expect(body.phone_number).toBe('254722000000');
    });

    it('preserves auth header (authenticated endpoint)', async () => {
      const { captured } = mockHttpsRequest({
        statusCode: 200,
        body: { invoice: { invoice_id: 'inv_123' } },
      });
      const collection = new Collection(pubKey, secretKey, true);

      await collection.mpesaStkPush({
        phone_number: '254722000000',
        name: 'John Doe',
        email: 'john@example.com',
        amount: 10,
      });

      expect(captured.options.headers).toHaveProperty(
        'Authorization',
        `Bearer ${secretKey}`
      );
    });
  });

  describe('status()', () => {
    it('POSTs to /api/v1/payment/status/', async () => {
      const { captured } = mockHttpsRequest({
        statusCode: 200,
        body: { invoice: { state: 'COMPLETE' } },
      });
      const collection = new Collection(pubKey, secretKey, true);

      await collection.status('inv_123');

      expect(captured.options.path).toBe('/api/v1/payment/status/');
      expect(captured.options.method).toBe('POST');
    });

    it('sends invoice_id in payload', async () => {
      const { captured } = mockHttpsRequest({
        statusCode: 200,
        body: { invoice: { state: 'COMPLETE' } },
      });
      const collection = new Collection(pubKey, secretKey, true);

      await collection.status('inv_456');

      const body = JSON.parse(captured.body);
      expect(body.invoice_id).toBe('inv_456');
    });

    it('clears secret_key for public endpoint', async () => {
      const { captured } = mockHttpsRequest({
        statusCode: 200,
        body: { invoice: { state: 'PENDING' } },
      });
      const collection = new Collection(pubKey, secretKey, true);

      await collection.status('inv_123');

      expect(captured.options.headers).not.toHaveProperty('Authorization');
    });

    it('includes checkout_id and signature when provided', async () => {
      const { captured } = mockHttpsRequest({
        statusCode: 200,
        body: { invoice: { state: 'COMPLETE' } },
      });
      const collection = new Collection(pubKey, secretKey, true);

      await collection.status('inv_123', 'chk_456', 'sig_789');

      const body = JSON.parse(captured.body);
      expect(body.invoice_id).toBe('inv_123');
      expect(body.checkout_id).toBe('chk_456');
      expect(body.signature).toBe('sig_789');
    });

    it('omits checkout_id and signature when not provided', async () => {
      const { captured } = mockHttpsRequest({
        statusCode: 200,
        body: { invoice: { state: 'COMPLETE' } },
      });
      const collection = new Collection(pubKey, secretKey, true);

      await collection.status('inv_123');

      const body = JSON.parse(captured.body);
      expect(body.invoice_id).toBe('inv_123');
      expect(body).not.toHaveProperty('checkout_id');
      expect(body).not.toHaveProperty('signature');
    });
  });
});
