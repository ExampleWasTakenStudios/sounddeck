export class HttpError extends globalThis.Error {
  protected readonly code: number;
  protected readonly statusText: string;
  protected body: string;

  constructor(code: number, statusText: string, body: string) {
    super();
    this.code = code;
    this.statusText = statusText;
    this.body = body;
    this.name = 'HttpError';
    this.message = 'An unspecified HTTP error occurred.';
  }

  override toString(): string {
    return `${this.name} (${this.code} - ${this.statusText}):\n${this.message}\nBody:\n${this.body}`;
  }
}
