export class DomainError extends Error {
  public readonly name: string;
  public readonly message: string;

  constructor(...message: string[]) {
    super();
    this.name = "DomainError";
    this.message = Array.isArray(message) ? message.join(", ") : message;
  }
}
