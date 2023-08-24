export abstract class Entity<T> {
  protected readonly id: string;
  protected readonly props: T;

  protected readonly createdAt: Date;
  protected readonly updatedAt: Date;

  constructor(props: T, id: string, updatedAt?: Date) {
    this.id = id;
    this.props = props;
    this.createdAt = new Date();
    this.updatedAt = new Date() ?? updatedAt;
  }

  public getUpdateDates = (): { createdAt: Date; updatedAt: Date } => {
    return {
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  };

  public equals = (object?: Entity<T>): boolean => {
    if (object == null || object == undefined) {
      return false;
    }

    if (this === object) {
      return true;
    }

    return this.id === object.id;
  };

  public getProps = (): T => {
    return this.props;
  };

  public getId = (): string => {
    return this.id;
  };
}
