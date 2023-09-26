import {Command} from './command.interface.js';
import got from 'got';
import {MockServerData} from '../../shared/types/mock-server-data.type.js';
import {TSVOfferGenerator} from '../../shared/libs/offer-generator/index.js';
import {TSVFileWriter} from '../../shared/libs/file-writer/index.js';
import {getErrorMessage} from '../../shared/helpers/index.js';

export class GenerateCommand implements Command {
  private initialData: null | MockServerData = null;

  public getName(): string {
    return '--generate';
  }

  private async write(filepath: string, offerCount: number) {
    if (!this.initialData) {
      throw new Error('Mock Data not loaded');
    }
    const tsvOfferGenerator = new TSVOfferGenerator(this.initialData);
    const tsvFilerWriter = new TSVFileWriter(filepath);
    for (let i = 0; i < offerCount; i++) {
      await tsvFilerWriter.write(tsvOfferGenerator.generate());
    }
  }

  private async load(url: string) {
    try {
      this.initialData = await got.get(url).json<MockServerData>();
    } catch (e) {
      throw new Error(`Can't load data from ${url}`);
    }
  }

  public async execute(...parameters: string[]): Promise<void> {
    if (parameters.length !== 3) {
      throw new Error('Incorrect parameters');
    }
    const [count, filepath, url] = parameters;
    const offerCount = Number.parseInt(count, 10);
    try {
      await this.load(url);
      await this.write(filepath, offerCount);
      console.info(`File ${filepath} was created!`);
    } catch (error) {
      console.error('Can\'t generate data');
      console.error(getErrorMessage(error));
    }
  }
}
