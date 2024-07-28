const puppeteer = require('puppeteer');

const scrapeCroma = async (searchTerm) => {
    console.log("scrapecroma");
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    page.on('dialog', async dialog => {
        console.log('Dialog detected:', dialog.message());
        await dialog.dismiss();
    });
    await page.goto(`https://www.croma.com/searchB?q=${encodeURIComponent(searchTerm)}`, {
        waitUntil: 'networkidle2',
    });

    // Wait for product elements to be loadeda
    await page.waitForSelector('.product-list');
    

    const products = await page.evaluate(() => {
        console.log("evaluating..");
        const items = Array.from(document.querySelectorAll('.product-item'));
        console.log(`Found ${items.length} items`); // Debug log to confirm number of items found
        return items.map(item => {
            const title = item.querySelector('h3 .product-title')?.innerText;
            const price = item.querySelector('.amount')?.innerText;
            const link = item.querySelector('a .product-title')?.href;
            const image = item.querySelector('img .product-img')?.src;
            console.log({ title, price, link, image }); // Debug each product
            return { title, price, link, image, source: 'Croma' };
        }).filter(item => item.title && item.price && item.link && item.image);
    });
    console.log(products);
    await browser.close();
    return products;
};

async function retu() {
    const products = await scrapeCroma('laptop');
    console.log('Scraped products:', products);
}

retu();