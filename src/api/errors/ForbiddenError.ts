import { HttpError } from './HttpError';

export class ForbiddenError extends HttpError {
  constructor(code: number, statusText: string, body: string) {
    super(code, statusText, body);

    this.name = 'BadRequestError';
    this.message = 'The server understood the request, but is refusing to fulfill it.';
  }
}
