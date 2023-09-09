import type { BooksApiType, SearchOptionsType } from '../types/bookTypes';
import { apiService } from './apiServiceConfig';

// eslint-disable-next-line import/prefer-default-export
export const fetchBooksService = async (
  searchValue: SearchOptionsType['searchValue'],
  category: SearchOptionsType['category'],
  sortOption: SearchOptionsType['sortOption'],
  startIndex: SearchOptionsType['startIndex'],
  maxResults: SearchOptionsType['maxResults'],
): Promise<BooksApiType> => {
  const { data } = await apiService<BooksApiType>(
    `?q=${searchValue}${category ? `+subject:${category}` : ''}` +
      `&startIndex=${startIndex}` +
      `&maxResults=${maxResults}` +
      `&orderBy=${sortOption}` +
      `&key=${import.meta.env.VITE_BASE_APIKEY}`,
  );
  return data;
};
