import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import API from '../api';
import { CartItem, Product } from '../types';

interface IShoppingCartContext {
  cartItems: CartItem[];
  isFetching: boolean;
  totalPrice: number;
  totalQuantity: number;
  fetchError: string;
  fetchSuccess: string;
  addToCart: (obj: Product) => void;
  removeItemFromCart: (id: string) => void;
  updateCartItem: (obj: CartItem) => void;
  increaseQuantity: (obj: CartItem) => void;
  decreaseQuantity: (obj: CartItem) => void;
}

const ShoppingCartContext = createContext({} as IShoppingCartContext);

export function useShoppingCartContext() {
  return useContext(ShoppingCartContext);
}

interface ShoppingCartProviderProps {
  children: ReactNode;
}

export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isFetching, setIsFetching] = useState(false);
  const [fetchError, setFetchError] = useState('');
  const [fetchSuccess, setFetchSuccess] = useState('');

  const totalPrice = cartItems.reduce(
    (acc, el) => acc + el.price * el.quantity,
    0
  );

  const totalQuantity = cartItems.reduce((acc, el) => acc + el.quantity, 0);

  useEffect(() => {
    const getAllProducts = async () => {
      try {
        setIsFetching(true);
        const result = await API.getCartItems();
        if (!result.ok) {
          throw new Error(result.statusText);
        }
        const data = await result.json();
        setCartItems(data);
        setFetchSuccess('Success!');
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
      const result = await API.addItemToCart({
        title: obj.title,
        price: obj.price,
        product_id: obj.id!,
        quantity: 1,
        description: obj.description,
      });
      if (!result.ok) {
        throw new Error(result.statusText);
      }
      setFetchSuccess('Item has been added to the cart');
      const data = await result.json();
      setCartItems((prev) => [data, ...prev]);
    } catch (error: any) {
      setFetchError(error.message);
    } finally {
      setIsFetching(false);
    }
  };

  const removeItemFromCart = useCallback(
    async (id: string) => {
      const currentItem = cartItems.find((el) => el.product_id === id);
      try {
        setIsFetching(true);
        const result = await API.removeItemFromCart(
          currentItem?.id ? currentItem?.id : ''
        );
        if (!result.ok) {
          throw new Error(result.statusText);
        }
        setFetchSuccess('Item has been removed');
        setCartItems((prev) => prev.filter((el) => el.product_id !== id));
      } catch (error: any) {
        setFetchError(error.message);
      } finally {
        setIsFetching(false);
      }
    },
    [cartItems]
  );

  const updateCartItem = useCallback(async (obj: CartItem) => {
    try {
      setIsFetching(true);
      const result = await API.updateCartItem(obj);
      if (!result.ok) {
        throw new Error(result.statusText);
      }
      setFetchSuccess('Item has been updated');
    } catch (error: any) {
      setFetchError(error.message);
    } finally {
      setIsFetching(false);
    }
  }, []);

  const increaseQuantity = useCallback(
    (obj: CartItem) => {
      const increment = obj.quantity + 1;
      const increasedItem = { ...obj, quantity: increment };
      setCartItems((prev) =>
        prev.map((el) => (el.id === obj.id ? increasedItem : el))
      );
      updateCartItem(increasedItem);
    },
    [updateCartItem]
  );

  const decreaseQuantity = useCallback(
    (obj: CartItem) => {
      if (obj.quantity === 1) {
        setFetchError('It does not seem to work?');
        return;
      }
      const increment = obj.quantity - 1;
      const increasedItem = { ...obj, quantity: increment };
      setCartItems((prev) =>
        prev.map((el) => (el.id === obj.id ? increasedItem : el))
      );
      updateCartItem(increasedItem);
    },
    [updateCartItem]
  );

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
      fetchError,
      cartItems,
      isFetching,
      totalPrice,
      totalQuantity,
      addToCart,
      removeItemFromCart,
      updateCartItem,
      increaseQuantity,
      decreaseQuantity,
      fetchSuccess,
    }),
    [
      cartItems,
      decreaseQuantity,
      fetchError,
      increaseQuantity,
      isFetching,
      removeItemFromCart,
      totalPrice,
      totalQuantity,
      fetchSuccess,
      updateCartItem,
    ]
  );
  return (
    <ShoppingCartContext.Provider value={values}>
      {children}
    </ShoppingCartContext.Provider>
  );
}
