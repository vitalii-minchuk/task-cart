import { useEffect, useState } from 'react';
import CartProductItem from '../../components/CartProductItem';
import { CartItem } from '../../types';

const BASE_URL = 'https://632e01bab37236d2ebe4bebc.mockapi.io/';

function Cart() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isFetching, setIsFetching] = useState(false);
  const [fetchError, setFetchError] = useState('');

  const totalPrice = cartItems.reduce(
    (acc, el) => acc + el.price * el.quantity,
    0
  );

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

  const removeItemFromCart = async (id: string) => {
    try {
      setIsFetching(true);
      const result = await fetch(`${BASE_URL}/cart/${id}`, {
        method: 'DELETE',
      });
      if (!result.ok) {
        throw new Error(result.statusText);
      }
      setFetchError('');
      setCartItems((prev) => prev.filter((el) => el.id !== id));
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

  return (
    <section>
      <div>cart</div>
      <h1>Total Price: {totalPrice}</h1>
      <div>
        {cartItems?.map((item) => (
          <CartProductItem
            decreaseQuantity={decreaseQuantity}
            increaseQuantity={increaseQuantity}
            removeItemFromCart={removeItemFromCart}
            key={item.product_id}
            item={item}
          />
        ))}
      </div>
    </section>
  );
}

export default Cart;
