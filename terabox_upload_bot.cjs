const puppeteer = require('puppeteer');

const run = async (teraboxUrl) => {
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: '/usr/bin/chromium-browser',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.goto('https://teraboxapp.com/');

  await page.click('text="Sign in"');
  await page.waitForSelector('#email');
  await page.type('#email', process.env.TERABOX_EMAIL);
  await page.type('#password', process.env.TERABOX_PASSWORD);
  await page.click('button[type="submit"]');
  await page.waitForNavigation();

  await page.goto('https://www.terabox.com/web/remote-upload');
  await page.type('#remote-upload-url-input', teraboxUrl);
  await page.click('#remote-upload-btn');
  await page.waitForTimeout(5000);

  await browser.close();
};

const [,, url] = process.argv;
run(url);
