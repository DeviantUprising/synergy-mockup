// Core imports
import { IMapper } from '@global/infrastructure/IMapper';
import UniqueEntityID from '@global/domain/UniqueEntityID';

// Module imports
import Example from '@modules/example/domain/Example';
import { IExampleDTO } from '@modules/example/dtos/IExampleDTO';

export default class ExampleMap implements IMapper<Example> {
  public static toDTO = (example: Example): IExampleDTO => {
    return {
      uid: example.getExampleId().getId().toString(),
      count: example.getValue(),
    };
  };

  public static toDomain = (raw: any): Example | null => {
    const result = Example.create(
      {
        value: raw.value,
      },
      new UniqueEntityID(raw.containerId)
    );

    return result.isSuccess ? result.getValue() : null;
  };

  public static toPersistence = (example: Example): any => {
    return {
      value: example.getValue(),
    };
  };
}
