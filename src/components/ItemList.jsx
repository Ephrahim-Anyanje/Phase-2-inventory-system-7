import React, { useState } from "react";

function ItemList({ items, onDelete, onSave }) {
  const [editingId, setEditingId] = useState(null);
  const [editedItem, setEditedItem] = useState({});

  function handleEdit(item) {
    setEditingId(item.id);
    setEditedItem({ ...item });
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setEditedItem({ ...editedItem, [name]: value });
  }

  function handleSaveClick() {
    onSave(editingId, editedItem);
    setEditingId(null);
  }

  return (
    <div>
      <h2>Inventory Items</h2>
      {items.length === 0 ? (
        <p>No items yet. Add one above!</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Quantity</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td>
                  {editingId === item.id ? (
                    <input
                      type="text"
                      name="name"
                      value={editedItem.name || ""}
                      onChange={handleChange}
                    />
                  ) : (
                    item.name
                  )}
                </td>
                <td>
                  {editingId === item.id ? (
                    <input
                      type="text"
                      name="category"
                      value={editedItem.category || ""}
                      onChange={handleChange}
                    />
                  ) : (
                    item.category
                  )}
                </td>
                <td>
                  {editingId === item.id ? (
                    <input
                      type="number"
                      name="quantity"
                      value={editedItem.quantity || ""}
                      onChange={handleChange}
                    />
                  ) : (
                    item.quantity
                  )}
                </td>
                <td>
                  {editingId === item.id ? (
                    <>
                      <button onClick={handleSaveClick}>Save</button>
                      <button onClick={() => setEditingId(null)}>Cancel</button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => handleEdit(item)}>Edit</button>
                      <button onClick={() => onDelete(item.id)}>Delete</button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ItemList;
