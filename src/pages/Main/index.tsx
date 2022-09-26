import { useEffect, useState } from 'react';
import ProductCard from '../../components/ProductCard';
import { Product } from '../../types';

const BASE_URL = 'https://632e01bab37236d2ebe4bebc.mockapi.io/';

function Main() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isFetching, setIsFetching] = useState(false);
  const [fetchError, setFetchError] = useState('');

  console.log('fetch', products);
  useEffect(() => {
    const getAllProducts = async () => {
      try {
        setIsFetching(true);
        const result = await fetch(`${BASE_URL}/products`);
        if (!result.ok) {
          throw new Error(result.statusText);
        }
        const data = await result.json();
        setProducts(data.reverse());
        setFetchError('');
      } catch (error: any) {
        setFetchError(error.message);
        setProducts([]);
      } finally {
        setIsFetching(false);
      }
    };

    getAllProducts();
  }, []);

  const createNewProduct = async () => {
    try {
      setIsFetching(true);
      const result = await fetch(`${BASE_URL}/products`, {
        method: 'POST',
        body: JSON.stringify({
          title: 'hello',
          price: 88,
          inCart: false,
          description: 'jl;jk sdjfdkjfkls sdfjsl;dj;sldfksj;lk',
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      });
      if (!result.ok) {
        throw new Error(result.statusText);
      }
      setFetchError('');
      const data = await result.json();
      setProducts((prev) => [data, ...prev]);
    } catch (error: any) {
      setFetchError(error.message);
    } finally {
      setIsFetching(false);
    }
  };

  const deleteProduct = async (id: string) => {
    try {
      setIsFetching(true);
      const result = await fetch(`${BASE_URL}/products/${id}`, {
        method: 'DELETE',
      });
      if (!result.ok) {
        throw new Error(result.statusText);
      }
      setFetchError('');
      setProducts((prev) => prev.filter((el) => el.id !== id));
    } catch (error: any) {
      setFetchError(error.message);
    } finally {
      setIsFetching(false);
    }
  };

  const updateProduct = async (obj: Product) => {
    try {
      setIsFetching(true);
      const result = await fetch(`${BASE_URL}/products/${obj.id}`, {
        method: 'PUT',
        body: JSON.stringify(obj),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      });
      if (!result.ok) {
        throw new Error(result.statusText);
      }
      setFetchError('');
      setProducts((prev) => prev.map((el) => (el.id === obj.id ? obj : el)));
    } catch (error: any) {
      setFetchError(error.message);
    } finally {
      setIsFetching(false);
    }
  };

  return (
    <section>
      {isFetching && <p>Loading...</p>}
      <div>
        <button type="button" onClick={createNewProduct}>
          create
        </button>
      </div>
      <div>
        {products.map((product) => (
          <ProductCard
            isFetching={isFetching}
            deleteProduct={deleteProduct}
            updateProduct={updateProduct}
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </section>
  );
}

export default Main;
