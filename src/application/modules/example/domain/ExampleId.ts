// Core imports
import Entity from '@global/domain/Entity';
import UniqueEntityID from '@global/domain/UniqueEntityID';
import { Result } from '@global/core/ResultHandler';

export default class ExampleId extends Entity<any> {
  private constructor(id?: UniqueEntityID) {
    super(null, id);
  }

  public getId = (): UniqueEntityID => this.id;

  public static create = (id?: UniqueEntityID): Result<ExampleId> =>
    Result.ok<ExampleId>(new ExampleId(id));
}
