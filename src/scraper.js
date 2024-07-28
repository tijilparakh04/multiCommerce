const puppeteer = require('puppeteer');

const scrapeAmazon = async (searchTerm) => {
  try {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto(`https://www.amazon.in/s?k=${searchTerm}`, { waitUntil: 'networkidle2' });

    const products = await page.evaluate(() => {
      const items = Array.from(document.querySelectorAll('.s-main-slot .s-result-item'));
      return items.map(item => {
        const title = item.querySelector('h2 a span')?.innerText.trim();
        const price = item.querySelector('.a-price-whole')?.innerText.replace(',', '').trim();
        const link = item.querySelector('h2 a')?.href;
        const image = item.querySelector('img.s-image')?.src;

        return { title, price, link, image, platform: 'Amazon' };
      }).filter(item => item.title && item.price && item.link && item.image);
    });

    await browser.close();
    return products;
  } catch (error) {
    console.error('Error scraping Amazon:', error);
    return [];
  }
};

const scrapeFlipkart = async (searchTerm) => {
  try {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto(`https://www.flipkart.com/search?q=${searchTerm}`, { waitUntil: 'networkidle2' });

    const products = await page.evaluate(() => {
      const items = Array.from(document.querySelectorAll('.tUxRFH'));
      return items.map(item => {
        const titleElement = item.querySelector('div.KzDlHZ');
        const title = titleElement?.innerText.trim();
        const priceElement = item.querySelector('div.Nx9bqj._4b5DiR');
        const price = priceElement?.innerText.replace('₹', '').replace(',', '').trim();
        const linkElement = item.querySelector('a.CGtC98');
        const link = linkElement?.href;
        const imageElement = item.querySelector('img.DByuf4');
        const image = imageElement?.src;

        return { title, price, link, image, platform: 'Flipkart' };
      }).filter(item => item.title && item.price && item.link && item.image);
    });

    await browser.close();
    return products;
  } catch (error) {
    console.error('Error scraping Flipkart:', error);
    return [];
  }
};

const scrapeCroma = async (searchTerm) => {
  try {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto(`https://www.croma.com/searchB?q=${searchTerm}`, { waitUntil: 'networkidle2' });

    const products = await page.evaluate(() => {
      const items = Array.from(document.querySelectorAll('li.product-item'));

      return items.map(item => {
        const titleElement = item.querySelector('h3.product-title.plp-prod-title a');
        const title = titleElement?.innerText.trim();
        const link = titleElement ? titleElement.href : '';

        const priceElement = item.querySelector('.new-price.plp-srp-new-price-cont .amount');
        const price = priceElement ? priceElement.innerText.replace('₹', '').replace(',', '').trim() : '';

        const imgElement = item.querySelector('div[data-testid="product-img"] img');
        const image = imgElement ? imgElement.src : '';

        return { title, price, link, image, platform: 'Croma' };
      }).filter(item => item.title && item.price && item.link && item.image);
    });

    await browser.close();
    return products;
  } catch (error) {
    console.error('Error scraping Croma:', error);
    return [];
  }
};

const scrapeReliance = async (searchTerm) => {
  const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto(`https://www.reliancedigital.in/search?q=${searchTerm}`, { waitUntil: 'networkidle2' });

  const products = await page.evaluate(() => {
    const items = Array.from(document.querySelectorAll('.sp.grid a'));
    return items.map(item => {
      const title = item.querySelector('p.sp__name')?.innerText;
      const price = item.querySelector('span.TextWeb__Text-sc-1cyx778-0.gimCrs span:last-child')?.innerText.replace('₹', '').trim();
      const link = item.href;
      const image = item.querySelector('img.img-responsive')?.src;
      return { title, price, link, image, platform: 'Reliance Digital'};
    }).filter(item => item.title && item.price && item.link && item.image);
  });

  await browser.close();
  return products;
};


const scrapeProducts = async (searchTerm) => {
  const amazonProducts = await scrapeAmazon(searchTerm);
  const flipkartProducts = await scrapeFlipkart(searchTerm);
  const cromaProducts = await scrapeCroma(searchTerm);
  const relianceProducts = await scrapeReliance(searchTerm);
  const combinedProducts = [...amazonProducts, ...flipkartProducts, ...cromaProducts, ...relianceProducts];
  return combinedProducts;
};

module.exports = { scrapeProducts };
