import React, { useState, useEffect } from "react";
import AddItemForm from "./components/AddItemForm";
import ItemList from "./components/ItemList";
import handleEditItem from "./components/SaveButton";

function App() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch items from JSON Server
  useEffect(() => {
    fetch("http://localhost:3001/items")
      .then((r) => {
        if (!r.ok) throw new Error("Failed to fetch items");
        return r.json();
      })
      .then((data) => {
        setItems(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Could not load items");
      });
  }, []);

  // Add new item
  function handleAddItem(newItem) {
    fetch("http://localhost:3001/items", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newItem),
    })
      .then((r) => r.json())
      .then((addedItem) => setItems([...items, addedItem]))
      .catch((err) => console.error("Error adding item:", err));
  }

  // Delete item
  function handleDeleteItem(id) {
    fetch(`http://localhost:3001/items/${id}`, { method: "DELETE" })
      .then(() => setItems(items.filter((item) => item.id !== id)))
      .catch((err) => console.error("Error deleting item:", err));
  }

  // Edit/Save item (uses the fixed SaveButton function)
  function handleSaveItem(id, updatedFields) {
    handleEditItem(id, updatedFields, setItems);
  }

  if (loading) return <p>Loading items...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="App" style={{ padding: "20px" }}>
      <h1>Inventory System</h1>
      <AddItemForm onAddItem={handleAddItem} />
      <ItemList
        items={items}
        onDelete={handleDeleteItem}
        onSave={handleSaveItem}
      />
    </div>
  );
}

export default App;
