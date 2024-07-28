import React, { useState } from 'react';
import axios from 'axios';
import './ProductList.css';

const ProductList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get(`http://localhost:3000/scrape?search=${searchTerm}`);
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Failed to fetch products. Please try again.');
    }
    setLoading(false);
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
        {products.map((product, index) => (
          <div className="product-item" key={index}>
            <a href={product.link} target="_blank" rel="noopener noreferrer">
              <img src={product.image} alt={product.title} />
              <p>{product.title}</p>
              <p>₹{product.price}</p>
              <p>Site: {product.platform}</p>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;