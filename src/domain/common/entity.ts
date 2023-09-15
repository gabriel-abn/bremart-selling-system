export abstract class Entity<T> {
  protected readonly _id: string;
  protected readonly _props: T;

  protected readonly createdAt: Date;
  protected readonly updatedAt: Date;

  constructor(props: T, id: string, createdAt?: Date, updatedAt?: Date) {
    this._id = id;
    this._props = props;
    this.createdAt = new Date() ?? createdAt;
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

    return this._id === object._id;
  };

  public get props(): T {
    return this._props;
  }

  public get id() {
    return this._id;
  }

  public toString(): string {
    return `${this.constructor.name}: ${this._id}`;
  }
}
