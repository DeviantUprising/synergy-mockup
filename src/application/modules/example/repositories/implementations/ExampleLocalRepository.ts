// Module imports
import { IExampleRepository } from '@modules/example/repositories/IExampleRepository';
import ExampleLocalGateway from '@modules/example/infrastructure/local/ExampleLocalGateway';
import Example from '@modules/example/domain/Example';
import ExampleMap from '@modules/example/mappers/ExampleMap';

export default class ExampleLocalRepository implements IExampleRepository {
  private gateway: ExampleLocalGateway;

  public constructor() {
    this.gateway = new ExampleLocalGateway();
  }

  public exists = async (uid: string): Promise<boolean> =>
    (await this.gateway.findById(uid)) !== null;

  public save = (example: Example): boolean => {
    const persistenceExample = ExampleMap.toPersistence(example);

    this.gateway.save(
      example.getExampleId().getId().toString(),
      persistenceExample
    );

    return true;
  };

  public list = async (): Promise<Example[]> => {
    const result: Example[] = [];

    const persistenceExamples = await this.gateway.getAll();

    Object.keys(persistenceExamples).forEach((key) => {
      const container = ExampleMap.toDomain({
        uid: key,
        value: persistenceExamples[key].value,
      });

      if (container !== null) {
        result.push(container);
      }
    });

    return result;
  };

  public getByUid = async (uid: string): Promise<Example | null> => {
    const persistenceExample = await this.gateway.findById(uid);

    if (persistenceExample === null) {
      return null;
    }

    return ExampleMap.toDomain({
      uid,
      value: persistenceExample.value,
    });
  };

  public removeByUid = (uid: string): boolean => this.gateway.remove(uid);
}
