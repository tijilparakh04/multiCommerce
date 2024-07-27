const puppeteer = require('puppeteer');

const scrapeAmazon = async (searchTerm) => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(`https://www.amazon.in/s?k=${searchTerm}`);

  const products = await page.evaluate(() => {
    const items = Array.from(document.querySelectorAll('.s-main-slot .s-result-item'));
    return items.map(item => {
      const title = item.querySelector('h2 .a-link-normal')?.innerText;
      const price = item.querySelector('.a-price-whole')?.innerText;
      const link = item.querySelector('h2 .a-link-normal')?.href;
      const image = item.querySelector('.s-image')?.src;
      return { title, price, link, image };
    }).filter(item => item.title && item.price && item.link && item.image);
  });

  await browser.close();
  return products;
};

module.exports = { scrapeAmazon };
