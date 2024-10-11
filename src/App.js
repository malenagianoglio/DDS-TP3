import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BusquedaProductos from './components/BusquedaProductos';
import DetalleProductos from './components/DetalleProductos';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<BusquedaProductos />} />
        <Route path="/product/:id" element={<DetalleProductos />} />
      </Routes>
    </Router>
  );
}

export default App;
