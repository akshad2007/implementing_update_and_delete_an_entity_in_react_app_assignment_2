import React, { useState, useEffect } from "react";

const API_URI = "https://your-api-endpoint.com/items"; // Replace with actual API

const ItemList = () => {
  const [items, setItems] = useState([]);

  // Fetch list items when the component mounts
  useEffect(() => {
    fetch(API_URI)
      .then((response) => response.json())
      .then((data) => setItems(data))
      .catch((error) => console.error("Error fetching items:", error));
  }, []);

  // Delete an item from the server
  const handleDelete = (id) => {
    fetch(`${API_URI}/${id}`, { method: "DELETE" })
      .then((response) => {
        if (response.ok) {
          // Update state to remove deleted item
          setItems(items.filter((item) => item.id !== id));
        } else {
          console.error("Failed to delete item");
        }
      })
      .catch((error) => console.error("Error deleting item:", error));
  };

  return (
    <div>
      <h2>Item List</h2>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.name}
            <button onClick={() => handleDelete(item.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ItemList;
