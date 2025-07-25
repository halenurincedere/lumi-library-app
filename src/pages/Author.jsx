import React, { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import AuthorForm from "../components/AuthorForm";
import AuthorTable from "../components/AuthorTable";
import "../styles/AuthorForm.css";
import "../styles/AuthorTable.css";
import "../styles/GlassBox.css";
import "../styles/Author.css";

import authorImage from "../assets/images/authors.png";

const Author = () => {
  const [authors, setAuthors] = useState([]);
  const [selectedAuthor, setSelectedAuthor] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch authors from backend
  const fetchAuthors = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get("/authors");
      setAuthors(response.data);
    } catch (error) {
      console.error("Error fetching authors:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch authors on component mount
  useEffect(() => {
    fetchAuthors();
  }, []);

  return (
    <div className="author-page-container">
      {/* Centered heading box */}
      <div className="centered-heading">
        <h2 className="author-title">Our Beloved Authors</h2>
        <p className="author-subtitle">
          Discover the minds behind the greatest stories ever written.
        </p>
      </div>

      {loading && <p className="loading">Loading authors...</p>}

      <AuthorForm
        fetchAuthors={fetchAuthors}
        selectedAuthor={selectedAuthor}
        setSelectedAuthor={setSelectedAuthor}
      />

      <AuthorTable
        authors={authors}
        fetchAuthors={fetchAuthors}
        setSelectedAuthor={setSelectedAuthor}
      />

      {/* Background image fixed near footer */}
      <img src={authorImage} alt="Famous Authors" className="author-background" />
    </div>
  );
};

export default Author;