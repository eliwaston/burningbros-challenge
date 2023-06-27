import React, { useEffect, useState } from 'react';
import ProductList from './components/ProductList';
import SearchBox from './components/SearchBox';
import useGetProducts from './hooks/useGetProducts';
import './App.css';

const App = () => {
  const [searchText, setSearchText] = useState<string>('');
  const [prevSearchText, setPrevSearchText] = useState<string>('');
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
        totalPages === 1 ||
        totalPages < currentPage
      ) {
        return;
      }

      getProducts(searchText, currentPage, prevSearchText);
      setCurrentPage(currentPage + 1);
    };

    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [currentPage, searchText, prevSearchText, totalPages]);

  const onTextChanged = (newSearchText: string) => setSearchText(newSearchText);

  const onPreSearchTextChanged = (newPrevSearchText: string) =>
    setPrevSearchText(newPrevSearchText);

  return (
    <div className="container">
      <SearchBox
        searchText={searchText}
        prevSearchText={prevSearchText}
        onTextChanged={onTextChanged}
        onPreSearchTextChanged={onPreSearchTextChanged}
        setCurrentPage={setCurrentPage}
        getProducts={getProducts}
      />
      <ProductList products={products} />
    </div>
  );
};

export default App;
