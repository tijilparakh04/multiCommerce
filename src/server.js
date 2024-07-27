const express = require('express');
const cors = require('cors');
const { scrapeAmazon } = require('./scraper');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.get('/scrape', async (req, res) => {
  const searchTerm = req.query.search;
  if (!searchTerm) {
    return res.status(400).send('Search term is required');
  }
  try {
    const data = await scrapeAmazon(searchTerm);
    res.json(data);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
