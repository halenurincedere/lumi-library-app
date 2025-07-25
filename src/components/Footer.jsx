// Footer.jsx
// This component renders the footer section with a quote and copyright information

import React from 'react';
import '../styles/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      {/* Inspirational quote by Leo Tolstoy */}
      <p className="footer-quote">
        “All great literature is one of two stories; a man goes on a journey or a stranger comes to town.” — Leo Tolstoy
      </p>

      {/* Copyright and brand name */}
      <p className="footer-text">
        © {new Date().getFullYear()} <span className="lumi-brand">Halenur İncedere</span> · All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;