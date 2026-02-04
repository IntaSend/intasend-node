import { mockHttpsRequest, resetMocks } from './helpers';
import Payouts from '../src/payouts';

describe('Payouts', () => {
  const pubKey = 'ISPubKey_test_abc123';
  const secretKey = 'ISSecretKey_test_secret';

  afterEach(() => {
    resetMocks();
  });

  const sampleTransactions = [
    {
      name: 'John Doe',
      account: '254722000000',
      amount: '100',
    },
  ];

  describe('initiate()', () => {
    it('POSTs to /api/v1/send-money/initiate/', async () => {
      const { captured } = mockHttpsRequest({
        statusCode: 200,
        body: { tracking_id: 'trk_123', status: 'Preview and approve' },
      });
      const payouts = new Payouts(pubKey, secretKey, true);

      await payouts.initiate({
        currency: 'KES',
        transactions: sampleTransactions,
      });

      expect(captured.options.path).toBe('/api/v1/send-money/initiate/');
      expect(captured.options.method).toBe('POST');
    });

    it('sends correct payload', async () => {
      const { captured } = mockHttpsRequest({
        statusCode: 200,
        body: { tracking_id: 'trk_123' },
      });
      const payouts = new Payouts(pubKey, secretKey, true);

      await payouts.initiate({
        currency: 'KES',
        transactions: sampleTransactions,
      });

      const body = JSON.parse(captured.body);
      expect(body.currency).toBe('KES');
      expect(body.transactions).toEqual(sampleTransactions);
    });

    it('includes auth header', async () => {
      const { captured } = mockHttpsRequest({
        statusCode: 200,
        body: { tracking_id: 'trk_123' },
      });
      const payouts = new Payouts(pubKey, secretKey, true);

      await payouts.initiate({
        currency: 'KES',
        transactions: sampleTransactions,
      });

      expect(captured.options.headers).toHaveProperty(
        'Authorization',
        `Bearer ${secretKey}`
      );
    });
  });

  describe('mpesa()', () => {
    it('sets provider to MPESA-B2C', async () => {
      const { captured } = mockHttpsRequest({
        statusCode: 200,
        body: { tracking_id: 'trk_mpesa' },
      });
      const payouts = new Payouts(pubKey, secretKey, true);

      await payouts.mpesa({
        currency: 'KES',
        transactions: sampleTransactions,
      });

      const body = JSON.parse(captured.body);
      expect(body.provider).toBe('MPESA-B2C');
      expect(captured.options.path).toBe('/api/v1/send-money/initiate/');
    });
  });

  describe('mpesaB2B()', () => {
    it('sets provider to MPESA-B2B', async () => {
      const { captured } = mockHttpsRequest({
        statusCode: 200,
        body: { tracking_id: 'trk_b2b' },
      });
      const payouts = new Payouts(pubKey, secretKey, true);

      await payouts.mpesaB2B({
        currency: 'KES',
        transactions: [
          {
            name: 'ABC Corp',
            account: 247247,
            amount: '500',
            account_type: 'PayBill',
            account_reference: '11111111',
          },
        ],
      });

      const body = JSON.parse(captured.body);
      expect(body.provider).toBe('MPESA-B2B');
      expect(body.transactions[0].account_type).toBe('PayBill');
    });
  });

  describe('bank()', () => {
    it('sets provider to PESALINK', async () => {
      const { captured } = mockHttpsRequest({
        statusCode: 200,
        body: { tracking_id: 'trk_bank' },
      });
      const payouts = new Payouts(pubKey, secretKey, true);

      await payouts.bank({
        currency: 'KES',
        transactions: sampleTransactions,
      });

      const body = JSON.parse(captured.body);
      expect(body.provider).toBe('PESALINK');
    });
  });

  describe('intasend()', () => {
    it('sets provider to INTASEND', async () => {
      const { captured } = mockHttpsRequest({
        statusCode: 200,
        body: { tracking_id: 'trk_p2p' },
      });
      const payouts = new Payouts(pubKey, secretKey, true);

      await payouts.intasend({
        currency: 'KES',
        transactions: sampleTransactions,
      });

      const body = JSON.parse(captured.body);
      expect(body.provider).toBe('INTASEND');
    });
  });

  describe('airtime()', () => {
    it('sets provider to AIRTIME', async () => {
      const { captured } = mockHttpsRequest({
        statusCode: 200,
        body: { tracking_id: 'trk_air' },
      });
      const payouts = new Payouts(pubKey, secretKey, true);

      await payouts.airtime({
        currency: 'KES',
        transactions: sampleTransactions,
      });

      const body = JSON.parse(captured.body);
      expect(body.provider).toBe('AIRTIME');
    });
  });

  describe('approve()', () => {
    it('POSTs to /api/v1/send-money/approve/', async () => {
      const { captured } = mockHttpsRequest({
        statusCode: 200,
        body: { status: 'Approved' },
      });
      const payouts = new Payouts(pubKey, secretKey, true);

      await payouts.approve({ tracking_id: 'trk_123', nonce: 'abc' });

      expect(captured.options.path).toBe('/api/v1/send-money/approve/');
      expect(captured.options.method).toBe('POST');
    });

    it('sends the approval payload', async () => {
      const { captured } = mockHttpsRequest({
        statusCode: 200,
        body: { status: 'Approved' },
      });
      const payouts = new Payouts(pubKey, secretKey, true);
      const approvalPayload = { tracking_id: 'trk_123', nonce: 'nonce_456' };

      await payouts.approve(approvalPayload);

      const body = JSON.parse(captured.body);
      expect(body.tracking_id).toBe('trk_123');
      expect(body.nonce).toBe('nonce_456');
    });
  });

  describe('status()', () => {
    it('POSTs to /api/v1/send-money/status/', async () => {
      const { captured } = mockHttpsRequest({
        statusCode: 200,
        body: { status: 'Complete', transactions: [] },
      });
      const payouts = new Payouts(pubKey, secretKey, true);

      await payouts.status({ tracking_id: 'trk_123' });

      expect(captured.options.path).toBe('/api/v1/send-money/status/');
      expect(captured.options.method).toBe('POST');
    });
  });
});
