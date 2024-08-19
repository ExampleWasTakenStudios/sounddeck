import { HttpError } from './HttpError';

export class RateLimitError extends HttpError {
  constructor(code: number, statusText: string, body: string) {
    super(code, statusText, body);

    this.name = 'RateLimitError';
    this.message =
      'Rate limiting has been applied. see https://developer.spotify.com/documentation/web-api/concepts/rate-limits';
  }
}
