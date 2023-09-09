import { createAsyncThunk } from '@reduxjs/toolkit';
import type { BooksApiType, SearchOptionsType } from '../../types/bookTypes';
import { fetchBooksService } from '../../services/apiBooksService';

export const fetchBooksThunk = createAsyncThunk<BooksApiType, SearchOptionsType>(
  'books/fetchBooks',
  async ({searchValue, category, sortOption, startIndex, maxResults}) => fetchBooksService(searchValue, category, sortOption, startIndex, maxResults),
);

export const loadMoreBooksThunk = createAsyncThunk<BooksApiType, SearchOptionsType>(
  'books/loadMoreBooks',
  async ({searchValue, category, sortOption, startIndex, maxResults}) => fetchBooksService(searchValue, category, sortOption, startIndex, maxResults),
);
