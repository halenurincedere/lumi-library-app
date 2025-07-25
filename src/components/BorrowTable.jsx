import React from "react";
import axiosInstance from "../api/axiosInstance";
import { toast } from "react-toastify";
import "../styles/BorrowTable.css";

const BorrowTable = ({ borrows, fetchBorrows, setSelectedBorrow }) => {
  const formatDate = (dateStr) => {
    if (!dateStr) return "Not Returned";
    const date = new Date(dateStr);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this borrow record?"))
      return;

    try {
      await axiosInstance.delete(`/borrows/${id}`);
      toast.success("Borrow record deleted successfully!");
      fetchBorrows();
    } catch (error) {
      toast.error(`Delete failed: ${error.response?.data || error.message}`);
    }
  };

  return (
    <table className="borrow-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Book Name</th>
          <th>Borrower Name</th>
          <th>Borrower Email</th>
          <th>Borrowing Date</th>
          <th>Return Date</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {Array.isArray(borrows) && borrows.length > 0 ? (
          borrows.map((borrow) => (
            <tr key={borrow.id}>
              <td>{borrow.id}</td>
              <td>{borrow.book?.name || "-"}</td>
              <td>{borrow.borrowerName}</td>
              <td>{borrow.borrowerMail}</td>
              <td>{formatDate(borrow.borrowingDate)}</td>
              <td>{formatDate(borrow.returnDate)}</td>
              <td>
                <button onClick={() => setSelectedBorrow(borrow)}>Edit</button>
                <button
                  onClick={() => handleDelete(borrow.id)}
                  className="delete-btn"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="7" style={{ textAlign: "center" }}>
              No borrow records available.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default BorrowTable;