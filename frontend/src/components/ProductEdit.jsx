import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function ProductEdit() {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: ""
  });

  const { id } = useParams();

  // Fetch product details
  const fetchProductById = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/v1/products/${id}`);
      setProduct(response.data);
    } catch (error) {
      console.error("Failed to fetch product:", error);
    }
  };

  useEffect(() => {
    fetchProductById();
  }, [id]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3000/api/v1/products/${id}`, product);
      alert("Product edited successfully!");
    } catch (error) {
      console.error("Failed to update product:", error);
      alert("Error editing product");
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Edit Product</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '400px' }}>
        <input
          type="text"
          name="name"
          value={product.name}
          onChange={handleChange}
          placeholder="Product Name"
          required
        />
        <textarea
          name="description"
          value={product.description}
          onChange={handleChange}
          placeholder="Product Description"
          required
        />
        <input
          type="number"
          name="price"
          value={product.price}
          onChange={handleChange}
          placeholder="Price"
          required
        />
        <button type="submit">Edit Now</button>
      </form>
    </div>
  );
}

export default ProductEdit;
