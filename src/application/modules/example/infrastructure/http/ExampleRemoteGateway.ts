// Module imports
import { AxiosRequestConfig } from 'axios';
import RemoteGateway from '@modules/common/infrastructure/http/RemoteGateway';

// External imports

export default class ContainerRemoteGateway extends RemoteGateway {
  public constructor() {
    const axiosConfig: AxiosRequestConfig = {};
    super(axiosConfig);
  }

  // Specific Remote Gateway methods here
  // TODO
}
