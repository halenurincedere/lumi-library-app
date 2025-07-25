// PublisherTable.jsx
// This component lists, edits, and deletes publishers.
// Assessment form 7

import React from "react";
import axiosInstance from "../api/axiosInstance";
import { toast } from "react-toastify";
import "../styles/PublisherTable.css";

const PublisherTable = ({ publishers, fetchPublishers, setSelectedPublisher }) => {
  // Assessment form 8
  // Function to handle delete operation
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this publisher?")) return;

    try {
      // Send DELETE request
      await axiosInstance.delete(`/publishers/${id}`);
      toast.success("Publisher deleted successfully!");
      fetchPublishers(); // Refresh the list
    } catch (error) {
      console.error("Error occurred while deleting publisher:", error);
      toast.error("Delete operation failed.");
    }
  };

  // Assessment form 9
  return (
    <table className="publisher-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Address</th>
          <th>Establishment Year</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {publishers.map((publisher) => (
          <tr key={publisher.id}>
            <td>{publisher.id}</td>
            <td>{publisher.name}</td>
            <td>{publisher.address}</td>
            <td>{publisher.establishmentYear}</td>
            <td>
              {/* Edit button */}
              <button onClick={() => setSelectedPublisher(publisher)}>Edit</button>

              {/* Delete button */}
              <button
                onClick={() => handleDelete(publisher.id)}
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

export default PublisherTable;