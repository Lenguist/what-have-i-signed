import puppeteer from 'puppeteer';
import { mkdir } from 'fs/promises';
import { existsSync } from 'fs';

const BASE = 'https://what-have-i-signed.vercel.app';
const OUT = './store-assets';

if (!existsSync(OUT)) await mkdir(OUT);

const browser = await puppeteer.launch({ headless: true });

async function shot(page, url, path, width, height, clip) {
  await page.setViewport({ width, height, deviceScaleFactor: 2 });
  await page.goto(url, { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path, type: 'png', ...(clip ? { clip } : { fullPage: false }) });
  console.log('saved', path);
}

const page = await browser.newPage();

// Store icon — crop the amber logo area from homepage
await shot(page, BASE, `${OUT}/icon128.png`, 400, 400, { x: 0, y: 0, width: 400, height: 400 });

// Screenshot 1 — landing page hero (1280x800)
await shot(page, BASE, `${OUT}/screenshot-landing.png`, 1280, 800);

// Screenshot 2 — login page (1280x800)
await shot(page, BASE + '/login', `${OUT}/screenshot-login.png`, 1280, 800);

// Small promo tile 440x280 — landing page cropped
await shot(page, BASE, `${OUT}/promo-small.png`, 440, 280);

// Marquee promo tile 1400x560
await shot(page, BASE, `${OUT}/promo-marquee.png`, 1400, 560);

await browser.close();
console.log('\nAll assets saved to', OUT);
