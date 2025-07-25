import React, { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import BorrowForm from "../components/BorrowForm";
import BorrowTable from "../components/BorrowTable";
import "../styles/BorrowForm.css";
import "../styles/BorrowTable.css";
import "../styles/GlassBox.css";
import "../styles/Borrow.css";
import borrowImage from "../assets/images/authors.png"; // Borrow sayfası için uygun görsel

const Borrow = () => {
  const [borrows, setBorrows] = useState([]); // Ödünç kayıtları listesi
  const [selectedBorrow, setSelectedBorrow] = useState(null); // Düzenlenen kayıt
  const [loading, setLoading] = useState(false); // Yükleme durumu

  // Backend’den ödünç kayıtlarını çek
  const fetchBorrows = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get("/borrows");
      setBorrows(response.data);
    } catch (error) {
      console.error("Error fetching borrow records:", error);
    } finally {
      setLoading(false);
    }
  };

  // Sayfa yüklendiğinde kayıtları çek
  useEffect(() => {
    fetchBorrows();
  }, []);

  // Seçilen kayıt veya liste güncellendiğinde debug amaçlı loglar (opsiyonel)
  useEffect(() => {
    console.log("Current borrows:", borrows);
  }, [borrows]);

  useEffect(() => {
    console.log("Selected borrow:", selectedBorrow);
  }, [selectedBorrow]);

  return (
    <div className="borrow-page">
      {/* Başlık ve alt başlık */}
      <div className="centered-heading">
        <h2 className="author-title">Borrow</h2>
        <p className="author-subtitle">
          Manage the borrowing records of your readers with ease and elegance.
        </p>
      </div>

      {/* Yükleniyor mesajı */}
      {loading && <p className="loading">Loading borrow records...</p>}

      {/* Ödünç formu */}
      <BorrowForm
        fetchBorrows={fetchBorrows}
        selectedBorrow={selectedBorrow}
        setSelectedBorrow={setSelectedBorrow}
      />

      {/* Ödünç kayıtları tablosu */}
      <BorrowTable
        borrows={borrows}
        fetchBorrows={fetchBorrows}
        setSelectedBorrow={setSelectedBorrow}
      />

      {/* Sayfanın altındaki sabit arka plan görseli */}
      <img
        src={borrowImage}
        alt="Borrow Illustration"
        className="borrow-background"
      />
    </div>
  );
};

export default Borrow;