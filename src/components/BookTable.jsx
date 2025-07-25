import React from "react";
import axiosInstance from "../api/axiosInstance";
import { toast } from "react-toastify";
import "../styles/BookTable.css"; // Custom styles for book table

const BookTable = ({ books, fetchBooks, setSelectedBook }) => {
  // Function to handle deleting a book record
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this book?")) return;

    try {
      await axiosInstance.delete(`/books/${id}`); // DELETE request
      toast.success("Book deleted successfully!");
      fetchBooks(); // Refresh the book list after deletion
    } catch (error) {
      console.error("Error deleting book:", error);
      toast.error(`Failed to delete book: ${error.response?.data || error.message}`);
    }
  };

  return (
    // Books are displayed in a table format
    <table className="book-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Book Name</th>
          <th>Publication Year</th>
          <th>Stock</th>
          <th>Author</th>
          <th>Publisher</th>
          <th>Categories</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {/* If the books array exists and has items, map each book to a table row */}
        {Array.isArray(books) && books.length > 0 ? (
          books.map((book) => (
            <tr key={book.id}>
              <td>{book.id}</td>
              <td>{book.name}</td>
              <td>{book.publicationYear}</td>
              <td>{book.stock}</td>
              <td>{book.author?.name || "-"}</td> {/* Author name */}
              <td>{book.publisher?.name || "-"}</td> {/* Publisher name */}
              <td>
                {/* Display categories as a comma-separated string */}
                {book.categories && book.categories.length > 0
                  ? book.categories.map((cat) => cat.name).join(", ")
                  : "-"}
              </td>
              <td>
                {/* Edit button */}
                <button
                  onClick={() => setSelectedBook(book)}
                  className="edit-btn"
                >
                  Edit
                </button>
                {/* Delete button */}
                <button
                  onClick={() => handleDelete(book.id)}
                  className="delete-btn"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))
        ) : (
          // Show this row if no books are available
          <tr>
            <td colSpan="8">No books available.</td> {/* Adjusted colSpan to 8 */}
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default BookTable;