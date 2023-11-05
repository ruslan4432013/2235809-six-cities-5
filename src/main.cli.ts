#!/usr/bin/env node
import 'reflect-metadata';
import { colors } from './shared/helpers/colors.js';
import { CLIApplication, HelpCommand, VersionCommand, ImportCommand, GenerateCommand } from './cli/index.js';

colors.enable();

const bootstrap = () => {
  const cliApplication = new CLIApplication();
  cliApplication.registerCommands([
    new HelpCommand(),
    new VersionCommand(),
    new ImportCommand(),
    new GenerateCommand()
  ]);
  cliApplication.processCommand(process.argv);
};

bootstrap();
