// Module imports
// TODO:
// Uncomment when implementing

import { IContainerRepository } from '@modules/container/repositories/IContainerRepository';
import ContainerRemoteGateway from '@modules/container/infrastructure/http/ContainerRemoteGateway';
import Container from '@modules/container/domain/Container';
/*
export default class ContainerRemoteRepository implements IContainerRepository {
  private gateway: ContainerRemoteGateway;

  public constructor() {
    this.gateway = new ContainerRemoteGateway();
  }

  public exists = await (uid: string): Promise<boolean> => {
    return true;
  };

  public save = await (container: Container): Promise<boolean> => {
    return true;
  };

  public list = await (): Promise<Container[]> => {
    return [];
  };

  public getByUid = await (uid: string): Promise<Container | null> => {
    return null;
  };

  public removeByUid = await (uid: string): Promise<boolean> => {
    return true;
  };
}
*/
