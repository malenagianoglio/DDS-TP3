import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function BusquedaProductos() {
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState([]);

  const handleSearch = async () => {
    const response = await fetch(`https://api.mercadolibre.com/sites/MLA/search?q=${searchTerm}`);
    const data = await response.json();
    setProducts(data.results);
  };

  return (
    <div>
      <input 
        type="text" 
        placeholder="Buscar productos" 
        value={searchTerm} 
        onChange={(e) => setSearchTerm(e.target.value)} 
      />
      <button onClick={handleSearch}>Buscar</button>

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
  );
}

export default BusquedaProductos;
