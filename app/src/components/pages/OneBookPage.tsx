import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../redux/hooks';

export default function BookPage(): JSX.Element {
  const selectedBook = useAppSelector((store) => store.books.selectedBook);
  const navigate = useNavigate()

  const navigateToSearchResults = (): void => {
    navigate('/');
  };

  return (
    <>
      {selectedBook ? (
        <div className="oneBookContainer">
          <div className="oneBookImage">
            {selectedBook.volumeInfo?.imageLinks ? (
              <img
                src={
                  selectedBook.volumeInfo.imageLinks.thumbnail ||
                  selectedBook.volumeInfo.imageLinks.smallThumbnail
                }
                alt={selectedBook.volumeInfo.title}
                className="oneBookCover"
              />
            ) : (
              <div className="oneBookCover">no image</div>
            )}
          </div>
          <div className="oneBookDetails">
            <div className="oneBookCategory">
              {selectedBook.volumeInfo?.categories
                ? selectedBook.volumeInfo.categories.join('/')
                : 'unknown category'}
            </div>
            <div className="oneBookTitle">{selectedBook.volumeInfo?.title}</div>
            <div className="oneBookAuthors">
              {selectedBook.volumeInfo?.authors
                ? selectedBook.volumeInfo.authors.join(`\n`)
                : 'unknown authors'}
            </div>
            <div className="oneBookDescription">
              {selectedBook.volumeInfo?.description
                ? selectedBook.volumeInfo.description
                : 'no description'}
            </div>
          </div>
        </div>
      ) : (
        <div>this book is not found</div>
      )}
      <button type="button" className="button" onClick={navigateToSearchResults}>
        Back to search results
      </button>
    </>
  );
}
