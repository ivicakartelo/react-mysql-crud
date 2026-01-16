import { useState } from "react";

export default function ProductForm({ setProducts, products }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  console.log(products);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description, price: parseFloat(price) }),
      });
      const newProduct = await res.json();

      // Update local state without refetching
      setProducts([...products, { id: newProduct.id, title, description, price: parseFloat(price) }]);

      setTitle("");
      setDescription("");
      setPrice("");
    } catch (err) {
      console.error(err);
      alert("Network error, see console");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
      <h2>Add Product</h2>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        required
      />
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
      />
      <input
        type="number"
        step="0.01"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        placeholder="Price"
        required
      />
      <button type="submit">Create</button>
    </form>
  );
}