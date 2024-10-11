import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BusquedaProductos from './components/BusquedaProductos';
import DetalleProductos from './components/DetalleProductos';
import Carrito from './components/Carrito';
import Header from './components/Header';
import React, { useState } from 'react';
import './App.css';

function App() {
  const [cart, setCart] = useState([]);
  const addToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
  };
const removeFromCart = (indexToRemove) => {
  setCart((prevCart) => prevCart.filter((_, index) => index !== indexToRemove));
};

  return (
    <Router>
      <Header cartCount={cart.length} /> 
      <Routes>
        <Route path="/" element={<BusquedaProductos />} />
        <Route path="/product/:id" element={<DetalleProductos addToCart={addToCart} />} />
        <Route path="/cart" element={<Carrito cart={cart} removeFromCart={removeFromCart} />} />
      </Routes>
    </Router>
  );
}

export default App;
