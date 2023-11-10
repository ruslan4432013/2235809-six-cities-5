import { Command } from './command.interface.js';
import chalk from 'chalk';


export class HelpCommand implements Command {
  private readonly importCmdText = `${chalk.blue('--import')} ${chalk.red('<path>')} ${chalk.green('<login>')} ${chalk.yellow('<password>')} ${chalk.green('<host>')} ${chalk.yellow('<dbname>')} ${chalk.red('<salt>')}`;
  private readonly generateCmdText = `${chalk.blue('--generate')} ${chalk.yellow('<n>')} ${chalk.green('<path>')} ${chalk.yellow('<url>')}`;
  public getName(): string {
    return '--help';
  }

  public async execute(..._parameters: string[]) {
    console.info(`
        Программа для подготовки данных для REST API сервера.
        Пример:
            cli ${chalk.blue('--<command>')} [--arguments]
        Команды:
            ${chalk.blue('--version')}:                                                     # выводит номер версии приложения
            ${chalk.blue('--help')}:                                                        # печатает возможные команды cli приложения
            ${this.importCmdText}:     # импортирует данные из TSV в MongoDB, следующими параметрами передается:
                     ${chalk.red('<path>')} - путь до TSV файла
                     ${chalk.green('<login>')} - логин,
                     ${chalk.green('<password>')} - пароль,
                     ${chalk.green('<host>')} - хост на котором крутится MongoDB,
                     ${chalk.yellow('<dbname>')} - название базы данных,
                     ${chalk.red('<salt>')} - секретный ключ (необходим для хеширования паролей, может быть любым)
            ${this.generateCmdText}:                                   # генерирует тестовых данные в TSV файл, следующими параметрами передается:
                     ${chalk.yellow('<n>')} - количество генерируемых записей
                     ${chalk.green('<path>')} - полный путь, с указанием файла, по которому сохраняются генерируемые данные
                     ${chalk.yellow('<url>')} - url адрес мокового json-сервера (npm run start:mock-server)
    `);
  }
}
