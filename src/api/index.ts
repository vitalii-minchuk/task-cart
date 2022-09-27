import { CartItem, Product } from '../types';

const BASE_URL = 'https://632e01bab37236d2ebe4bebc.mockapi.io/';

const API = {
  getCartItems: async () => {
    return fetch(`${BASE_URL}/cart`);
  },
  addItemToCart: async (obj: CartItem) => {
    return fetch(`${BASE_URL}/cart`, {
      method: 'POST',
      body: JSON.stringify(obj),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
  },
  removeItemFromCart: async (id: string) => {
    return fetch(`${BASE_URL}/cart/${id}`, {
      method: 'DELETE',
    });
  },
  updateCartItem: async (obj: CartItem) => {
    return fetch(`${BASE_URL}/cart/${obj.id}`, {
      method: 'PUT',
      body: JSON.stringify(obj),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
  },
  getProducts: async () => {
    return fetch(`${BASE_URL}/products`);
  },
  createProduct: async (obj: Product) => {
    return fetch(`${BASE_URL}/products`, {
      method: 'POST',
      body: JSON.stringify(obj),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
  },
  removeProduct: async (id: string) => {
    return fetch(`${BASE_URL}/products/${id}`, {
      method: 'DELETE',
    });
  },
  editProduct: async (obj: Product) => {
    return fetch(`${BASE_URL}/products/${obj.id}`, {
      method: 'PUT',
      body: JSON.stringify(obj),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
  },
};

export default API;
