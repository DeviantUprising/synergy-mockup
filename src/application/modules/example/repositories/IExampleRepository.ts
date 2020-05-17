// Module imports
import Example from '@modules/example/domain/Example';

export interface IExampleRepository {
  exists(uid: string): Promise<boolean>;
  save(example: Example): Promise<boolean> | boolean;
  list(): Promise<Example[]>;
  getByUid(uid: string): Promise<Example | null>;
  removeByUid(uid: string): Promise<boolean> | boolean;
}
