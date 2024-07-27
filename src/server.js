const express = require('express');
const cors = require('cors');
const { scrapeProducts } = require('./scraper');

const app = express();
const port = 3000;

app.use(cors()); // Allow CORS for the frontend

app.get('/api/products', async (req, res) => {
  const searchTerm = req.query.searchTerm;
  try {
    const products = await scrapeProducts(searchTerm);
    res.json(products);
  } catch (error) {
    console.error('Error scraping products:', error);
    res.status(500).json({ error: 'Failed to fetch products. Please try again.' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
