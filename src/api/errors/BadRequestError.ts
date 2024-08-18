import { HttpError } from './HttpError';

export class BadRequestError extends HttpError {
  constructor(code: number, statusText: string, body: string) {
    super(code, statusText, body);

    this.name = 'BadRequestError';
    this.message =
      'The request could not be understood by the server due to malformed syntax. The message body will contain more information; see https://developer.spotify.com/documentation/web-api/concepts/api-calls#response-schema';
  }
}
