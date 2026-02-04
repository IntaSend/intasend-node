import { mockHttpsRequest, mockHttpsError, mockHttpsNetworkError, resetMocks } from './helpers';
import RequestClient from '../src/requests';

describe('RequestClient', () => {
  const pubKey = 'ISPubKey_test_abc123';
  const secretKey = 'ISSecretKey_test_secret';

  afterEach(() => {
    resetMocks();
  });

  describe('authenticated requests', () => {
    it('includes Authorization header with Bearer token', async () => {
      const { captured } = mockHttpsRequest({ statusCode: 200, body: { ok: true } });
      const client = new RequestClient(pubKey, secretKey, true);

      await client.send({ foo: 'bar' }, '/api/v1/test/', 'POST');

      expect(captured.options.headers).toHaveProperty('Authorization', `Bearer ${secretKey}`);
    });

    it('includes INTASEND_PUBLIC_API_KEY header', async () => {
      const { captured } = mockHttpsRequest({ statusCode: 200, body: { ok: true } });
      const client = new RequestClient(pubKey, secretKey, true);

      await client.send({ foo: 'bar' }, '/api/v1/test/', 'POST');

      expect(captured.options.headers).toHaveProperty('INTASEND_PUBLIC_API_KEY', pubKey);
    });

    it('includes Content-Type application/json header', async () => {
      const { captured } = mockHttpsRequest({ statusCode: 200, body: { ok: true } });
      const client = new RequestClient(pubKey, secretKey, true);

      await client.send({}, '/api/v1/test/', 'POST');

      expect(captured.options.headers).toHaveProperty('Content-Type', 'application/json');
    });

    it('adds public_key to payload', async () => {
      const { captured } = mockHttpsRequest({ statusCode: 200, body: {} });
      const client = new RequestClient(pubKey, secretKey, true);

      await client.send({ amount: 100 }, '/api/v1/test/', 'POST');

      const sentBody = JSON.parse(captured.body);
      expect(sentBody.public_key).toBe(pubKey);
    });
  });

  describe('public requests (no secret key)', () => {
    it('does not include Authorization header when secret_key is empty', async () => {
      const { captured } = mockHttpsRequest({ statusCode: 200, body: { ok: true } });
      const client = new RequestClient(pubKey, '', true);

      await client.send({}, '/api/v1/checkout/', 'POST');

      expect(captured.options.headers).not.toHaveProperty('Authorization');
    });

    it('still includes INTASEND_PUBLIC_API_KEY header', async () => {
      const { captured } = mockHttpsRequest({ statusCode: 200, body: { ok: true } });
      const client = new RequestClient(pubKey, '', true);

      await client.send({}, '/api/v1/checkout/', 'POST');

      expect(captured.options.headers).toHaveProperty('INTASEND_PUBLIC_API_KEY', pubKey);
    });
  });

  describe('request routing', () => {
    it('uses sandbox hostname when test_mode is true', async () => {
      const { captured } = mockHttpsRequest({ statusCode: 200, body: {} });
      const client = new RequestClient(pubKey, secretKey, true);

      await client.send({}, '/api/v1/test/', 'GET');

      expect(captured.options.hostname).toBe('sandbox.intasend.com');
    });

    it('uses production hostname when test_mode is false', async () => {
      const { captured } = mockHttpsRequest({ statusCode: 200, body: {} });
      const client = new RequestClient(pubKey, secretKey, false);

      await client.send({}, '/api/v1/test/', 'GET');

      expect(captured.options.hostname).toBe('payment.intasend.com');
    });

    it('uses port 443', async () => {
      const { captured } = mockHttpsRequest({ statusCode: 200, body: {} });
      const client = new RequestClient(pubKey, secretKey, true);

      await client.send({}, '/api/v1/test/', 'GET');

      expect(captured.options.port).toBe(443);
    });

    it('sends to the correct path', async () => {
      const { captured } = mockHttpsRequest({ statusCode: 200, body: {} });
      const client = new RequestClient(pubKey, secretKey, true);

      await client.send({}, '/api/v1/wallets/', 'GET');

      expect(captured.options.path).toBe('/api/v1/wallets/');
    });

    it('uses the specified HTTP method', async () => {
      const { captured } = mockHttpsRequest({ statusCode: 200, body: {} });
      const client = new RequestClient(pubKey, secretKey, true);

      await client.send({}, '/api/v1/wallets/', 'GET');

      expect(captured.options.method).toBe('GET');
    });

    it('defaults to POST method', async () => {
      const { captured } = mockHttpsRequest({ statusCode: 200, body: {} });
      const client = new RequestClient(pubKey, secretKey, true);

      await client.send({}, '/api/v1/test/');

      expect(captured.options.method).toBe('POST');
    });
  });

  describe('request body', () => {
    it('serializes payload as JSON', async () => {
      const { captured } = mockHttpsRequest({ statusCode: 200, body: {} });
      const client = new RequestClient(pubKey, secretKey, true);
      const payload = { amount: 100, currency: 'KES' };

      await client.send(payload, '/api/v1/test/', 'POST');

      const sentBody = JSON.parse(captured.body);
      expect(sentBody.amount).toBe(100);
      expect(sentBody.currency).toBe('KES');
    });
  });

  describe('response handling', () => {
    let consoleErrorSpy: jest.SpyInstance;

    beforeEach(() => {
      consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
    });

    afterEach(() => {
      consoleErrorSpy.mockRestore();
    });

    it('resolves with parsed JSON on 200', async () => {
      mockHttpsRequest({ statusCode: 200, body: { id: '123', status: 'COMPLETE' } });
      const client = new RequestClient(pubKey, secretKey, true);

      const result = await client.send({}, '/api/v1/test/', 'GET');

      expect(result).toEqual({ id: '123', status: 'COMPLETE' });
    });

    it('resolves with parsed JSON on 201', async () => {
      mockHttpsRequest({ statusCode: 201, body: { id: 'new-456' } });
      const client = new RequestClient(pubKey, secretKey, true);

      const result = await client.send({}, '/api/v1/test/', 'POST');

      expect(result).toEqual({ id: 'new-456' });
    });

    it('rejects on 400 error', async () => {
      mockHttpsError(400, { detail: 'Bad request' });
      const client = new RequestClient(pubKey, secretKey, true);

      await expect(client.send({}, '/api/v1/test/', 'POST')).rejects.toBeDefined();
    });

    it('rejects on 401 error', async () => {
      mockHttpsError(401, { detail: 'Unauthorized' });
      const client = new RequestClient(pubKey, secretKey, true);

      await expect(client.send({}, '/api/v1/test/', 'POST')).rejects.toBeDefined();
    });

    it('rejects on 404 error', async () => {
      mockHttpsError(404, { detail: 'Not found' });
      const client = new RequestClient(pubKey, secretKey, true);

      await expect(client.send({}, '/api/v1/test/', 'GET')).rejects.toBeDefined();
    });

    it('rejects on 500 error', async () => {
      mockHttpsError(500, { detail: 'Server error' });
      const client = new RequestClient(pubKey, secretKey, true);

      await expect(client.send({}, '/api/v1/test/', 'POST')).rejects.toBeDefined();
    });

    it('rejects on network error', async () => {
      mockHttpsNetworkError('ECONNREFUSED');
      const client = new RequestClient(pubKey, secretKey, true);

      await expect(client.send({}, '/api/v1/test/', 'POST')).rejects.toBe('ECONNREFUSED');
    });
  });
});
