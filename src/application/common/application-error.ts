export class ApplicationError extends Error {
  constructor(message: string, private className: string) {
    super(message);
  }

  toString() {
    return {
      className: this.className,
      message: this.message,
    };
  }
}
