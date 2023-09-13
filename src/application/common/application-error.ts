export class ApplicationError extends Error {
  constructor(message: string, error: string) {
    super(error + ": " + message);
  }
}
