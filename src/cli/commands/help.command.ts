import { Command } from './command.interface.js';
import chalk from 'chalk';


const paintCommand = (cmd: string) => chalk.blue.bold(cmd);
const paintToYellow = (cmd: string) => chalk.yellow(cmd);
const paintToGreen = (cmd: string) => chalk.green(cmd);
const paintToRed = (cmd: string) => chalk.red(cmd);

const importCmdText = `${paintCommand('--import')} ${paintToRed('<path>')} ${paintToGreen('<login>')} ${paintToYellow('<password>')} ${paintToGreen('<host>')} ${paintToYellow('<dbname>')} ${paintToRed('<salt>')}`;
const generateCmdText = `${paintCommand('--generate')} ${paintToYellow('<n>')} ${paintToGreen('<path>')} ${paintToRed('<url>')}`;

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
            ${paintCommand('--version')}:                                                     # выводит номер версии приложения
            ${paintCommand('--help')}:                                                        # печатает возможные команды cli приложения
            ${importCmdText}:         # импортирует данные из TSV, по пути, переданным аргументом <path> в MongoDB, следующими параметрами передается <login> - логин, <password> - пароль, <host> - хост на котором крутится MongoDB, <dbname> - название базы данных, <salt> - секретный ключ
            ${generateCmdText}:                                   # генерирует указанное первым аргументом количество тестовых данных в TSV файл, по пути <path> и данные берет из мокового api, по пути <url>
    `);
  }
}
