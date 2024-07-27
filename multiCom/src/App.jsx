import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ProductList from './assets/ProductList.jsx';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Amazon Product Scraper</h1>
      </header>
      <ProductList />
    </div>
  );
}

export default App;