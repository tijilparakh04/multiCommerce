
const express = require('express');
const cors = require('cors');
const { scrapeAll } = require('./scraper');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/scrape', async (req, res) => {
  const searchTerm = req.query.search;
  if (!searchTerm) {
    return res.status(400).send('Search term is required');
  }
  try {
    const data = await scrapeAll(searchTerm);
    res.json(data);
  } catch (error) {
    console.error('Error during scraping:', error);
    res.status(500).send('An error occurred while fetching product data. Please try again later.');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
