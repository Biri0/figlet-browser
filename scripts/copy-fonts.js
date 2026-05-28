import fs from 'fs';
import path from 'path';

const srcDir = path.resolve('node_modules/figlet/fonts');
const destDir = path.resolve('public/fonts');

if (!fs.existsSync(srcDir)) {
  console.error('Source font directory not found:', srcDir);
  process.exit(1);
}

fs.mkdirSync(destDir, { recursive: true });

const files = fs.readdirSync(srcDir).filter((f) => f.endsWith('.flf'));

for (const file of files) {
  fs.copyFileSync(path.join(srcDir, file), path.join(destDir, file));
}

console.log(`Copied ${files.length} font files to ${destDir}`);
