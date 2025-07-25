import React, { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import CategoryForm from "../components/CategoryForm";
import CategoryTable from "../components/CategoryTable";
import "../styles/CategoryForm.css";
import "../styles/CategoryTable.css";
import "../styles/GlassBox.css";
import "../styles/Author.css"; // Consider renaming or creating a specific CSS for category page for clarity
import categoryImage from "../assets/images/authors.png";

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/categories");
      setCategories(response.data);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
      // Optionally add user notification here (toast or alert)
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="author-page-container">
      <div className="centered-heading">
        <h2 className="author-title">Our Precious Categories</h2>
        <p className="author-subtitle">
          Explore the genres that shaped the world of literature.
        </p>
      </div>

      {loading && (
        <div className="spinner-container">
          <p className="loading">Loading categories...</p>
        </div>
      )}

      <CategoryForm
        fetchCategories={fetchCategories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      <CategoryTable
        categories={categories}
        fetchCategories={fetchCategories}
        setSelectedCategory={setSelectedCategory}
      />

      <img
        src={categoryImage}
        alt="Famous Categories"
        className="author-background"
        style={{ userSelect: "none", pointerEvents: "none" }} // prevent accidental interaction with image
      />
    </div>
  );
};

export default Category;