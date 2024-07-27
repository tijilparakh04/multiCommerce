const puppeteer = require('puppeteer');

const scrapeAmazon = async (searchTerm) => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(`https://www.amazon.in/s?k=${searchTerm}`);

  const products = await page.evaluate(() => {
    const items = Array.from(document.querySelectorAll('.s-main-slot .s-result-item'));
    return items.map(item => ({
      title: item.querySelector('h2 .a-link-normal')?.innerText,
      price: item.querySelector('.a-price-whole')?.innerText,
      link: item.querySelector('h2 .a-link-normal')?.href
    })).filter(item => item.title && item.price && item.link);
  });

  await browser.close();
  return products;
};

module.exports = { scrapeAmazon };
