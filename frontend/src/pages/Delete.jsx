import React from "react";
import axios from "axios";

export default function DeleteAllButton() {
  const handleDeleteAll = async () => {
    if (window.confirm("Are you sure you want to delete all documents?")) {
      try {
        await axios.delete("http://localhost:8080/delete-all");
        alert("All documents deleted successfully");
      } catch (err) {
        console.error("Error deleting documents:", err);
        alert("Failed to delete documents");
      }
    }
  };

  return (
    <button
      onClick={handleDeleteAll}
      style={{
        padding: "10px 20px",
        backgroundColor: "red",
        color: "white",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
      }}
    >
      Delete All
    </button>
  );
}
