export class ApplicationError extends Error {
  constructor(message: string, private className: string) {
    super(className + ": " + message);
  }
}
