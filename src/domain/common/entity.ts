export abstract class Entity<T> {
  public readonly id: string;
  public readonly props: T;

  public readonly createdAt: Date;
  public readonly updatedAt: Date;

  constructor(props: T, id: string, createdAt?: Date, updatedAt?: Date) {
    this.id = id;
    this.props = props;
    this.createdAt = new Date() ?? createdAt;
    this.updatedAt = new Date() ?? updatedAt;
  }

  public getUpdateDates = (): { createdAt: Date; updatedAt: Date } => {
    return {
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  };
}
