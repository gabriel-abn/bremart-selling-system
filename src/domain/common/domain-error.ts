export class DomainError extends Error {
  public readonly name: string;
  public readonly message: string;

  constructor(message: string | string[]) {
    super(Array.isArray(message) ? message.join(", ") : message);
    this.name = "DomainError";
  }
}
