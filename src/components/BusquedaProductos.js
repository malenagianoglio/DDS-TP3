import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import FiltroCategoria from './FiltroCategoria';

function BusquedaProductos() {
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleSearch = async () => {
    let url = `https://api.mercadolibre.com/sites/MLA/search?q=${searchTerm}`;
    if (selectedCategory) {
      url += `&category=${selectedCategory}`;
    }
    const response = await fetch(url);
    const data = await response.json();
    setProducts(data.results);
  };

  return (
    <>
    <div className="container-busqueda">
      <div className='input-group'>
        <input 
          type="text" 
          className='form-control'
          placeholder="Buscar productos" 
          value={searchTerm} 
          onChange={(e) => setSearchTerm(e.target.value)} 
        />
        <div className='input-group-append'>
        <button className="btn btn-primary" onClick={handleSearch}>Buscar</button>
        </div>
     </div>
    </div>
    <div className='container-categoria'>
      <FiltroCategoria onCategorySelect={setSelectedCategory} />
    </div>
    <div className="product-list">
        {products.map((product) => (
          <div className="product-item" key={product.id}>
            <img src={product.thumbnail} alt={product.title} />
            <div className="product-details">
              <h3>{product.title}</h3>
              <p>${product.price}</p>
            </div>
            <Link to={`/product/${product.id}`} className="view-details-btn">Ver detalles</Link>
          </div>
        ))}
    </div>
    </>
    
  );
}

export default BusquedaProductos;
