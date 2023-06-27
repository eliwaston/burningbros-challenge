import React, { useCallback } from 'react';
import { debounce } from 'lodash';
import useGetProducts from '../hooks/useGetProducts';

interface SearchBoxProps {
  searchText: string;
  setCurrentPage: (pageNumber: number) => void;
  onTextChanged: (value: string) => void;
}

const SearchBox = ({ searchText, setCurrentPage, onTextChanged }: SearchBoxProps) => {
  const { getProducts } = useGetProducts();
  const searchProducts = useCallback(
    debounce((value: string) => getProducts(value, 1), 1000),
    []
  );

  const onSearchTextChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchText = event.target.value;
    onTextChanged(newSearchText);
    searchProducts(newSearchText.toLowerCase());
    setCurrentPage(1);
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
