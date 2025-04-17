import React, { useState, useEffect } from 'react';
import './App.css'
import BookCard from './components/BookCard';


function App() {
    const [books, setBooks] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
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

  // add a book to favorites  
  const addToFavorites = (book) => {
      const updatedFavorites = [...favorites, book];
      setFavorites(updatedFavorites);
  };

  //remove a book from favorites
  const removeFromFavorites = (book) => {
    const updatedFavorites = favorites.filter(fav => fav.title !== book.title);
    setFavorites(updatedFavorites);
    };
  

//check if book is in favorites to avoid duplicates 
const isBookInFavorites = (book) => {
  return favorites.some(fav => fav.title === book.title);
  // returns true if match is found
};

  const displayedBooks = books.slice(0, 20);
  
  if (loading) return <div className="container mt-5"><p>Loading books...</p></div>;
  if (error) return <div className="container mt-5"><p className="text-danger">{error}</p></div>;

  return (
    <div className="container-fluid py-4">
      <div className="row">
        <div className="col-md-8">
          <h2 className="mb-4">Books</h2>
          <div className="row row-cols-1 row-cols-md-3 g-4">
            {displayedBooks.map((book, index) => (
              <div className="col" key={index}>
                <BookCard 
                book={book} // passing book as a prop to BookCard component
                handleAddToFavorites={() => addToFavorites(book)}
                handleRemoveFromFavorites={() => removeFromFavorites(book)}
                isFavorite={isBookInFavorites(book)}  
                />
              </div>
            ))}
          </div>
        </div>

        <div className="col-md-4 bg-light rounded p-4">
            <h2 className="mb-4 ps-2">Favourites</h2>
            <div className="row row-cols-1 g-4">
              {favorites.map((book, index) => (
                <div className="col" key={index}>
                  <BookCard 
                    book={book} 
                    isFavorite={true}
                    handleRemoveFromFavorites={() => removeFromFavorites(book)}
                    inFavoritesList={true}
                  />
                </div>
              ))}
              {favorites.length === 0 && (
                <div className="col">
                  <p className="text-muted">No favorites yet. Add books by clicking the + button.</p>
                </div>
              )}
            </div>
          </div>      

      </div>
    </div>
  );
}

export default App;
