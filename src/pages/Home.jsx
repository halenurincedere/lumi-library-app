import React, { useRef } from "react";
import "../styles/Home.css";
import books from "../data/books";
import writers from "../data/writers";

import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import tolstoy from "../assets/images/tolstoy.png";
import painting1 from "../assets/images/painting1.jpg";
import painting2 from "../assets/images/painting2.jpg";

function Home() {
  // Ref for writers scroll container
  const writerRef = useRef(null);
  // Ref for books scroll container
  const bookRef = useRef(null);

  // Function to scroll left or right by 300px smoothly
  const scroll = (ref, direction) => {
    const { current } = ref;
    const scrollAmount = 300;
    current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <div className="hero-section">
      {/* Header title */}
      <div className="title-box">
        <h1 className="hero-title">
          WELCOME <br /> TO LUMI LIBRARY
        </h1>
      </div>

      {/* Content row with images and text */}
      <div className="content-row">
        {/* Left info box */}
        <div className="info-box left-box">
          <img
            src={painting1}
            alt="Tolstoy Education"
            className="info-image"
            draggable="false"
            onContextMenu={(e) => e.preventDefault()}
          />
          <p className="info-text">
            Known for <em>War and Peace</em> and <em>Anna Karenina</em>, Leo Tolstoy shaped literature
            with his realistic storytelling and deep philosophical insights.
          </p>
        </div>

        {/* Central Tolstoy portrait */}
        <img
          src={tolstoy}
          alt="Tolstoy"
          className="tolstoy-portrait"
          draggable="false"
          onContextMenu={(e) => e.preventDefault()}
        />

        {/* Right info box */}
        <div className="info-box right-box">
          <p className="info-text">
            Tolstoy's thoughts on non-violence and spiritual awakening inspired
            leaders like Gandhi and Martin Luther King Jr., making his work timeless.
          </p>
          <img
            src={painting2}
            alt="Tolstoy Spiritual"
            className="info-image"
            draggable="false"
            onContextMenu={(e) => e.preventDefault()}
          />
        </div>
      </div>

      {/* Popular Writer section */}
      <section className="writer-section">
        <h2 className="section-title">Popular Writer</h2>
        <div className="scroll-container">
          {/* Scroll left button */}
          <button className="scroll-btn left" onClick={() => scroll(writerRef, "left")}>
            <FaChevronLeft />
          </button>

          {/* Writers card row */}
          <div className="card-row scrollable" ref={writerRef}>
            {writers.map((writer, index) => (
              <div className="card" key={index}>
                <img
                  src={writer.image}
                  alt={writer.name}
                  className="card-img"
                  draggable="false"
                  onContextMenu={(e) => e.preventDefault()}
                />
                <p className="card-name">{writer.name}</p>
                <p className="card-meta">★ {writer.rating} · {writer.reviews} m reviews</p>
              </div>
            ))}
          </div>

          {/* Scroll right button */}
          <button className="scroll-btn right" onClick={() => scroll(writerRef, "right")}>
            <FaChevronRight />
          </button>
        </div>
      </section>

      {/* Popular Book section */}
      <section className="book-section">
        <h2 className="section-title">Popular Book</h2>
        <div className="scroll-container">
          {/* Scroll left button */}
          <button className="scroll-btn left" onClick={() => scroll(bookRef, "left")}>
            <FaChevronLeft />
          </button>

          {/* Books card row */}
          <div className="card-row scrollable" ref={bookRef}>
            {books.map((book, index) => (
              <div className="card" key={index}>
                <img
                  src={book.image}
                  alt={book.title}
                  className="card-img"
                  draggable="false"
                  onContextMenu={(e) => e.preventDefault()}
                />
                <p className="card-name">{book.title}</p>
                <p className="card-meta">by {book.author}</p>
                <p className="card-meta">★ {book.rating} · {book.reviews} m reviews</p>
              </div>
            ))}
          </div>

          {/* Scroll right button */}
          <button className="scroll-btn right" onClick={() => scroll(bookRef, "right")}>
            <FaChevronRight />
          </button>
        </div>
      </section>
    </div>
  );
}

export default Home;