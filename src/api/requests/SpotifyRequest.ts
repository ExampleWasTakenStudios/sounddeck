import { LocalStorage } from 'storage-manager-js';
import { BadGatewayError } from '../errors/BadGatewayError';
import { BadRequestError } from '../errors/BadRequestError';
import { ForbiddenError } from '../errors/ForbiddenError';
import { HttpError } from '../errors/HttpError';
import { InternalServerError } from '../errors/InternalServerError';
import { NotFoundError } from '../errors/NotFoundError';
import { RateLimitError } from '../errors/RateLimitError';
import { ServiceUnavailableError } from '../errors/ServiceUnavailableError';
import { UnauthorizedError } from '../errors/UnauthorizedError';
import { AccessToken } from '../types/AccessToken';

export class SpotifyRequest {
  private readonly baseUrl: string;

  constructor() {
    this.baseUrl = 'https://api.spotify.com/v1';
  }

  async get<ReturnType>(endpoint: string): Promise<ReturnType> {
    return this.fetch<ReturnType>(endpoint);
  }

  async post<ReturnType>(endpoint: string, body: BodyInit): Promise<ReturnType> {
    const payload: RequestInit = {
      method: 'POST',
      body,
    };

    return this.fetch<ReturnType>(endpoint, payload);
  }

  async put<ReturnType>(endpoint: string, body: BodyInit): Promise<ReturnType> {
    const payload: RequestInit = {
      method: 'PUT',
      body,
    };

    return this.fetch<ReturnType>(endpoint, payload);
  }

  async delete<ReturnType>(endpoint: string, body: BodyInit): Promise<ReturnType> {
    const payload: RequestInit = {
      method: 'DELETE',
      body,
    };

    return this.fetch<ReturnType>(endpoint, payload);
  }

  private async fetch<ReturnType>(endpoint: string, payload?: RequestInit): Promise<ReturnType> {
    const formattedEndpoint = !endpoint.startsWith('/') ? `/${endpoint}` : endpoint;
    const requestUrl = new URL(this.baseUrl + formattedEndpoint);

    const accessToken: AccessToken = LocalStorage.get('sounddeck:access_token') as AccessToken;

    const authPayload: RequestInit = {
      ...payload,
      headers: {
        Authorization: `Bearer ${accessToken.access_token}`,
      },
    };

    const response = await globalThis.fetch(requestUrl, authPayload);

    if (!response.ok) {
      switch (response.status) {
        case 400:
          throw new BadRequestError(response.status, response.statusText, await response.text());
        case 401:
          throw new UnauthorizedError(response.status, response.statusText, await response.text());
        case 403:
          throw new ForbiddenError(response.status, response.statusText, await response.text());
        case 404:
          throw new NotFoundError(response.status, response.statusText, await response.text());
        case 429:
          throw new RateLimitError(response.status, response.statusText, await response.text());
        case 500:
          throw new InternalServerError(response.status, response.statusText, await response.text());
        case 502:
          throw new BadGatewayError(response.status, response.statusText, await response.text());
        case 503:
          throw new ServiceUnavailableError(response.status, response.statusText, await response.text());
        default:
          throw new HttpError(response.status, response.statusText, await response.text());
      }
    }

    return (await response.json()) as ReturnType;
  }
}
