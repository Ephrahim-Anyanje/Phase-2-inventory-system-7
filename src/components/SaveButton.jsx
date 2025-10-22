function handleEditItem(id, updatedFields, setItems) {
  return fetch(`http://localhost:3001/items/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedFields),
  })
    .then((r) => {
      if (!r.ok) throw new Error("Failed to update item");
      return r.json();
    })
    .then((updatedItem) => {
      setItems((prev) =>
        prev.map((item) => (item.id === id ? updatedItem : item))
      );
    })
    .catch((err) => console.error("Error updating item:", err));
}

export default handleEditItem;
