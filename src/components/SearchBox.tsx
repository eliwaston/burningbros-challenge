import React, { useCallback } from 'react';
import { debounce } from 'lodash';
import useGetProducts from '../hooks/useGetProducts';

interface SearchBoxProps {
  searchText: string;
  onTextChanged: (value: string) => void;
}

const SearchBox = ({ searchText, onTextChanged }: SearchBoxProps) => {
  const { getProducts } = useGetProducts();
  const searchProducts = useCallback(
    debounce((value: string) => getProducts(value), 1000),
    []
  );

  const onSearchTextChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchText = event.target.value;
    onTextChanged(newSearchText);
    searchProducts(newSearchText.toLowerCase());
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
