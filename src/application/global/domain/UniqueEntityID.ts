import { v4 as uuidv4 } from 'uuid';
import Identifier from '@global/domain/Identifier';

export default class UniqueEntityID extends Identifier<string | number> {
  public constructor(id?: string | number) {
    super(id || uuidv4());
  }
}
