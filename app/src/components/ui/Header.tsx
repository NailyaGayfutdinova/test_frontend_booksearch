import React from 'react';
import '../css/header.css';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { setCategory, setSearchValue, setSortOption } from '../../redux/slices/booksSlice';
import { fetchBooksThunk } from '../../redux/slices/booksThunks';
import { categories, paginationStep, sortOptions } from '../../constants/bookConstants';

export default function Header(): JSX.Element {
  const selectedCategory = useAppSelector((store) => store.books.selectedCategory);
  const selectedSortOption = useAppSelector((store) => store.books.selectedSortOption);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const setCategoryHandler = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    dispatch(setCategory(e.target.value));
  };

  const setSortOptionHandler = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    dispatch(setSortOption(e.target.value));
  };

  const searchBooksHandler = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const searchInput = Object.fromEntries(new FormData(e.currentTarget)).bookName;
    if (typeof searchInput === 'string' && searchInput.trim()) {
      navigate('/');
      dispatch(setSearchValue(searchInput));
      void dispatch(
        fetchBooksThunk({
          searchValue: searchInput,
          category: selectedCategory === categories[0] ? '' : selectedCategory,
          sortOption: selectedSortOption,
          startIndex: 0,
          maxResults: paginationStep,
        }),
      );
    }
  };

  return (
    <div className="header">
      <div className="title">Search for books</div>
      <form className="row" onSubmit={searchBooksHandler}>
        <input className="searchField" name="bookName" type="text" placeholder="enter book name" />
        <button className="searchIcon" type="submit">
          <SearchIcon />
        </button>
      </form>
      <div className="row">
        <div className="selectorContainer">
          <span className="selectorLabel">Categories</span>
          <select className="selector" value={selectedCategory} onChange={setCategoryHandler}>
            {categories.map((el: string) => (
              <option key={el} value={el}>
                {el}
              </option>
            ))}
          </select>
        </div>
        <div className="selectorContainer">
          <span className="selectorLabel">Sorting by</span>
          <select className="selector" value={selectedSortOption} onChange={setSortOptionHandler}>
            {sortOptions.map((el: string) => (
              <option key={el} value={el}>
                {el}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
