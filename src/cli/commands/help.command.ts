import { Command } from './command.interface.js';
import chalk from 'chalk';


const paintCommand = (cmd: string) => chalk.blue.bold(cmd);
const $yellow = (cmd: string) => chalk.yellow(cmd);
const $green = (cmd: string) => chalk.green(cmd);
const $red = (cmd: string) => chalk.red(cmd);

const importCmdText = `${paintCommand('--import')} ${$red('<path>')} ${$green('<login>')} ${$yellow('<password>')} ${$green('<host>')} ${$yellow('dbname')} ${$red('salt')}`;
const generateCmdText = `${paintCommand('--generate')} ${$yellow('<n>')} ${$green('<path>')} ${$red('<url>')}`;

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
            ${paintCommand('--version')}:                                                     # выводит номер версии
            ${paintCommand('--help')}:                                                        # печатает этот текст
            ${importCmdText}:         # импортирует данные из TSV в MongoDB
            ${generateCmdText}:                                   # генерирует произвольное количество тестовых данных
    `);
  }
}
