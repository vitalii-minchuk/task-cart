export type Product = {
  id?: string;
  title: string;
  description: string;
  price: number;
  inCart: boolean;
};

// export type ProductWithoutId = Omit<Product, "id">;

export type CartItem = {
  id?: string;
  product_id: string;
  title: string;
  description: string;
  price: number;
  quantity: number;
};

export enum Routes {
  HOME = '/',
  CART = '/cart',
  EDIT = '/edit',
  CREATE = '/create',
}
