export default class Identifier<T> {
  constructor(private value: T) {
    this.value = value;
  }

  public equals = (id?: Identifier<T>): boolean => {
    if (id === null || id === undefined) {
      return false;
    }

    if (!(id instanceof this.constructor)) {
      return false;
    }

    return id.toValue() === this.value;
  };

  public toString = () => String(this.value);

  /**
   * Return raw value of identifier
   */
  public toValue = (): T => this.value;
}
