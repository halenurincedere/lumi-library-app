// PublisherForm.jsx
// This component manages the form for adding and updating publishers.

import React, { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import { toast } from "react-toastify";
import "../styles/PublisherForm.css";

const PublisherForm = ({ fetchPublishers, selectedPublisher, setSelectedPublisher }) => {
  // State variables for form fields
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [establishmentYear, setEstablishmentYear] = useState("");

  // Effect to populate the form when a publisher is selected, or reset when deselected
  useEffect(() => {
    if (selectedPublisher) {
      setName(selectedPublisher.name || "");
      setAddress(selectedPublisher.address || "");
      setEstablishmentYear(selectedPublisher.establishmentYear || "");
    } else {
      setName("");
      setAddress("");
      setEstablishmentYear("");
    }
  }, [selectedPublisher]);

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    const currentYear = new Date().getFullYear();
    const year = parseInt(establishmentYear, 10);

    // Validate required fields
    if (name.trim() === "" || address.trim() === "" || establishmentYear === "") {
      toast.warn("Please fill in all fields!");
      return;
    }

    // Validate establishment year is within range
    if (isNaN(year) || year < 1500 || year > currentYear) {
      toast.warn(`Please enter a valid year between 1500 and ${currentYear}.`);
      return;
    }

    // Payload matching backend DTO structure
    const payload = {
      name,
      address,
      establishmentYear: year,
    };

    try {
      if (selectedPublisher) {
        // Update existing publisher
        await axiosInstance.put(`/publishers/${selectedPublisher.id}`, payload);
        toast.success("Publisher updated successfully!");
      } else {
        // Add new publisher
        await axiosInstance.post("/publishers", payload);
        toast.success("Publisher added successfully!");
      }

      // Reset form and refresh publisher list
      setName("");
      setAddress("");
      setEstablishmentYear("");
      setSelectedPublisher(null);
      fetchPublishers();
    } catch (error) {
      console.error("Error submitting publisher:", error);
      toast.error("An error occurred while submitting publisher.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="author-form">
      {/* Publisher name input */}
      <input
        type="text"
        placeholder="Publisher name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      {/* Publisher address input */}
      <input
        type="text"
        placeholder="Publisher address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />

      {/* Establishment year input */}
      <input
        type="number"
        placeholder="Establishment Year"
        value={establishmentYear}
        onChange={(e) => setEstablishmentYear(e.target.value)}
      />

      {/* Submit button */}
      <button type="submit">
        {selectedPublisher ? "Update Publisher" : "Add Publisher"}
      </button>
    </form>
  );
};

export default PublisherForm;