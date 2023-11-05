import { Command } from './command.interface.js';


export class HelpCommand implements Command {
  private readonly importCmdText = `${'--import'.blue.bold} ${'<path>'.red} ${'<login>'.green} ${'<password>'.yellow} ${'<host>'.green} ${'<dbname>'.yellow} ${'<salt>'.red}`;
  private readonly generateCmdText = `${'--generate'.blue.bold} ${'<n>'.yellow} ${'<path>'.green} ${'<url>'.yellow}`;
  public getName(): string {
    return '--help';
  }

  public async execute(..._parameters: string[]) {
    console.info(`
        Программа для подготовки данных для REST API сервера.
        Пример:
            cli ${'--<command>'.blue.bold} [--arguments]
        Команды:
            ${'--version'.blue.bold}:                                                     # выводит номер версии приложения
            ${'--help'.blue.bold}:                                                        # печатает возможные команды cli приложения
            ${this.importCmdText}:     # импортирует данные из TSV в MongoDB, следующими параметрами передается:\n                     ${'<path>'.red} - путь до TSV файла \n                     ${'<login>'.green} - логин,\n                     ${'<password>'.yellow} - пароль,\n                     ${'<host>'.green} - хост на котором крутится MongoDB,\n                     ${'<dbname>'.yellow} - название базы данных,\n                     ${'<salt>'.red} - секретный ключ (необходим для хеширования паролей, может быть любым)\n
            ${this.generateCmdText}:                                   # генерирует тестовых данные в TSV файл, следующими параметрами передается: \n                     ${'<n>'.yellow} - количество генерируемых записей  \n                     ${'<path>'.green} - полный путь, с указанием файла, по которому сохраняются генерируемые данные \n                     ${'<url>'.yellow} - url адрес мокового json-сервера (npm run start:mock-server)
    `);
  }
}
