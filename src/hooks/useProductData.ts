import { useCallback, useEffect, useMemo, useState } from 'react';
import API from '../api';
import { Product } from '../types';

function useProductData() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isFetching, setIsFetching] = useState(false);
  const [fetchError, setFetchError] = useState('');
  const [fetchSuccess, setFetchSuccess] = useState('');

  useEffect(() => {
    const getAllProducts = async () => {
      try {
        setIsFetching(true);
        const result = await API.getProducts();
        if (!result.ok) {
          throw new Error(result.statusText);
        }
        const data = await result.json();
        setProducts(data.reverse());
        setFetchSuccess('Success!');
      } catch (error: any) {
        setFetchError(error.message);
        setProducts([]);
      } finally {
        setIsFetching(false);
      }
    };

    getAllProducts();
  }, []);

  const createNewProduct = useCallback(async (obj: Product) => {
    try {
      setIsFetching(true);
      const result = await API.createProduct(obj);
      if (!result.ok) {
        throw new Error(result.statusText);
      }
      setFetchSuccess('Product has been created');
      const data = await result.json();
      setProducts((prev) => [data, ...prev]);
    } catch (error: any) {
      setFetchError(error.message);
    } finally {
      setIsFetching(false);
    }
  }, []);

  const deleteProduct = useCallback(async (id: string) => {
    try {
      setIsFetching(true);
      const result = await API.removeProduct(id);
      if (!result.ok) {
        throw new Error(result.statusText);
      }
      setFetchSuccess('Product has been deleted');
      setProducts((prev) => prev.filter((el) => el.id !== id));
    } catch (error: any) {
      setFetchError(error.message);
    } finally {
      setIsFetching(false);
    }
  }, []);

  const updateProduct = useCallback(async (obj: Product) => {
    try {
      setIsFetching(true);
      const result = await API.editProduct(obj);
      if (!result.ok) {
        throw new Error(result.statusText);
      }
      setFetchSuccess('Product has been updated');
      setProducts((prev) => prev.map((el) => (el.id === obj.id ? obj : el)));
    } catch (error: any) {
      setFetchError(error.message);
    } finally {
      setIsFetching(false);
    }
  }, []);

  useEffect(() => {
    if (!fetchError) return;
    const timer = setTimeout(() => {
      setFetchError('');
    }, 2000);

    return () => clearTimeout(timer);
  }, [fetchError]);

  useEffect(() => {
    if (!fetchSuccess) return;
    const timer = setTimeout(() => {
      setFetchSuccess('');
    }, 2000);

    return () => clearTimeout(timer);
  }, [fetchSuccess]);

  const values = useMemo(
    () => ({
      products,
      isFetching,
      fetchError,
      deleteProduct,
      updateProduct,
      fetchSuccess,
      createNewProduct,
    }),
    [
      createNewProduct,
      deleteProduct,
      fetchError,
      isFetching,
      products,
      fetchSuccess,
      updateProduct,
    ]
  );
  return values;
}

export default useProductData;
