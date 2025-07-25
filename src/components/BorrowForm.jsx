import React, { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import { toast } from "react-toastify";
import "../styles/BorrowForm.css";
import "../styles/BorrowTable.css";

const BorrowForm = ({ fetchBorrows, selectedBorrow, setSelectedBorrow }) => {
  // Evaluation Form 7: State management for form inputs
  const [borrowerName, setBorrowerName] = useState("");
  const [borrowerMail, setBorrowerMail] = useState("");
  const [borrowingDate, setBorrowingDate] = useState("");
  const [returnDate, setReturnDate] = useState(""); // New: State for return date
  const [bookId, setBookId] = useState(""); // Book ID to be selected by the user
  const [bookList, setBookList] = useState([]); // Holds the list of books

  // Evaluation Form 13: Fetch books from the backend
  const fetchBooks = async () => {
    try {
      const response = await axiosInstance.get("/books");
      setBookList(response.data);
    } catch (error) {
      console.error("Error fetching books:", error);
      toast.error("Books could not be loaded.");
    }
  };

  // Evaluation Form 8: useEffect usage
  useEffect(() => {
    fetchBooks(); // Fetch book list when the page first loads

    if (selectedBorrow) {
      // Transfer existing data to inputs for editing
      setBorrowerName(selectedBorrow.borrowerName || "");
      setBorrowerMail(selectedBorrow.borrowerMail || "");
      // Adjust LocalDate format to 'YYYY-MM-DD'
      setBorrowingDate(selectedBorrow.borrowingDate ? new Date(selectedBorrow.borrowingDate).toISOString().split('T')[0] : "");
      setReturnDate(selectedBorrow.returnDate ? new Date(selectedBorrow.returnDate).toISOString().split('T')[0] : ""); // New
      setBookId(selectedBorrow.book?.id?.toString() || ""); // Get ID from book object
    } else {
      // Form is reset
      setBorrowerName("");
      setBorrowerMail("");
      setBorrowingDate("");
      setReturnDate(""); // New
      setBookId("");
    }
  }, [selectedBorrow]);

  // Evaluation Form 11: Required field validation
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !borrowerName.trim() ||
      !borrowerMail.trim() ||
      !borrowingDate.trim() ||
      !bookId
    ) {
      toast.warn("Please fill in all required fields.");
      return;
    }

    try {
      if (selectedBorrow) {
        // Payload for PUT operation (consistent with BookBorrowingUpdateRequest)
        const updatePayload = {
          borrowerName,
          borrowingDate,
          returnDate: returnDate || null // Send null if return date is empty
        };
        await axiosInstance.put(`/borrows/${selectedBorrow.id}`, updatePayload); // Endpoint corrected: /borrows
        toast.success("Borrow record updated successfully!");
      } else {
        // Payload for POST operation (consistent with BookBorrowingRequest)
        const selectedBookDetails = bookList.find(book => book.id === parseInt(bookId));
        if (!selectedBookDetails) {
            toast.error("Invalid book selection. Please select a book from the list.");
            return;
        }

        const createPayload = {
          borrowerName,
          borrowerMail,
          borrowingDate,
          bookForBorrowingRequest: {
            id: selectedBookDetails.id,
            name: selectedBookDetails.name,
            publicationYear: selectedBookDetails.publicationYear,
            stock: selectedBookDetails.stock,
          },
        };
        await axiosInstance.post("/borrows", createPayload); // Endpoint corrected: /borrows
        toast.success("New borrow record added successfully!");
      }

      // Form is reset
      setBorrowerName("");
      setBorrowerMail("");
      setBorrowingDate("");
      setReturnDate(""); // New
      setBookId("");
      setSelectedBorrow(null);
      fetchBorrows(); // Update the list
      fetchBooks(); // Also update the book list as book stocks might have changed
    } catch (error) {
      console.error("Borrow operation error:", error);
      // To display the error message from the backend
      toast.error(`An error occurred during the operation: ${error.response?.data || error.message}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="borrow-form">
      {/* Borrower Name input */}
      <input
        type="text"
        placeholder="Borrower Name"
        value={borrowerName}
        onChange={(e) => setBorrowerName(e.target.value)}
        required
      />

      {/* Borrower Email input */}
      <input
        type="email"
        placeholder="Borrower Email"
        value={borrowerMail}
        onChange={(e) => setBorrowerMail(e.target.value)}
        required
      />

      {/* Borrowing Date input */}
      <input
        type="date"
        placeholder="Borrowing Date"
        value={borrowingDate}
        onChange={(e) => setBorrowingDate(e.target.value)}
        required
      />

      {/* Return Date input (New) - may only be required for updates */}
      {selectedBorrow && ( // Show only in update mode
        <input
          type="date"
          placeholder="Return Date (Optional)"
          value={returnDate}
          onChange={(e) => setReturnDate(e.target.value)}
        />
      )}

      {/* Book Select List */}
      <select
        value={bookId}
        onChange={(e) => setBookId(e.target.value)}
        required
        // Prevent changing the book during borrow update
        disabled={!!selectedBorrow}
      >
        <option value="">Select a Book</option>
        {bookList.map((book) => (
          <option key={book.id} value={book.id}>
            {book.name} (Stock: {book.stock})
          </option>
        ))}
      </select>

      {/* Submit Button */}
      <button type="submit">
        {selectedBorrow ? "Update" : "Add"} Borrow
      </button>
    </form>
  );
};

export default BorrowForm;