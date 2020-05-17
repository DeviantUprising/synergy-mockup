import UniqueEntityID from '@global/domain/UniqueEntityID';

export default abstract class Entity<T> {
  protected readonly id: UniqueEntityID;

  public readonly properties: T;

  constructor(properties: T, id?: UniqueEntityID) {
    this.id = id || new UniqueEntityID();
    this.properties = properties;
  }

  public equals = (object?: Entity<T>): boolean => {
    if (object === null || object === undefined) {
      return false;
    }

    if (this === object) {
      return true;
    }

    if (!Entity.isEntity(object)) {
      return false;
    }

    return this.id.equals(object.id);
  };

  static isEntity = (v: any): v is Entity<any> => {
    return v instanceof Entity;
  };
}
