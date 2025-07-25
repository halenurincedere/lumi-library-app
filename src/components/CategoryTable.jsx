// CategoryTable.jsx
// This component lists categories and handles edit and delete operations
// Evaluation Form 7: Category listing component created

import React from "react";
import axiosInstance from "../api/axiosInstance";
import { toast } from "react-toastify";
import "../styles/CategoryTable.css"; // Specific styling for the table

const CategoryTable = ({ categories, fetchCategories, setSelectedCategory }) => {
  // Evaluation Form 8: Function to delete a category
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this category?")) return;

    try {
      await axiosInstance.delete(`/categories/${id}`);
      toast.success("Category deleted successfully!");
      fetchCategories(); // Refresh the list
    } catch (error) {
      console.error("Error while deleting category:", error);
      toast.error("Failed to delete category.");
    }
  };

  return (
    // Evaluation Form 9: Categories are listed in a table
    <table className="category-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Category Name</th>
          <th>Description</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {/* If category list is not empty, render each category as a row */}
        {Array.isArray(categories) && categories.length > 0 ? (
          categories.map((category) => (
            <tr key={category.id}>
              <td>{category.id}</td>
              <td>{category.name}</td>
              <td>{category.description}</td>
              <td>
                {/* Edit button */}
                <button onClick={() => setSelectedCategory(category)}>
                  Edit
                </button>

                {/* Delete button */}
                <button
                  onClick={() => handleDelete(category.id)}
                  className="delete-btn"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))
        ) : (
          // Show info row when no categories are available
          <tr>
            <td colSpan="4">No categories available.</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default CategoryTable;