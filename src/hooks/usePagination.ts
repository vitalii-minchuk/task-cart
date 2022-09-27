import { useState, useEffect } from 'react';
import { Product } from '../types';

function usePagination(products: Product[], search: string) {
  const [currentPage, setCurrentPage] = useState(1);
  const [shownProducts, setShownProducts] = useState<Product[]>([]);

  const productsPerPage = 10;
  const lastIndex = currentPage * productsPerPage;
  const firstIndex = lastIndex - productsPerPage;

  useEffect(() => {
    if (search) {
      setCurrentPage(1);
    }
  }, [search]);

  useEffect(() => {
    setShownProducts(products.slice(firstIndex, lastIndex));
  }, [firstIndex, lastIndex, products]);

  return {
    shownProducts,
    setCurrentPage,
    productsPerPage,
    currentPage,
  };
}

export default usePagination;
