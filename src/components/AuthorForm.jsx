import React, { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import { toast } from "react-toastify";
import "../styles/AuthorForm.css";

const AuthorForm = ({ fetchAuthors, selectedAuthor, setSelectedAuthor }) => {
  // State declarations for form fields
  const [name, setName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [country, setCountry] = useState("");

  // Populate form fields when an author is selected, reset if none
  useEffect(() => {
    if (selectedAuthor) {
      setName(selectedAuthor.name || "");
      setBirthDate(selectedAuthor.birthDate || "");
      setCountry(selectedAuthor.country || "");
    } else {
      setName("");
      setBirthDate("");
      setCountry("");
    }
  }, [selectedAuthor]);

  // Handle form submission for adding or updating an author
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation: Ensure no fields are empty
    if (!name.trim() || !birthDate.trim() || !country.trim()) {
      toast.warn("Please fill in all fields.");
      return;
    }

    // Prepare the data payload to send to the backend
    const authorData = {
      name,
      birthDate,
      country,
    };

    try {
      if (selectedAuthor) {
        // Update existing author
        await axiosInstance.put(`/authors/${selectedAuthor.id}`, authorData);
        toast.success("Author updated successfully!");
      } else {
        // Add new author
        await axiosInstance.post("/authors", authorData);
        toast.success("Author added successfully!");
      }

      // Reset form and refresh authors list
      setName("");
      setBirthDate("");
      setCountry("");
      setSelectedAuthor(null);
      fetchAuthors();
    } catch (error) {
      console.error("Error adding/updating author:", error);
      toast.error("An error occurred during the operation.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="author-form">
      <input
        type="text"
        placeholder="Author Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="date"
        value={birthDate}
        onChange={(e) => setBirthDate(e.target.value)}
      />

      <input
        type="text"
        placeholder="Country"
        value={country}
        onChange={(e) => setCountry(e.target.value)}
      />

      <button type="submit">
        {selectedAuthor ? "Update" : "Add"} Author
      </button>
    </form>
  );
};

export default AuthorForm;