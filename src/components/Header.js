import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css'; 

function Header({ cartCount }) {
  return (
    <header className="header">
      <h1>Compra Libre</h1>
      <nav className='nav'>
        <Link to="/cart">
          <span>🛒 Carrito ({cartCount})</span>
        </Link>
      </nav>
    </header>
  );
}

export default Header;
