<<<<<<< HEAD
import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
=======
import React, { useState, useEffect } from "react";
import AddItemForm from "./components/AddItemForm";
import ItemList from "./components/ItemList";

export default function App() {
  const [items, setItems] = useState([]);

  // Fetch existing items from db.json
  useEffect(() => {
    fetch("http://localhost:3001/items")
      .then((r) => r.json())
      .then((data) => setItems(data))
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  // Function to handle adding a new item
  function handleAddItem(newItem) {
    fetch("http://localhost:3001/items", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newItem),
    })
      .then((r) => r.json())
      .then((addedItem) => setItems([...items, addedItem]));
  }
  const handleDeleteButton = async (id) => {
    try {
      await fetch(`http://localhost:3001/items/${id}`, {
        method: "DELETE",
      });

      // Update local state after delete
      setItems((prev) => prev.filter((items) => items.id !== id));
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };
  // Edit item
  function handleEditItem(id, updatedFields) {
    fetch(`http://localhost:3001/items/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedFields),
    })
      .then((r) => r.json())
      .then((updatedItem) => {
        setItems((prev) =>
          prev.map((item) => (item.id === id ? updatedItem : item))
        );
      })
      .catch((err) => console.error("Error updating item:", err));
  }

  return (
    <div className="App">
      <h1>🧾 Inventory List</h1>

      {/* Pass the function down to the AddItemForm */}
      <AddItemForm onAddItem={handleAddItem} />

      {/* Pass the items to the list component */}
      <ItemList items={items} onDeleteItem={handleDeleteButton} />
    </div>
  );
}
>>>>>>> refs/remotes/origin/main
