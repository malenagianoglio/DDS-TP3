import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

function Carrito({ cart, setCart, removeFromCart }) {
  const totalPrice = cart.reduce((total, product) => total + product.price, 0);

  useEffect(() => {
    localStorage.setItem('carrito', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('carrito'));
    if (storedCart) {
      setCart(storedCart); 
    }
  }, [setCart]);

  return (
    <div className="cart-container">
      <h1>Carrito de Compras</h1>
      {cart.length === 0 ? (
        <p>Tu carrito está vacío.</p>
      ) : (
        <div>
          <ul className="cart-items">
            {cart.map((product, index) => (
              <li className="cart-item" key={index}>
                <img className="cart-item-thumbnail" src={product.thumbnail} alt={product.title} />
                <div className="cart-item-details">
                  <p className="cart-item-title">{product.title}</p>
                  <p className="cart-item-price">Precio: ${product.price}</p>
                </div>
                <button 
                  className="remove-button" 
                  onClick={() => removeFromCart(index)} 
                >
                  Eliminar
                </button>
              </li>
            ))}
          </ul>
          <h3 className="cart-total">Total: ${totalPrice}</h3>
        </div>
      )}
      <Link className="return-link" to="/">Volver a la búsqueda</Link>
    </div>
  );
}

export default Carrito;
