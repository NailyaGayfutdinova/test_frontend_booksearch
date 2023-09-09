export type BooksApiType = {
  kind: string;
  totalItems: number;
  items?: BookApiType[]; 
}

export type BookApiType = {
  kind: string;
  id: string;
  volumeInfo?: {
    title?: string;
    authors?: string[];
    categories?: string[];
    description?: string;
    imageLinks?: {
      smallThumbnail?: string;
      thumbnail?: string;
    }
  }
}

export type BooksSliceType = {
  searchValue: string;
  selectedCategory: string;
  selectedSortOption: string;
  totalNumber: number;
  loadedBooks: BookApiType[];
  isLoading: boolean;
  selectedBook: BookApiType | null;
}

export type SearchOptionsType = {
  searchValue: string;
  sortOption: string;
  category: string;
  startIndex: number;
  maxResults: number;
}