import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { BookApiType, BooksSliceType } from '../../types/bookTypes';
import { fetchBooksThunk, loadMoreBooksThunk } from './booksThunks';
import { categories, sortOptions } from '../../constants/bookConstants';

const initialState: BooksSliceType = {
  searchValue: '',
  selectedCategory: categories[0],
  selectedSortOption: sortOptions[0],
  totalNumber: 0,
  loadedBooks: [],
  selectedBook: null,
  isLoading: false,
};

export const booksSlice = createSlice({
  name: 'books',
  initialState,

  reducers: {
    setCategory: (state, { payload }: PayloadAction<string>) => ({
      ...state,
      selectedCategory: payload,
    }),

    setSortOption: (state, { payload }: PayloadAction<string>) => ({
      ...state,
      selectedSortOption: payload,
    }),

    setSearchValue: (state, { payload }: PayloadAction<string>) => ({
      ...state,
      searchValue: payload,
    }),

    selectBook: (state, {payload}: PayloadAction<BookApiType>) => ({
      ...state,
      selectedBook: payload,
    }),
  },

  extraReducers: (builder) => {
    builder.addCase(fetchBooksThunk.fulfilled, (state, { payload }) => ({
      ...state,
      totalNumber: payload.totalItems,
      loadedBooks: payload.items ? payload.items : [],
      isLoading: false,
    }));
    builder.addCase(fetchBooksThunk.pending, (state) => ({
      ...state,
      totalNumber: 0,
      loadedBooks: [],
      isLoading: true,
    }));
    builder.addCase(fetchBooksThunk.rejected, (state) => ({
      ...state,
      totalNumber: 0,
      loadedBooks: [],
      isLoading: false,
    }));

    builder.addCase(loadMoreBooksThunk.fulfilled, (state, { payload }) => ({
      ...state,
      loadedBooks: payload.items ? [...state.loadedBooks, ...payload.items] : state.loadedBooks,
      isLoading: false,
    }));
    builder.addCase(loadMoreBooksThunk.pending, (state) => ({
      ...state,
      isLoading: true,
    }));
    builder.addCase(loadMoreBooksThunk.rejected, (state) => ({
      ...state,
      isLoading: false,
    }));
  },
});

export default booksSlice.reducer;
export const { setCategory, setSortOption, setSearchValue, selectBook } = booksSlice.actions;
