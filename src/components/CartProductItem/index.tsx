import { RefObject, useState } from 'react';
import { CartItem, Product } from '../../types';
import Button from '../common/Button';
import Modal from '../common/Modal';
import styles from './CartProductItem.module.css';

type CartProductItemProps = {
  item: CartItem;
  isFetching: boolean;
  snackBarRef: RefObject<HTMLDivElement>;
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
  snackBarRef,
}: CartProductItemProps) {
  const [open, setOpen] = useState(false);
  const sum = item.price * item.quantity;

  const openModal = () => {
    setOpen(true);
  };

  const handleDelete = () => {
    removeItemFromCart(item.product_id);
    updateProduct({
      title: item.title,
      description: item.description,
      id: item.product_id,
      price: item.price,
      inCart: false,
    });

    // snackBarRef.current?.showSnackbar();
  };
  return (
    <div className={styles.box}>
      <p className={styles.leftPart}>{item.description}</p>
      <div className={styles.middlePart}>
        <p>{item.title}</p>
        <p>{item.price}</p>
        <div className={styles.actions}>
          <Button
            disabled={isFetching}
            size="small"
            color="blue"
            onClick={() => decreaseQuantity(item)}
            type="button"
          >
            -
          </Button>
          <p>{item.quantity}</p>
          <Button
            disabled={isFetching}
            size="small"
            color="blue"
            onClick={() => increaseQuantity(item)}
          >
            +
          </Button>
        </div>
      </div>
      <div className={styles.rightPart}>
        <p className={styles.sum}>sum: {sum}</p>
        <Button
          size="small"
          color="red"
          disabled={isFetching}
          onClick={openModal}
        >
          delete
        </Button>
      </div>
      <Modal
        onConfirm={handleDelete}
        isFetching={isFetching}
        open={open}
        question="Are you sure?"
        onClose={() => setOpen(false)}
      >
        <p>{item.title}</p>
        <p>{item.description}</p>
        <p>price: {item.price}</p>
      </Modal>
    </div>
  );
}

export default CartProductItem;
