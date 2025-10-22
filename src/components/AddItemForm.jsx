import React, { useState } from "react";

function AddItemForm({ onAddItem }) {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    quantity: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!formData.name || !formData.category || !formData.quantity) return;
    onAddItem(formData);
    setFormData({ name: "", category: "", quantity: "" });
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add New Item</h2>
      <input
        type="text"
        name="name"
        placeholder="Item name"
        value={formData.name}
        onChange={handleChange}
      />
      <input
        type="text"
        name="category"
        placeholder="Category"
        value={formData.category}
        onChange={handleChange}
      />
      <input
        type="number"
        name="quantity"
        placeholder="Quantity"
        value={formData.quantity}
        onChange={handleChange}
      />
      <button type="submit">Add Item</button>
    </form>
  );
}

export default AddItemForm;
