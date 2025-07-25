import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./components/Footer";

// Pages
import Home from "./pages/Home";
import Publisher from "./pages/Publisher";
import Category from "./pages/Category";
import Author from "./pages/Author";
import Book from "./pages/Book";
import Borrow from "./pages/Borrow";

// Navbar
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="app-container">
      {/* Router for navigation */}
      <Router>
        {/* Navbar displayed on all pages */}
        <Navbar />
        {/* Route configuration */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/publishers" element={<Publisher />} />
          <Route path="/categories" element={<Category />} />
          <Route path="/authors" element={<Author />} />
          <Route path="/books" element={<Book />} />
          <Route path="/borrowings" element={<Borrow />} />
        </Routes>
        {/* Toast notifications container */}
        <ToastContainer />
        {/* Footer displayed on all pages */}
        <Footer />
      </Router>
    </div>
  );
}

export default App;