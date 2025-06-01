import React, { useEffect, useState } from "react";
import axios from "axios";

function Product() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [totalCount,setTotalCount]=useState(null)
  console.log(totalCount);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `http://localhost:3000/api/v1/products?search=${searchQuery}&page=${page}`
      );
      setProducts(res.data.data);
      setTotalCount(res.data.total)
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [searchQuery, page]);

  const handlePrev = () => {
    if (page > 1) setPage((prev) => prev - 1);
  };

  const handleNext = () => {
    
     if (page < totalCount) {
    setPage((prev) => prev + 1);
  }
  
  };

  return (
    <div style={{ padding: "20px" }}>
      <input
        type="text"
        placeholder="Search by name, category or price"
        value={searchQuery}
        onChange={(e) => {
          setSearchQuery(e.target.value);
          setPage(1); // reset to first page on new search
        }}
        style={{
          padding: "10px",
          marginBottom: "20px",
          width: "100%",
          maxWidth: "400px",
          border: "1px solid #ccc",
          borderRadius: "4px",
        }}
      />

      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Product List</h2>

      {loading ? (
        <p style={{ textAlign: "center" }}>Loading products...</p>
      ) : products.length === 0 ? (
        <p style={{ textAlign: "center" }}>No products found.</p>
      ) : (
        <div style={{ overflowX: "auto" }}>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              border: "1px solid #ccc",
            }}
          >
            <thead style={{ backgroundColor: "#f4f4f4" }}>
              <tr>
                <th style={cellStyle}>#</th>
                <th style={cellStyle}>Name</th>
                <th style={cellStyle}>Description</th>
                <th style={cellStyle}>Category</th>
                <th style={cellStyle}>Price</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr key={product._id}>
                  <td style={cellStyle}>{(page - 1) * 10 + index + 1}</td>
                  <td style={cellStyle}>{product.name}</td>
                  <td style={cellStyle}>{product.description}</td>
                  <td style={cellStyle}>{product.category}</td>
                  <td style={cellStyle}>₹{product.price}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div style={{ textAlign: "center", marginTop: "20px" }}>
            <button
              onClick={handlePrev}
              disabled={page === 1}
              style={paginationBtnStyle}
            >
              Prev
            </button>
            <span style={{ margin: "0 10px" }}>Page {page}</span>
            <button onClick={handleNext} style={paginationBtnStyle} disabled={page>=totalCount}>
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

const cellStyle = {
  border: "1px solid #ccc",
  padding: "8px",
  textAlign: "left",
};

const paginationBtnStyle = {
  padding: "8px 16px",
  margin: "0 5px",
  border: "1px solid #888",
  borderRadius: "4px",
  backgroundColor: "#f4f4f4",
  cursor: "pointer",
};

export default Product;
