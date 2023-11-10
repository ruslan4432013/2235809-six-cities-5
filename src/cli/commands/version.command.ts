import {readFileSync} from 'node:fs';
import {resolve} from 'node:path';
import {Command} from './command.interface.js';

type PackageJSONConfig = {
  version: string
}

const isPackageJSONConfig = (value: unknown): value is PackageJSONConfig =>
  typeof value === 'object' && value !== null && !Array.isArray(value) && 'version' in value;

export class VersionCommand implements Command {
  constructor(
    private readonly filePath = './package.json'
  ) {
  }

  private readVersion() {
    const jsonContent = readFileSync(resolve(this.filePath), 'utf-8');
    const importedContent: unknown = JSON.parse(jsonContent);
    if (!isPackageJSONConfig(importedContent)) {
      throw new Error('Failed to parse json content.');
    }
    return importedContent.version;
  }

  public getName(): string {
    return '--version';
  }

  public async execute() {
    try {
      const version = this.readVersion();
      console.info(version);
    } catch (error: unknown) {
      console.error(`Failed to read version from ${this.filePath}`);
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  }
}
