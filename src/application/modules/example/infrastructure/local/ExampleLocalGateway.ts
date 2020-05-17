// Module imports
import LocalGateway from '@modules/common/infrastructure/local/LocalGateway';

export default class ExampleLocalGateway extends LocalGateway {
  public constructor() {
    super(ApplicationDataStore.getInstance());
  }

  // Specific Local Gateway methods
  public findById = async (id: string): Promise<any> => {
    const data = this.getData();

    if (!Object.prototype.hasOwnProperty.call(data, id)) {
      return null;
    }

    return JSON.parse(await this.readBlobToString(data[id]));
  };

  public getAll = async (): Promise<any> => {
    const outputData: any = {};

    const data = this.getData();

    const keys = Object.keys(data);
    for (let i = 0; i < keys.length; i + 1) {
      const key = keys[i];
      outputData[key] = JSON.parse(await this.readBlobToString(data[key]));
    }

    return outputData;
  };

  public save = (id: string, newData: any): void => {
    const data = this.getData();

    data[id] = new Blob([JSON.stringify(newData)]);

    this.commitData(data);
  };

  public remove = (id: string): boolean => {
    const data = this.getData();

    if (!Object.prototype.hasOwnProperty.call(data, id)) {
      return false;
    }

    delete data[id];
    this.commitData(data);

    return true;
  };

  private readBlobToString = async (blob: Blob): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => {
        resolve(reader.result as string);
      };

      reader.onerror = reject;

      reader.readAsArrayBuffer(blob);
    });
  };
}
