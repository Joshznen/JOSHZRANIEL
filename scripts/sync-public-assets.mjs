import {cpSync, existsSync, rmSync} from 'fs';
import path from 'path';
import {fileURLToPath} from 'url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const src = path.join(root, 'src', 'assets');
const dest = path.join(root, 'public', 'assets');

if (existsSync(dest)) {
  rmSync(dest, {recursive: true, force: true});
}

cpSync(src, dest, {recursive: true});
console.log('Synced src/assets -> public/assets');
