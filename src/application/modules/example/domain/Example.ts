// Core imports
import AggregateRoot from '@global/domain/AggregateRoot';
import UniqueEntityID from '@global/domain/UniqueEntityID';
import { Result } from '@global/core/ResultHandler';

// Module imports
import { IExampleProperties } from '@modules/example/domain/IExampleProperties';
import ExampleId from '@modules/example/domain/ExampleId';

export default class Container extends AggregateRoot<IExampleProperties> {
  private constructor(properties: IExampleProperties, id?: UniqueEntityID) {
    super(properties, id);
  }

  public getExampleId = (): ExampleId => ExampleId.create(this.id).getValue();

  public getValue = (): any => this.properties.value;

  public static create(
    properties: IExampleProperties,
    id?: UniqueEntityID
  ): Result<Container> {
    // Add guards here
    return Result.ok<Container>(new Container(properties, id));
  }
}
