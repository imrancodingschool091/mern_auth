import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function ProductView() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  const fetchProductById = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/v1/products/${id}`);
      setProduct(response.data);
    } catch (error) {
      console.error('Error fetching product:', error);
      setProduct(null); // In case of error
    }
  };

  useEffect(() => {
    fetchProductById();
  }, [id]);

  return (
    <div>
      <h2>Product View</h2>
      {!product ? (
        <p>No Product found</p>
      ) : (
        <div key={product._id}>
          <h2>{product.name}</h2>
          <h3>{product.description}</h3>
          <h4>₹{product.price}</h4>
        </div>
      )}
    </div>
  );
}

export default ProductView;
