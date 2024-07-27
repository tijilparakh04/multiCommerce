const puppeteer = require('puppeteer');

const scrapeAmazon = async (searchTerm) => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(`https://www.amazon.in/s?k=${encodeURIComponent(searchTerm)}`, {
    waitUntil: 'networkidle2',
  });

  const products = await page.evaluate(() => {
    const items = Array.from(document.querySelectorAll('.s-main-slot .s-result-item'));
    return items.map(item => {
      const title = item.querySelector('h2 .a-link-normal')?.innerText;
      const price = item.querySelector('.a-price-whole')?.innerText;
      const link = item.querySelector('h2 .a-link-normal')?.href;
      const image = item.querySelector('.s-image')?.src;
      return { title, price, link, image, source: 'Amazon' };
    }).filter(item => item.title && item.price && item.link && item.image);
  });

  await browser.close();
  return products;
};

const scrapeFlipkart = async (searchTerm) => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(`https://www.flipkart.com/search?q=${encodeURIComponent(searchTerm)}`, {
    waitUntil: 'networkidle2',
  });

  const products = await page.evaluate(() => {
    const items = Array.from(document.querySelectorAll('._1AtVbE'));
    return items.map(item => {
      const title = item.querySelector('._4rR01T')?.innerText;
      const price = item.querySelector('._30jeq3')?.innerText;
      const link = item.querySelector('a')?.href;
      const image = item.querySelector('img')?.src;
      return { title, price, link, image, source: 'Flipkart' };
    }).filter(item => item.title && item.price && item.link && item.image);
  });

  await browser.close();
  return products;
};

const scrapeAll = async (searchTerm) => {
  const amazonProducts = await scrapeAmazon(searchTerm);
  const flipkartProducts = await scrapeFlipkart(searchTerm);
  
  return [...amazonProducts, ...flipkartProducts];
};

module.exports = { scrapeAll };
