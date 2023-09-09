import React from 'react';
import { useNavigate } from 'react-router-dom';
import type { BookApiType } from '../../types/bookTypes';
import { useAppDispatch } from '../../redux/hooks';
import { selectBook } from '../../redux/slices/booksSlice';

export default function BookCard({ book, index }: { book: BookApiType, index: number }): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  
  const selectBookHandler = (): void => {
    dispatch(selectBook(book));
    navigate(`/${book.id}`);
  }

  return (
    <div
      className="bookCard"
      onClick={() => selectBookHandler()}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          selectBookHandler();
        }
      }}
      role="button"
      tabIndex={index + 1}
    >
      {book.volumeInfo?.imageLinks ? (
        <img
          src={book.volumeInfo.imageLinks.thumbnail || book.volumeInfo.imageLinks.smallThumbnail}
          alt={book.volumeInfo.title}
          className="bookCover"
        />
      ) : (
        <div className="bookCover">no image</div>
      )}
      <div className="bookDetails">
        <div className="bookCategory">
          {book.volumeInfo?.categories ? book.volumeInfo.categories[0] : ''}
        </div>
        <div className="bookTitle">{book.volumeInfo?.title}</div>
        <div className="bookAuthors">
          {book.volumeInfo?.authors ? book.volumeInfo.authors.join(', ') : ''}
        </div>
      </div>
    </div>
  );
}
