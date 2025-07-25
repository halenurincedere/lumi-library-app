import React, { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import { toast } from "react-toastify";
import Select from 'react-select';
import "../styles/BookForm.css";

const BookForm = ({ fetchBooks, selectedBook, setSelectedBook }) => {
  // State declarations for form inputs and dropdown options
  const [name, setName] = useState("");
  const [publicationYear, setPublicationYear] = useState("");
  const [stock, setStock] = useState("");
  const [authorId, setAuthorId] = useState("");
  const [publisherId, setPublisherId] = useState("");
  const [authors, setAuthors] = useState([]);
  const [publishers, setPublishers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  // Fetch dropdown data and set form values when selectedBook changes
  useEffect(() => {
    const fetchDropdowns = async () => {
      try {
        const [authorRes, publisherRes, categoryRes] = await Promise.all([
          axiosInstance.get("/authors"),
          axiosInstance.get("/publishers"),
          axiosInstance.get("/categories")
        ]);

        setAuthors(authorRes.data);
        setPublishers(publisherRes.data);

        // Format categories for react-select component
        const formattedCategories = categoryRes.data.map(cat => ({ value: cat.id, label: cat.name }));
        setCategories(formattedCategories);
      } catch (error) {
        console.error("Error fetching dropdown data:", error);
        toast.error(`Failed to load dropdown data: ${error.message}`);
      }
    };

    fetchDropdowns();

    if (selectedBook) {
      // Pre-fill form fields with selected book data
      setName(selectedBook.name || "");
      setPublicationYear(selectedBook.publicationYear || "");
      setStock(selectedBook.stock || "");
      setAuthorId(selectedBook.author?.id?.toString() || "");
      setPublisherId(selectedBook.publisher?.id?.toString() || "");
      setSelectedCategories(selectedBook.categories?.map(cat => ({ value: cat.id, label: cat.name })) || []);
    } else {
      // Reset form fields for new book entry
      setName("");
      setPublicationYear("");
      setStock("");
      setAuthorId("");
      setPublisherId("");
      setSelectedCategories([]);
    }
  }, [selectedBook]);

  // Validate the publication year to be between 1500 and current year
  const isValidYear = (year) => {
    const currentYear = new Date().getFullYear();
    const numYear = parseInt(year, 10);
    return !isNaN(numYear) && numYear >= 1500 && numYear <= currentYear;
  };

  // Handle changes in react-select multi-category dropdown
  const handleCategoryChange = (selectedOptions) => {
    setSelectedCategories(selectedOptions);
  };

  // Handle form submission for adding or updating a book
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation for required fields
    if (!name.trim() || !publicationYear || !stock || !authorId || !publisherId || selectedCategories.length === 0) {
      toast.warn("Please fill in all required fields, including selecting at least one category.");
      return;
    }

    // Validate publication year range
    if (!isValidYear(publicationYear)) {
      toast.warn(`Publication year must be between 1500 and ${new Date().getFullYear()}.`);
      return;
    }

    // Validate stock value
    const parsedStock = parseInt(stock);
    if (isNaN(parsedStock) || parsedStock < 0) {
      toast.warn("Stock must be a valid non-negative number.");
      return;
    }

    // Prepare book data payload
    const bookData = {
      name: name.trim(),
      publicationYear: parseInt(publicationYear),
      stock: parsedStock,
      author: { id: parseInt(authorId) },
      publisher: { id: parseInt(publisherId) },
      categories: selectedCategories.map(cat => ({ id: cat.value })),
    };

    try {
      if (selectedBook) {
        // Update existing book record
        await axiosInstance.put(`/books/${selectedBook.id}`, bookData);
        toast.success("Book updated successfully!");
      } else {
        // Create new book record
        await axiosInstance.post("/books", bookData);
        toast.success("Book added successfully!");
      }

      // Reset form after successful submission
      setName("");
      setPublicationYear("");
      setStock("");
      setAuthorId("");
      setPublisherId("");
      setSelectedCategories([]);
      setSelectedBook(null);
      fetchBooks(); // Refresh list
    } catch (error) {
      console.error("Book operation error:", error);
      toast.error(`An error occurred during the operation: ${error.response?.data || error.message}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="book-form">
      <input
        type="text"
        placeholder="Book Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      <input
        type="number"
        placeholder="Publication Year"
        value={publicationYear}
        onChange={(e) => setPublicationYear(e.target.value)}
        required
        min="1500"
        max={new Date().getFullYear()}
      />

      <input
        type="number"
        placeholder="Stock"
        value={stock}
        onChange={(e) => setStock(e.target.value)}
        required
        min="0"
      />

      <select
        value={authorId}
        onChange={(e) => setAuthorId(e.target.value)}
        required
      >
        <option value="">Select Author</option>
        {authors.map((author) => (
          <option key={author.id} value={author.id}>
            {author.name}
          </option>
        ))}
      </select>

      <select
        value={publisherId}
        onChange={(e) => setPublisherId(e.target.value)}
        required
      >
        <option value="">Select Publisher</option>
        {publishers.map((publisher) => (
          <option key={publisher.id} value={publisher.id}>
            {publisher.name}
          </option>
        ))}
      </select>

      {categories.length > 0 ? (
        <Select
          isMulti
          name="categories"
          options={categories}
          className="basic-multi-select"
          classNamePrefix="select"
          value={selectedCategories}
          onChange={handleCategoryChange}
          placeholder="Select Categories"
        />
      ) : (
        <div className="book-form-placeholder-select">Loading Categories...</div>
      )}

      <button type="submit">
        {selectedBook ? "Update Book" : "Add Book"}
      </button>
    </form>
  );
};

export default BookForm;