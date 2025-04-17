import React, { useState, useEffect } from 'react';
import './App.css'
import BookCard from './components/BookCard';


function App() {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
      // Fetch the JSON from the public directory
      fetch('/books.json')
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          setBooks(data);
          setLoading(false);
        })
        .catch(error => {
          console.error("Failed to load books:", error);
          setError("Failed to load books. Please try again later.");
          setLoading(false);
        });
    }, []);  

  const displayedBooks = books.slice(0, 20);
  
  if (loading) return <div className="container mt-5"><p>Loading books...</p></div>;
  if (error) return <div className="container mt-5"><p className="text-danger">{error}</p></div>;

  return (
    <div className="container-fluid py-4">
      <div className="row">
        <div className="col-12">
          <h2 className="mb-4">Books</h2>
          <div className="row row-cols-1 row-cols-md-3 g-4">
            {displayedBooks.map((book, index) => (
              <div className="col" key={index}>
                <BookCard book={book} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App
