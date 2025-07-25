import React from "react";
import axiosInstance from "../api/axiosInstance";
import { toast } from "react-toastify";
import "../styles/AuthorTable.css";

const AuthorTable = ({ authors, fetchAuthors, setSelectedAuthor }) => {
  // Handle author deletion
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this author?")) return;

    try {
      await axiosInstance.delete(`/authors/${id}`);
      toast.success("Author deleted successfully!");
      fetchAuthors(); // Refresh the author list after deletion
    } catch (error) {
      console.error("Error deleting author:", error);
      toast.error("An error occurred during deletion.");
    }
  };

  return (
    <table className="author-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Birth Date</th>
          <th>Country</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {authors.map((author) => (
          <tr key={author.id}>
            <td>{author.id}</td>
            <td>{author.name}</td>
            <td>{author.birthDate}</td>
            <td>{author.country}</td>
            <td>
              <button onClick={() => setSelectedAuthor(author)}>Edit</button>
              <button
                onClick={() => handleDelete(author.id)}
                className="delete-btn"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default AuthorTable;