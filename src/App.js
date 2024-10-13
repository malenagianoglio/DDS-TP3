import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BusquedaProductos from './components/BusquedaProductos';
import DetalleProductos from './components/DetalleProductos';
import Carrito from './components/Carrito';
import Header from './components/Header';
import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [cart, setCart] = useState(() => {
    const storedCart = localStorage.getItem('carrito');
    return storedCart ? JSON.parse(storedCart) : [];
  });

  const addToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  const removeFromCart = (indexToRemove) => {
    setCart((prevCart) => prevCart.filter((_, index) => index !== indexToRemove));
  };

  useEffect(() => {
    localStorage.setItem('carrito', JSON.stringify(cart));
  }, [cart]);

  return (
    <Router>
      <Header cartCount={cart.length} /> 
      <Routes>
        <Route path="/" element={<BusquedaProductos addToCart={addToCart} />} />
        <Route path="/product/:id" element={<DetalleProductos addToCart={addToCart} />} />
        <Route 
          path="/cart" 
          element={<Carrito cart={cart} setCart={setCart} removeFromCart={removeFromCart} />} 
        />
      </Routes>
    </Router>
  );
}

export default App;
