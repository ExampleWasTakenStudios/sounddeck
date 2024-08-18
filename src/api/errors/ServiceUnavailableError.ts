import { HttpError } from './HttpError';

export class ServiceUnavailableError extends HttpError {
  constructor(code: number, statusText: string, body: string) {
    super(code, statusText, body);

    this.name = 'ServiceUnavailableError';
    this.message =
      'The server is currently unable to handle the request due to a temporary condition which will be alleviated after some delay. You can choose to resend the request again.';
  }
}
