import { CartItem, Product } from '../../types';
import styles from './CartProductItem.module.css';

type CartProductItemProps = {
  item: CartItem;
  isFetching: boolean;
  updateProduct: (obj: Product) => void;
  decreaseQuantity: (obj: CartItem) => void;
  increaseQuantity: (obj: CartItem) => void;
  removeItemFromCart: (id: string) => void;
};

function CartProductItem({
  item,
  updateProduct,
  removeItemFromCart,
  increaseQuantity,
  decreaseQuantity,
  isFetching,
}: CartProductItemProps) {
  const sum = item.price * item.quantity;

  const handleDelete = () => {
    removeItemFromCart(item.product_id);
    updateProduct({
      title: item.title,
      description: item.description,
      id: item.product_id,
      price: item.price,
      inCart: false,
    });
  };
  return (
    <div className={styles.box}>
      <p>{item.title}</p>
      <p>{item.description}</p>
      <p>{item.price}</p>
      <div className={styles.actions}>
        <button onClick={() => decreaseQuantity(item)} type="button">
          -
        </button>
        <p>{item.quantity}</p>
        <button type="button" onClick={() => increaseQuantity(item)}>
          +
        </button>
        <p>{sum}</p>
      </div>
      <button disabled={isFetching} type="button" onClick={handleDelete}>
        delete
      </button>
    </div>
  );
}

export default CartProductItem;
