import { useEffect, useState } from 'react';
import { CartItem, Product } from '../types';

const BASE_URL = 'https://632e01bab37236d2ebe4bebc.mockapi.io/';

function useCartData() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isFetching, setIsFetching] = useState(false);
  const [fetchError, setFetchError] = useState('');

  const totalPrice = cartItems.reduce(
    (acc, el) => acc + el.price * el.quantity,
    0
  );

  const totalQuantity = cartItems.reduce((acc, el) => acc + el.quantity, 0);

  console.log('cart', cartItems);
  useEffect(() => {
    const getAllProducts = async () => {
      try {
        setIsFetching(true);
        const result = await fetch(`${BASE_URL}/cart`);
        if (!result.ok) {
          throw new Error(result.statusText);
        }
        const data = await result.json();
        setCartItems(data);
        setFetchError('');
      } catch (error: any) {
        setFetchError(error.message);
        setCartItems([]);
      } finally {
        setIsFetching(false);
      }
    };

    getAllProducts();
  }, []);

  const addToCart = async (obj: Product) => {
    try {
      setIsFetching(true);
      const result = await fetch(`${BASE_URL}/cart`, {
        method: 'POST',
        body: JSON.stringify({
          title: obj.title,
          price: obj.price,
          product_id: obj.id,
          quantity: 1,
          description: obj.description,
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
      setCartItems((prev) => [data, ...prev]);
    } catch (error: any) {
      setFetchError(error.message);
    } finally {
      setIsFetching(false);
    }
  };

  const removeItemFromCart = async (id: string) => {
    const currentItem = cartItems.find((el) => el.product_id === id);
    try {
      setIsFetching(true);
      const result = await fetch(`${BASE_URL}/cart/${currentItem?.id}`, {
        method: 'DELETE',
      });
      if (!result.ok) {
        throw new Error(result.statusText);
      }
      setFetchError('');
      setCartItems((prev) => prev.filter((el) => el.product_id !== id));
    } catch (error: any) {
      setFetchError(error.message);
    } finally {
      setIsFetching(false);
    }
  };

  const updateCartItem = async (obj: CartItem) => {
    try {
      setIsFetching(true);
      const result = await fetch(`${BASE_URL}/cart/${obj.id}`, {
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
    } catch (error: any) {
      setFetchError(error.message);
    } finally {
      setIsFetching(false);
    }
  };

  const increaseQuantity = (obj: CartItem) => {
    const increment = obj.quantity + 1;
    const increasedItem = { ...obj, quantity: increment };
    setCartItems((prev) =>
      prev.map((el) => (el.id === obj.id ? increasedItem : el))
    );
    updateCartItem(increasedItem);
  };

  const decreaseQuantity = (obj: CartItem) => {
    if (obj.quantity === 1) return;
    const increment = obj.quantity - 1;
    const increasedItem = { ...obj, quantity: increment };
    setCartItems((prev) =>
      prev.map((el) => (el.id === obj.id ? increasedItem : el))
    );
    updateCartItem(increasedItem);
  };

  useEffect(() => {
    if (!fetchError) return;
    const timer = setTimeout(() => {
      setFetchError('');
    }, 2000);

    return () => clearTimeout(timer);
  }, [fetchError]);

  return {
    cartItems,
    isFetching,
    fetchError,
    totalPrice,
    removeItemFromCart,
    increaseQuantity,
    decreaseQuantity,
    addToCart,
    totalQuantity,
  };
}
export default useCartData;
