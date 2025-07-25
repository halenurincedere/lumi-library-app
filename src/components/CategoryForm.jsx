import React, { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import { toast } from "react-toastify";
import "../styles/CategoryForm.css";

const CategoryForm = ({ fetchCategories, selectedCategory, setSelectedCategory }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (selectedCategory) {
      setName(selectedCategory.name || "");
      setDescription(selectedCategory.description || "");
    } else {
      setName("");
      setDescription("");
    }
  }, [selectedCategory]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim() || !description.trim()) {
      toast.warn("Please fill in all fields.");
      return;
    }

    const categoryData = {
      name: name.trim(),
      description: description.trim(),
    };

    try {
      setLoading(true);

      if (selectedCategory) {
        await axiosInstance.put(`/categories/${selectedCategory.id}`, categoryData);
        toast.success("Category updated successfully!");
      } else {
        await axiosInstance.post("/categories", categoryData);
        toast.success("Category added successfully!");
      }

      setName("");
      setDescription("");
      setSelectedCategory(null);
      fetchCategories();
    } catch (error) {
      console.error("Category add/update error:", error);
      const message = error.response?.data?.message || "An error occurred during the operation.";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="category-form">
      <input
        type="text"
        placeholder="Category Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        disabled={loading}
      />
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
        disabled={loading}
      />
      <button type="submit" disabled={loading}>
        {selectedCategory ? "Update" : "Add"} Category
      </button>
    </form>
  );
};

export default CategoryForm;