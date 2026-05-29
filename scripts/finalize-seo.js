import fs from 'fs';
import path from 'path';

const distDir = path.resolve('dist');
const siteUrl = (process.env.VITE_SITE_URL || 'https://example.com').replace(/\/+$/, '');
const buildDate = new Date().toISOString().slice(0, 10);
const files = ['index.html', 'robots.txt', 'sitemap.xml'];

if (!fs.existsSync(distDir)) {
  console.error('dist directory not found. Run vite build before finalizing SEO files.');
  process.exit(1);
}

for (const file of files) {
  const filePath = path.join(distDir, file);
  if (!fs.existsSync(filePath)) continue;

  const next = fs
    .readFileSync(filePath, 'utf8')
    .replaceAll('__SITE_URL__', siteUrl)
    .replaceAll('__BUILD_DATE__', buildDate);

  fs.writeFileSync(filePath, next);
}

if (!process.env.VITE_SITE_URL) {
  console.warn('VITE_SITE_URL is not set; SEO URLs defaulted to https://example.com.');
}
