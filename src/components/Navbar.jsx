// src/components/Navbar.jsx
// This component renders the navigation bar with links and highlights the active route using React Router and Framer Motion for animation

import React from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import "../styles/Navbar.css";

const Navbar = () => {
  // Get the current location to determine active link
  const location = useLocation();

  return (
    <motion.nav
      className="navbar"
      initial={{ y: -40, opacity: 0 }}  // Animation initial state: slide down and fade in
      animate={{ y: 0, opacity: 1 }}    // Animation final state: normal position and fully visible
      transition={{ duration: 0.6 }}    // Animation duration
    >
      {/* Brand / Logo */}
      <div className="navbar-brand">LibraryApp</div>

      {/* Navigation links */}
      <ul className="navbar-links">
        <li className={location.pathname === "/" ? "active" : ""}>
          <Link to="/">Home</Link>
        </li>
        <li className={location.pathname === "/authors" ? "active" : ""}>
          <Link to="/authors">Authors</Link>
        </li>
        <li className={location.pathname === "/books" ? "active" : ""}>
          <Link to="/books">Books</Link>
        </li>
        <li className={location.pathname === "/borrowings" ? "active" : ""}>
          <Link to="/borrowings">Borrow</Link>
        </li>
        <li className={location.pathname === "/categories" ? "active" : ""}>
          <Link to="/categories">Categories</Link>
        </li>
        <li className={location.pathname === "/publishers" ? "active" : ""}>
          <Link to="/publishers">Publishers</Link>
        </li>
      </ul>
    </motion.nav>
  );
};

export default Navbar;