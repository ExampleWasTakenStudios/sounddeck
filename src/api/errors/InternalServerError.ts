import { HttpError } from './HttpError';

export class InternalServerError extends HttpError {
  constructor(code: number, statusText: string, body: string) {
    super(code, statusText, body);

    this.name = 'InternalServerError';
    this.message = '';
  }
}
