import { Command } from './command.interface.js';
import { TSVFileReader } from '../../shared/libs/file-reader/index.js';
import { createOffer, getErrorMessage, getMongoURI } from '../../shared/helpers/index.js';
import { UserService } from '../../shared/modules/user/index.js';
import { DefaultOfferService, OfferModel, OfferService } from '../../shared/modules/offer/index.js';
import { DatabaseClient, MongoDatabaseClient } from '../../shared/libs/database-client/index.js';
import { Logger } from '../../shared/libs/logger/index.js';
import { DEFAULT_DB_PORT, DEFAULT_USER_PASSWORD } from './command.constant.js';
import { HouseOffer } from '../../shared/types/index.js';
import { ConsoleLogger } from '../../shared/libs/logger/console.logger.js';
import { DefaultUserService, UserModel } from '../../shared/modules/user/index.js';

export class ImportCommand implements Command {
  private readonly userService: UserService;
  private readonly offerService: OfferService;
  private readonly databaseClient: DatabaseClient;
  private readonly logger: Logger;
  private salt: string;

  constructor() {
    this.onImportedLine = this.onImportedLine.bind(this);
    this.onCompleteImport = this.onCompleteImport.bind(this);

    this.logger = new ConsoleLogger();
    this.userService = new DefaultUserService(this.logger, UserModel, OfferModel);
    this.offerService = new DefaultOfferService(this.logger, OfferModel, UserModel);
    this.databaseClient = new MongoDatabaseClient(this.logger);
  }

  public getName(): string {
    return '--import';
  }

  private async onImportedLine(line: string, resolve: () => void) {
    const offer = createOffer(line);
    await this.saveOffer(offer);
    resolve();
  }

  private async saveOffer(offer: HouseOffer) {
    const user = await this.userService.findOrCreate({
      ...offer.author,
      password: DEFAULT_USER_PASSWORD,
    }, this.salt);
    if (offer.facilities.length === 0) {
      return;
    }
    await this.offerService.create({
      title: offer.title,
      authorId: user.id,
      city: offer.city,
      coords: offer.coords,
      description: offer.description,
      facilities: offer.facilities,
      guestsCount: offer.guestsCount,
      images: offer.images,
      houseType: offer.houseType,
      isPremium: offer.isPremium,
      preview: offer.preview,
      postDate: offer.postDate,
      rentPrice: offer.rentPrice,
      roomsCount: offer.roomsCount,
    });
  }

  private onCompleteImport(count: number) {
    console.info(`${count} rows imported.`);
    this.databaseClient.disconnect();
  }

  public async execute(filename: string, login: string, password: string, host: string, dbname: string, salt: string): Promise<void> {
    const uri = getMongoURI(login, password, host, DEFAULT_DB_PORT, dbname);
    this.salt = salt;
    await this.databaseClient.connect(uri);
    const fileReader = new TSVFileReader(filename.trim());
    fileReader.on('line', this.onImportedLine);
    fileReader.on('end', this.onCompleteImport);

    try {
      await fileReader.read();
    } catch (err) {
      console.error(`Can't import data from file: ${filename}`);
      console.error(getErrorMessage(err));
    }
  }
}
