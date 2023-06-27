import React, { useEffect, useState } from 'react';
import ProductList from './components/ProductList';
import SearchBox from './components/SearchBox';
import useGetProducts from './hooks/useGetProducts';
import './App.css';

const App = () => {
  const [searchText, setSearchText] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { products, totalPages, getProducts } = useGetProducts();

  useEffect(() => {
    getProducts(searchText, currentPage);
    setCurrentPage(2);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop !==
          document.documentElement.offsetHeight ||
        totalPages < currentPage
      ) {
        return;
      }
      getProducts(searchText, currentPage);
      setCurrentPage(currentPage + 1);
    };

    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [currentPage, searchText, totalPages]);

  const onTextChanged = (newSearchText: string) => setSearchText(newSearchText);

  return (
    <div className="container">
      <SearchBox
        searchText={searchText}
        onTextChanged={onTextChanged}
        setCurrentPage={setCurrentPage}
      />
      <ProductList products={products} />
    </div>
  );
};

export default App;
