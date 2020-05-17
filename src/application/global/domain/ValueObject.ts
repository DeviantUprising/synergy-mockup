import { IValueObjectProperties } from '@global/domain/IValueObjectProperties';

/**
 * @desc ValueObjects are objects that we determine their
 * equality through their structural property.
 */

export default abstract class ValueObject<T extends IValueObjectProperties> {
  public properties: T;

  constructor(properties: T) {
    const baseproperties: any = {
      ...properties,
    };

    this.properties = baseproperties;
  }

  public equals = (vo?: ValueObject<T>): boolean => {
    if (vo === null || vo === undefined) {
      return false;
    }
    if (vo.properties === undefined) {
      return false;
    }
    return JSON.stringify(this.properties) === JSON.stringify(vo.properties);
  };
}
