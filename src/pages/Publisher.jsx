// Publisher.jsx
// This component manages publishers: fetching, displaying, editing, and deleting.
// It reuses styling from the Author page for consistency.

import React, { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import PublisherForm from "../components/PublisherForm";
import PublisherTable from "../components/PublisherTable";
import "../styles/PublisherForm.css";
import "../styles/PublisherTable.css";
import "../styles/GlassBox.css";
import "../styles/Author.css"; // Reuse Author page styles for uniform look
import publisherImage from "../assets/images/authors.png";

const Publisher = () => {
  // State for publishers list
  const [publishers, setPublishers] = useState([]);
  // State for the currently selected publisher (for editing)
  const [selectedPublisher, setSelectedPublisher] = useState(null);
  // Loading state to handle fetch UI feedback
  const [loading, setLoading] = useState(false);

  // Fetch all publishers from backend
  const fetchPublishers = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get("/publishers");
      setPublishers(response.data);
    } catch (error) {
      console.error("Failed to fetch publishers data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch publishers on component mount
  useEffect(() => {
    fetchPublishers();
  }, []);

  return (
    <div className="author-page-container">
      {/* Centered heading for the page */}
      <div className="centered-heading">
        <h2 className="author-title">Our Esteemed Publishers</h2>
        <p className="author-subtitle">
          Discover the institutions behind timeless books.
        </p>
      </div>

      {/* Loading indicator */}
      {loading && <p className="loading">Loading publishers...</p>}

      {/* Publisher form for add/edit operations */}
      <PublisherForm
        fetchPublishers={fetchPublishers}
        selectedPublisher={selectedPublisher}
        setSelectedPublisher={setSelectedPublisher}
      />

      {/* Table displaying list of publishers */}
      <PublisherTable
        publishers={publishers}
        fetchPublishers={fetchPublishers}
        setSelectedPublisher={setSelectedPublisher}
      />

      {/* Background image fixed at footer height */}
      <img
        src={publisherImage}
        alt="Famous Publishers"
        className="author-background"
      />
    </div>
  );
};

export default Publisher;