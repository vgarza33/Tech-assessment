import React from "react";

function BookCard({ book, isFavorite = false, handleAddToFavorites, handleRemoveFromFavorites, inFavoritesList = false }) {
    return (
      <div className="card h-100 shadow-sm">
        <div className="card-body">
          <p className="text-muted mb-1">{book.author}</p>
          <h5 className="card-title mb-2">{book.title}</h5>
          <p className="text-muted mb-3">{book.pages} pages</p>
          
          <div className="text-center mb-3">
            <img 
              src={`/images/${book.imageLink.split('/').pop()}`} 
              alt={`Cover of ${book.title}`} 
              className="img-fluid" 
              style={{ maxHeight: '200px' }} 
            />
          </div>
          
          <div className="d-flex justify-content-between align-items-center">
            <span className="fw-bold">READ MORE</span>
            {inFavoritesList ? (
              <button 
                className="btn btn-danger rounded-circle p-0 d-flex justify-content-center align-items-center" 
                style={{ width: '30px', height: '30px' }}
                onClick={handleRemoveFromFavorites}
                aria-label="Remove from favorites"
              >
                -
              </button>
            ) : (
              isFavorite ? (
                <button 
                  className="btn btn-danger rounded-circle p-0 d-flex justify-content-center align-items-center" 
                  style={{ width: '30px', height: '30px' }}
                  onClick={handleRemoveFromFavorites}
                  aria-label="Remove from favorites"
                >
                  -
                </button>
              ) : (
                <button 
                  className="btn btn-success rounded-circle p-0 d-flex justify-content-center align-items-center" 
                  style={{ width: '30px', height: '30px' }}
                  onClick={handleAddToFavorites}
                  aria-label="Add to favorites"
                >
                  +
                </button>
              )
            )}
          </div>
        </div>
      </div>
    );
  }
  

export default BookCard;

