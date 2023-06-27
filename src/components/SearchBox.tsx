import React, { useCallback, useState } from 'react';
import { debounce } from 'lodash';

interface SearchBoxProps {
  searchText: string;
  prevSearchText: string;
  setCurrentPage: (pageNumber: number) => void;
  onTextChanged: (value: string) => void;
  onPreSearchTextChanged: (value: string) => void;
  getProducts: (searchText: string, currentPage: number, prevSearchText: string) => void;
}

const SearchBox = ({
  searchText,
  prevSearchText,
  setCurrentPage,
  onTextChanged,
  onPreSearchTextChanged,
  getProducts,
}: SearchBoxProps) => {
  const searchProducts = useCallback(
    debounce((value: string) => {
      getProducts(value, 1, prevSearchText);
      onPreSearchTextChanged(value);
      setCurrentPage(2);
    }, 1000),
    [prevSearchText]
  );

  const onSearchTextChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchText = event.target.value;
    onTextChanged(newSearchText);
    searchProducts(newSearchText);
  };

  return (
    <input
      className="search-box"
      placeholder="Search products by title"
      value={searchText}
      onChange={onSearchTextChanged}
    />
  );
};

export default SearchBox;
