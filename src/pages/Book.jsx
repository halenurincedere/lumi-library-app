import React, { useEffect, useState, useRef } from "react";
import axiosInstance from "../api/axiosInstance";
import BookForm from "../components/BookForm";
import BookTable from "../components/BookTable";
import "../styles/Book.css";
import "../styles/BookForm.css";
import "../styles/BookTable.css";
import "../styles/GlassBox.css";

import bookImage from "../assets/images/Authors.png";

const Book = () => {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [loading, setLoading] = useState(false);

  // Ref to scroll to the form when a book is selected for editing
  const formRef = useRef(null);

  // Fetch books from backend
  const fetchBooks = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get("/books");
      setBooks(response.data);
    } catch (error) {
      console.error("Error fetching books:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch books on component mount
  useEffect(() => {
    fetchBooks();
  }, []);

  // Scroll to the form when a book is selected for edit
  const handleSelectForEdit = (book) => {
    setSelectedBook(book);
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  return (
    <div className="book-page-container">
      {/* Centered heading */}
      <div className="centered-heading">
        <h2 className="book-title">Explore Our Library</h2>
        <p className="book-subtitle">
          Discover the timeless stories and literary treasures.
        </p>
      </div>

      {loading && <p className="loading">Loading books...</p>}

      {/* Book form with ref for scrolling */}
      <div ref={formRef}>
        <BookForm
          fetchBooks={fetchBooks}
          selectedBook={selectedBook}
          setSelectedBook={setSelectedBook}
        />
      </div>

      {/* Book list table */}
      <BookTable
        books={books}
        fetchBooks={fetchBooks}
        setSelectedBook={handleSelectForEdit}
      />

      {/* Background image fixed near footer */}
      <img src={bookImage} alt="Books" className="book-background" />
    </div>
  );
};

export default Book;