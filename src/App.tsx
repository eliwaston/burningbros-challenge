import React, { useEffect, useState } from 'react';
import ProductList from './components/ProductList';
import SearchBox from './components/SearchBox';
import useGetProducts from './hooks/useGetProducts';
import './App.css';

const App = () => {
  const [searchText, setSearchText] = useState<string>('');
  const { products, hasMore, getProducts } = useGetProducts();

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    const onScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop !==
          document.documentElement.offsetHeight ||
        !hasMore
      ) {
        return;
      }
      getProducts(searchText);
    };

    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [hasMore, searchText]);

  const onTextChanged = (newSearchText: string) => setSearchText(newSearchText);

  return (
    <div className="container">
      <SearchBox searchText={searchText} onTextChanged={onTextChanged} />
      <ProductList products={products} />
    </div>
  );
};

export default App;
