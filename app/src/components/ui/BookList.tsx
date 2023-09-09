import React from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import BookCard from './BookCard';
import Loader from './Loader';
import { categories, paginationStep } from '../../constants/bookConstants';
import { loadMoreBooksThunk } from '../../redux/slices/booksThunks';

export default function BookList(): JSX.Element {
  const loadedBooks = useAppSelector((store) => store.books.loadedBooks);
  const totalNumber = useAppSelector((store) => store.books.totalNumber);
  const isLoading = useAppSelector((store) => store.books.isLoading);
  const searchValue = useAppSelector((store) => store.books.searchValue);
  const selectedCategory = useAppSelector((store) => store.books.selectedCategory);
  const selectedSortOption = useAppSelector((store) => store.books.selectedSortOption);
  const dispatch = useAppDispatch()

  const loadMoreHandler = (): void => {
    void dispatch(
      loadMoreBooksThunk({
        searchValue,
        category: selectedCategory === categories[0] ? '' : selectedCategory,
        sortOption: selectedSortOption,
        startIndex: loadedBooks.length,
        maxResults: paginationStep,
      }),
    );
  }

  return (
    <div className="bookList">
      {!loadedBooks.length && !isLoading && (
        <div className="text">
          no results
          <br />
          enter / clarify your search parameters
        </div>
      )}
      {!!loadedBooks.length && (
        <>
          <div className="text">Found {totalNumber} results</div>
          <div className="bookCardsContainer">
            {loadedBooks.map((book, index) => (
              <BookCard key={book.id} book={book} index={index} />
            ))}
          </div>
        </>
      )}
      {isLoading && <Loader />}
      {loadedBooks.length < totalNumber && !isLoading && (
        <button className="button" type="button" onClick={loadMoreHandler}>
          Load more
        </button>
      )}
    </div>
  );
}
