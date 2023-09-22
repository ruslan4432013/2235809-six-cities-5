import {Command} from './command.interface.js';
import chalk from 'chalk';


const paintCommand = (cmd: string) => chalk.blue.bold(cmd);

const importCmdText = `${paintCommand('--import')} ${chalk.green('<path>')}`;
const generateCmdText = `${paintCommand('--generate')} ${chalk.yellow('<n>')} ${chalk.green('<path>')} ${chalk.red('<url>')}`;

export class HelpCommand implements Command {

  public getName(): string {
    return '--help';
  }

  public async execute(..._parameters: string[]) {
    console.info(`
        Программа для подготовки данных для REST API сервера.
        Пример:
            cli --<command> [--arguments]
        Команды:
            ${paintCommand('--version')}:                                         # выводит номер версии
            ${paintCommand('--help')}:                                            # печатает этот текст
            ${importCmdText}:                                   # импортирует данные из TSV
            ${generateCmdText}:                       # генерирует произвольное количество тестовых данных
    `);
  }
}
