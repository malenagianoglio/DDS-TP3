import React from 'react';
import { Link } from 'react-router-dom';

function Carrito({ cart, removeFromCart }) {
  const totalPrice = cart.reduce((total, product) => total + product.price, 0);

  return (
    <div>
      <h1>Carrito de Compras</h1>
      {cart.length === 0 ? (
        <p>Tu carrito está vacío.</p>
      ) : (
        <div>
          <ul>
            {cart.map((product, index) => (
              <li key={index}>
                <img src={product.thumbnail} alt={product.title} />
                <p>{product.title}</p>
                <p>Precio: ${product.price}</p>
                <button onClick={() => removeFromCart(index)}>Eliminar</button>
              </li>
            ))}
          </ul>
          <h3>Total: ${totalPrice}</h3>
        </div>
      )}
      <Link to="/">Volver a la búsqueda</Link>
    </div>
  );
}

export default Carrito;