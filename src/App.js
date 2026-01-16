import { useState, useEffect } from "react";
import ProductsList from "./components/ProductsList";
import ProductForm from "./components/ProductForm";

export default function App() {
  const [products, setProducts] = useState([]); //// single source of truth
  console.log(products);

  useEffect(() => {
    // Load products from server
  const loadProducts = async () => {
    try {
    
      const res = await fetch("http://localhost:5000/api/products");
      const data = await res.json();

      console.log(data);

      setProducts(data);
    
    } catch (err) {
      console.error(err);
    }
  };
    loadProducts();
  }, []);

  
/*
  useEffect(() => {
  const loadProducts = async () => {
    const res = await fetch("http://localhost:5000/api/products");
    const data = await res.json();
    setProducts(data);
  };

  loadProducts();
}, []);

useEffect(() => {
  fetch("http://localhost:5000/api/products")
    .then(res => res.json())
    .then(data => setProducts(data))
    .catch(err => console.error(err));
}, []);

*/

  return (
    <div style={{ padding: "20px" }}>
      <h1>CRUD</h1>

      <ProductForm setProducts={setProducts} products={products} />

      <ProductsList products={products} setProducts={setProducts} />

    </div>
  );
}