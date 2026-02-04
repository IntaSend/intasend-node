import https from 'https';
import { EventEmitter } from 'events';

jest.mock('https');

const mockedHttps = https as jest.Mocked<typeof https>;

export interface MockResponseOptions {
  statusCode: number;
  body: any;
}

export interface CapturedRequest {
  options: https.RequestOptions;
  body: string;
}

/**
 * Sets up https.request mock to return a controlled response.
 * Returns a reference to the captured request for assertions.
 */
export function mockHttpsRequest(
  responseOpts: MockResponseOptions
): { captured: CapturedRequest } {
  const captured: CapturedRequest = {
    options: {},
    body: '',
  };

  mockedHttps.request.mockImplementation((options: any, callback: any) => {
    captured.options = options;

    const response = new EventEmitter() as any;
    response.statusCode = responseOpts.statusCode;
    response.resume = jest.fn();

    // Simulate async response
    process.nextTick(() => {
      callback(response);
      const data = JSON.stringify(responseOpts.body);
      response.emit('data', Buffer.from(data));
      response.emit('end');
    });

    const req = new EventEmitter() as any;
    req.write = jest.fn((data: string) => {
      captured.body += data;
    });
    req.end = jest.fn();

    return req;
  });

  return { captured };
}

/**
 * Sets up https.request mock to simulate an error response (non-200/201).
 */
export function mockHttpsError(
  statusCode: number,
  errorBody: any
): { captured: CapturedRequest } {
  const captured: CapturedRequest = {
    options: {},
    body: '',
  };

  mockedHttps.request.mockImplementation((options: any, callback: any) => {
    captured.options = options;

    const response = new EventEmitter() as any;
    response.statusCode = statusCode;
    response.resume = jest.fn();

    process.nextTick(() => {
      callback(response);
      const data = JSON.stringify(errorBody);
      response.emit('data', Buffer.from(data));
    });

    const req = new EventEmitter() as any;
    req.write = jest.fn((data: string) => {
      captured.body += data;
    });
    req.end = jest.fn();

    return req;
  });

  return { captured };
}

/**
 * Sets up https.request mock to simulate a network error.
 */
export function mockHttpsNetworkError(
  errorMessage: string
): { captured: CapturedRequest } {
  const captured: CapturedRequest = {
    options: {},
    body: '',
  };

  mockedHttps.request.mockImplementation((options: any, _callback: any) => {
    captured.options = options;

    const req = new EventEmitter() as any;
    req.write = jest.fn((data: string) => {
      captured.body += data;
    });
    req.end = jest.fn(() => {
      process.nextTick(() => {
        req.emit('error', new Error(errorMessage));
      });
    });

    return req;
  });

  return { captured };
}

export function resetMocks(): void {
  mockedHttps.request.mockReset();
}
