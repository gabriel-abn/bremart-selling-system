export class DomainError extends Error {
  public readonly name: string;
  public readonly message: string;

  constructor(message: string[]) {
    super(message.map((m) => m).join(", "));
    this.name = "DomainError";
  }
}
