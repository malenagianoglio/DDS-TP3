import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import '../App.css';

function DetalleProductos({addToCart}) {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [description, setDescription] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await fetch(`https://api.mercadolibre.com/items/${id}`);
      const data = await response.json();
      setProduct(data);

      const descriptionResponse = await fetch(`https://api.mercadolibre.com/items/${id}/description`, {
      });
      const descriptionData = await descriptionResponse.json();
      setDescription(descriptionData.plain_text); 
    };

    fetchProduct();
  }, [id]);

  if (!product) return <div>Loading...</div>;

  return (
    <div className="product-detail-container">
      <h1 className="product-title">{product.title}</h1>
      <div id="productCarousel" className="carousel slide" data-ride="carousel">
        <div className="carousel-inner">
          {product.pictures.map((picture, index) => (
            <div className={`carousel-item ${index === 0 ? 'active' : ''}`} key={picture.id}>
              <img src={picture.url} className="d-block w-100" alt={product.title} />
            </div>
          ))}
        </div>
        <a className="carousel-control-prev" href="#productCarousel" role="button" data-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="sr-only">Previous</span>
        </a>
        <a className="carousel-control-next" href="#productCarousel" role="button" data-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="sr-only">Next</span>
        </a>
      </div>
      <div className="product-info">
        <p className="product-price">${product.price}</p>
        <p className="product-description">{description}</p>
      </div>
      <table className="product-attributes">
        <thead>
          <tr>
            <th>Atributo</th>
            <th>Valor</th>
          </tr>
        </thead>
        <tbody>
          {product.attributes.map((attribute) => (
            <tr key={attribute.id}>
              <td>{attribute.name}</td>
              <td>{attribute.value_name}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="add-to-cart-btn" onClick={() => addToCart(product)}>Agregar al Carrito</button>
      <Link to="/" className="back-btn">Volver a la búsqueda</Link>
    </div>
  );

}

export default DetalleProductos;
