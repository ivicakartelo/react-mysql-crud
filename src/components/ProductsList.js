export default function ProductsList({ products, setProducts }) {
  console.log(products);
  
  const updateProduct = async (product) => {
    const newTitle = prompt("New title:", product.title);
    const newPrice = prompt("New price:", product.price);

    if (!newTitle || !newPrice) return;

    await fetch(`http://localhost:5000/api/products/${product.id}`, {
      
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: newTitle,
        price: parseFloat(newPrice),
        description: product.description, // keep description same
      }),
    });

    // Update state locally without reloading all
    setProducts(
      products.map((p) =>
        p.id === product.id ? { ...p, title: newTitle, price: parseFloat(newPrice) } : p
      )
    );
  };

  const deleteProduct = async (id) => {
    if (!window.confirm("Delete this product?")) return;

    console.log(id);

    await fetch(`http://localhost:5000/api/products/${id}`, { method: "DELETE" });

    // Remove from local state
    setProducts(products.filter((p) => p.id !== id));
  };

  return (
    <div>
      <h2>Products List</h2>
      <ul>
        {products.map((p) => (
  <li key={p.id}>
    {p.title} - ${Number(p.price).toFixed(2)}{" "}
    <button onClick={() => updateProduct(p)}>Edit</button>{" "}
    <button onClick={() => deleteProduct(p.id)}>Delete</button>
  </li>
      ))}
      </ul>
    </div>
  );
}