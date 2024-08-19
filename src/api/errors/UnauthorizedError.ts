import { HttpError } from './HttpError';

export class UnauthorizedError extends HttpError {
  constructor(code: number, statusText: string, body: string) {
    super(code, statusText, body);

    this.name = 'UnauthorizedError';
    this.message =
      'The request requires user authentication or, if the request included authorization credentials, authorization has been refused for those credentials.';
  }
}
