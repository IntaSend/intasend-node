import { mockHttpsRequest, resetMocks } from './helpers';
import Refunds from '../src/refunds';

describe('Refunds', () => {
  const pubKey = 'ISPubKey_test_abc123';
  const secretKey = 'ISSecretKey_test_secret';

  afterEach(() => {
    resetMocks();
  });

  describe('list()', () => {
    it('GETs /api/v1/chargebacks/', async () => {
      const { captured } = mockHttpsRequest({
        statusCode: 200,
        body: [{ id: 'cb_1', amount: '200.00', status: 'PENDING' }],
      });
      const refunds = new Refunds(pubKey, secretKey, true);

      const result = await refunds.list();

      expect(captured.options.path).toBe('/api/v1/chargebacks/');
      expect(captured.options.method).toBe('GET');
      expect(result).toEqual([{ id: 'cb_1', amount: '200.00', status: 'PENDING' }]);
    });

    it('includes auth header', async () => {
      const { captured } = mockHttpsRequest({
        statusCode: 200,
        body: [],
      });
      const refunds = new Refunds(pubKey, secretKey, true);

      await refunds.list();

      expect(captured.options.headers).toHaveProperty(
        'Authorization',
        `Bearer ${secretKey}`
      );
    });
  });

  describe('create()', () => {
    it('POSTs to /api/v1/chargebacks/', async () => {
      const { captured } = mockHttpsRequest({
        statusCode: 201,
        body: { id: 'cb_new', status: 'PENDING' },
      });
      const refunds = new Refunds(pubKey, secretKey, true);

      await refunds.create({
        invoice: 'INV-001',
        amount: 200,
        reason: 'UNAVAILABLE',
        reason_details: 'Service was not available',
      });

      expect(captured.options.path).toBe('/api/v1/chargebacks/');
      expect(captured.options.method).toBe('POST');
    });

    it('sends correct payload', async () => {
      const { captured } = mockHttpsRequest({
        statusCode: 201,
        body: { id: 'cb_new' },
      });
      const refunds = new Refunds(pubKey, secretKey, true);

      await refunds.create({
        invoice: 'INV-002',
        amount: 150,
        reason: 'DUPLICATE',
        reason_details: 'Duplicate charge',
      });

      const body = JSON.parse(captured.body);
      expect(body.invoice).toBe('INV-002');
      expect(body.amount).toBe(150);
      expect(body.reason).toBe('DUPLICATE');
      expect(body.reason_details).toBe('Duplicate charge');
    });

    it('returns created refund', async () => {
      mockHttpsRequest({
        statusCode: 201,
        body: { id: 'cb_333', status: 'PENDING', amount: '200.00' },
      });
      const refunds = new Refunds(pubKey, secretKey, true);

      const result = await refunds.create({
        invoice: 'INV-003',
        amount: 200,
        reason: 'OTHER',
      });

      expect(result.id).toBe('cb_333');
      expect(result.status).toBe('PENDING');
    });
  });

  describe('get()', () => {
    it('GETs /api/v1/chargebacks/{id}/', async () => {
      const { captured } = mockHttpsRequest({
        statusCode: 200,
        body: { id: 'cb_456', amount: '100.00', status: 'APPROVED' },
      });
      const refunds = new Refunds(pubKey, secretKey, true);

      const result = await refunds.get('cb_456');

      expect(captured.options.path).toBe('/api/v1/chargebacks/cb_456/');
      expect(captured.options.method).toBe('GET');
      expect(result.id).toBe('cb_456');
      expect(result.status).toBe('APPROVED');
    });
  });
});
