import { HttpError } from './HttpError';

export class BadGatewayError extends HttpError {
  constructor(code: number, statusText: string, body: string) {
    super(code, statusText, body);

    this.name = 'BadGatewayError';
    this.message =
      'The server was acting as a gateway or proxy and received an invalid response from the upstream server.';
  }
}
