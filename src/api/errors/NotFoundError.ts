import { HttpError } from './HttpError';

export class NotFoundError extends HttpError {
  constructor(code: number, statusText: string, body: string) {
    super(code, statusText, body);

    this.name = 'NotFoundError';
    this.message =
      'The requested resource could not be found. This error can be due to a temporary or permanent condition.';
  }
}
