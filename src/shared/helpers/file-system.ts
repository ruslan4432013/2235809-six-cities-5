import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';

export const getCurrentModuleDirectoryPath = () => dirname(fileURLToPath(import.meta.url));
