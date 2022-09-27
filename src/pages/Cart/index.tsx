import { useRef } from 'react';
import styles from './Cart.module.css';
import BreadCrumb from '../../components/BreadCrumb';
import CartProductItem from '../../components/CartProductItem';
import useProductData from '../../hooks/useProductData';
import Loader from '../../components/common/Loader';
import { useShoppingCartContext } from '../../context/ShoppingCartContext';
import SnackBar from '../../components/common/SnackBar';

function Cart() {
  const { updateProduct } = useProductData();
  const {
    cartItems,
    isFetching,
    totalPrice,
    removeItemFromCart,
    increaseQuantity,
    decreaseQuantity,
    fetchSuccess,
    fetchError,
  } = useShoppingCartContext();
  const snackBarRef = useRef<HTMLDivElement>(null);

  return (
    <section className={styles.container}>
      <BreadCrumb />
      <Loader isFetching={isFetching} />
      <h1 className={styles.totalPrice}>Total Price: {totalPrice}</h1>
      <div className={styles.box}>
        {cartItems?.map((item) => (
          <CartProductItem
            snackBarRef={snackBarRef}
            updateProduct={updateProduct}
            isFetching={isFetching}
            decreaseQuantity={decreaseQuantity}
            increaseQuantity={increaseQuantity}
            removeItemFromCart={removeItemFromCart}
            key={item.product_id}
            item={item}
          />
        ))}
      </div>
      <SnackBar
        ref={snackBarRef}
        fetchSuccess={fetchSuccess}
        fetchError={fetchError}
      />
    </section>
  );
}

export default Cart;
