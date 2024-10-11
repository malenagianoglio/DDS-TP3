import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
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
    <div>
      <h1>{product.title}</h1>
       <Carousel>
        {product.pictures.map((picture) => (
          <div key={picture.id}>
            <img src={picture.url} alt={product.title} />
          </div>
        ))}
      </Carousel>
      <p>{product.price}</p>
      <p>{description}</p>
      
      <table border="1">
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
      <button onClick={() => addToCart(product)}>Comprar</button>
      
      <Link to="/">Volver a la búsqueda</Link>
    </div>
  );
}

export default DetalleProductos;
