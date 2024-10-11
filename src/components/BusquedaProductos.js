import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

function BusquedaProductos() {
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState([]);

  const handleSearch = async () => {
    const response = await fetch(`https://api.mercadolibre.com/sites/MLA/search?q=${searchTerm}`);
    const data = await response.json();
    setProducts(data.results);
  };

  return (
    <>
    <div className="container mt-3 pl-0 pr-0">
      <div className='input-group mb-3'>
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

    <div>  
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <img src={product.thumbnail} alt={product.title} />
            <p>{product.title}</p>
            <p>${product.price}</p>
            <Link to={`/product/${product.id}`}>Ver detalles</Link>
          </li>
        ))}
      </ul>
    </div>
    </>
    
  );
}

export default BusquedaProductos;
