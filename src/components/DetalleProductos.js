import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import '../App.css';

function DetalleProductos() {
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
    <div>
      <h1>{product.title}</h1>
      <img src={product.pictures[0]?.url} alt={product.title} />
      <p>{product.price}</p>
      <p>{description}</p>
      <Link to="/">Volver a la búsqueda</Link>
    </div>
  );
}

export default DetalleProductos;
