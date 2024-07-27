import React, { useState } from 'react';
import axios from 'axios';

const ProductList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/scrape?search=${searchTerm}`);
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search for a product"
      />
      <button onClick={handleSearch}>Search</button>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <div className="product-list">
      <button class="button-64" onClick={handleSearch}>Search</button>
      <ul>
        {products.map((product, index) => (
          <li key={index}>
            <a href={product.link} target="_blank" rel="noopener noreferrer">
              {product.title} - ${product.price}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
