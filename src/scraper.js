const puppeteer = require('puppeteer');

const scrapeAmazon = async (searchTerm) => {
  console.log("Scrape Amazon");
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(`https://www.amazon.in/s?k=${encodeURIComponent(searchTerm)}`, {
    waitUntil: 'networkidle2',
  });

  const products = await page.evaluate(() => {
    
    const items = Array.from(document.querySelectorAll('.s-main-slot .s-result-item'));
    return items.map(item => {
      const title = item.querySelector('h2 .a-link-normal')?.innerText;
      const price = parseInt(item.querySelector('.a-price-whole')?.innerText.replace('₹', '').replaceAll(',', '').trim());
      const link = item.querySelector('h2 .a-link-normal')?.href;
      const image = item.querySelector('.s-image')?.src;
      return { title, price, link, image, platform: 'Amazon' };
    }).filter(item => item.title && item.price && item.link && item.image);
  });

  await browser.close();
  return products;
};


const scrapeFlipkart = async (searchTerm) => {
  console.log("Scrape Flipkart");

  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(`https://www.flipkart.com/search?q=${(searchTerm)}`, {
    waitUntil: 'networkidle2',
  });

  // Optional: Handle pagination (example for first page)
  
   // Adjust the loop based on number of pages
    const products = await page.evaluate(() => {
      const items = Array.from(document.querySelectorAll('.tUxRFH'));
      return items.map(item => {
        const title = item.querySelector('div.KzDlHZ')?.innerText;
        const price = parseInt(item.querySelector('div.Nx9bqj._4b5DiR')?.innerText.replace('₹', '').replaceAll(',', '').trim());
        const link = item.querySelector('a.CGtC98')?.href;
        const image= item.querySelector('img.DByuf4')?.src;
        console.log(link);
        return {
          title,
          price,
          link,
          image,
          platform: 'Flipkart'
        };
      }).filter(item => item.title && item.price && item.link && item.image);
    });

  await browser.close();
  return products;
};



const scrapeVijaySales = async (searchTerm) => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(`https://www.vijaysales.com/search/${searchTerm}`, { waitUntil: 'networkidle2' });

  const products = await page.evaluate(() => {
    const items = Array.from(document.querySelectorAll('.BcktPrd'));
    return items.map(item => {
      const titleElement = item.querySelector('a[title]');
      const title = titleElement ? titleElement.title : null;
      const link = titleElement ? titleElement.href : null;

      const imgElement = item.querySelector('img.prdimg');
      const image = imgElement ? imgElement.src : null;

      const priceElement = item.querySelector('.Prdvsprc_');
      const price = priceElement ? parseInt(priceElement.innerText.replace('₹', '').replaceAll(',', '').trim()) : null;

      return { title, price, link, image, platform: 'Vijay Sales' };
    }).filter(item => item.title && item.price && item.link && item.image);
  });

  await browser.close();
  return products;
};

const scrapeReliance = async (searchTerm) => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  try {
    await page.goto(`https://www.reliancedigital.in/search?q=${searchTerm}`, { waitUntil: 'networkidle2' });

    // Wait for the required elements to load
    await page.waitForSelector('.sp.grid a', { timeout: 10000 });

    const products = await page.evaluate(() => {
      const items = Array.from(document.querySelectorAll('.sp.grid a'));
      return items.map(item => {
        const title = item.querySelector('p.sp__name')?.innerText;
        const price = parseInt(item.querySelector('span.TextWeb__Text-sc-1cyx778-0.gimCrs span:last-child')?.innerText.replace('₹', '').replaceAll(',','').trim());
        const link = item.href;

        let image = item.querySelector('img.img-responsive.imgCenter')?.src;
        if (image && image.includes('mdefault.png')) {
          image = '..\\public\\funny-dog.jpg'
        }

        return { title, price, link, image, platform: 'Reliance Digital' };
      }).filter(item => item.title && item.price && item.link && item.image);
    });

    return products;
  } catch (error) {
    console.error('Error scraping Reliance Digital:', error);
    return [];
  } finally {
    await browser.close();
  }
};

const scrapeAll = async (searchTerm) => {
  let amazonProducts = await scrapeAmazon(searchTerm);
  let flipkartProducts = await scrapeFlipkart(searchTerm);

  let vijaysalesProducts = await scrapeVijaySales(searchTerm);
  let relianceProducts = await scrapeReliance(searchTerm);
    // amazonProducts = amazonProducts.sort((a,b) => a.price - b.price);
  // flipkartProducts = flipkartProducts.sort((a,b) => a.price - b.price);
  console.log(amazonProducts);
  console.log(flipkartProducts);
  console.log(vijaysalesProducts);
  console.log(relianceProducts);
  let finalscrape = [...amazonProducts,...flipkartProducts,...vijaysalesProducts,...relianceProducts];
  finalscrape = finalscrape.sort((a,b) => a.price - b.price);
  
  return finalscrape;
};



module.exports = { scrapeAll };