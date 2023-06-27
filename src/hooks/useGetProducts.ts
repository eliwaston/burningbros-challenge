import { useCallback, useState } from 'react';
import { PAGE_SIZE } from '../constants';
import IProduct from '../types/IProduct';

const useGetProducts = () => {
  let page = 1;
  const [products, setProducts] = useState<Array<IProduct>>([]);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const getProducts = useCallback(async (searchText = ''): Promise<void> => {
    const response = await fetch(
      `https://dummyjson.com/products/search?q=${searchText}&limit=${PAGE_SIZE}&skip=${
        PAGE_SIZE * (page - 1)
      }&select=id,title,price,images`
    );
    const responseResult = await response.json();
    const { products: retrievedProducts, total } = responseResult;

    setHasMore(total > page * PAGE_SIZE);
    page += 1;
    setProducts(prevState => [...prevState, ...retrievedProducts]);
  }, []);

  return {
    products,
    hasMore,
    getProducts,
  };
};

export default useGetProducts;
