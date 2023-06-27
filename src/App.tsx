import React, { useEffect } from 'react';
import './App.css';
import useGetProducts from './hooks/useGetProducts';
import ProductList from './components/ProductList';

const App = () => {
  const { products, hasMore, getProducts } = useGetProducts();

  useEffect(() => {
    const onScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop !==
          document.documentElement.offsetHeight ||
        !hasMore
      ) {
        return;
      }
      getProducts();
    };

    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [hasMore]);

  return (
    <div className="container">
      <input className="search-box" placeholder="Search products by title" />
      <ProductList products={products} />
    </div>
  );
};

export default App;
