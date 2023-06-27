import { useCallback, useState } from 'react';
import { PAGE_SIZE } from '../constants';
import IProduct from '../types/IProduct';

const useGetProducts = () => {
  const [products, setProducts] = useState<Array<IProduct>>([]);
  const [totalPages, setTotalPages] = useState<number>(0);

  const getProducts = useCallback(
    async (searchText: string, currentPage: number, prevSearch = ''): Promise<void> => {
      const response = await fetch(
        `https://dummyjson.com/products/search?q=${searchText}&limit=${PAGE_SIZE}&skip=${
          PAGE_SIZE * (currentPage - 1)
        }&select=id,title,price,images`
      );
      const responseResult = await response.json();
      const { products: retrievedProducts, total } = responseResult;

      setTotalPages(Math.ceil(total / PAGE_SIZE));

      if (prevSearch === searchText) {
        setProducts(prevState => [...prevState, ...retrievedProducts]);
      } else {
        setProducts(retrievedProducts);
      }
    },
    []
  );

  return {
    products,
    totalPages,
    getProducts,
  };
};

export default useGetProducts;
