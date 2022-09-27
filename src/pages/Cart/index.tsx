import styles from './Cart.module.css';
import BreadCrumb from '../../components/BreadCrumb';
import CartProductItem from '../../components/CartProductItem';
import useProductData from '../../hooks/useProductData';
import Loader from '../../components/common/Loader';
import { useShoppingCartContext } from '../../context/ShoppingCartContext';

function Cart() {
  const { updateProduct } = useProductData();
  const {
    cartItems,
    isFetching,
    totalPrice,
    removeItemFromCart,
    increaseQuantity,
    decreaseQuantity,
    fetchError,
  } = useShoppingCartContext();
  return (
    <section className={styles.container}>
      <BreadCrumb />
      <Loader isFetching={isFetching} />
      {fetchError && <p>{fetchError}</p>}
      <h1 className={styles.totalPrice}>Total Price: {totalPrice}</h1>
      <div className={styles.box}>
        {cartItems?.map((item) => (
          <CartProductItem
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
    </section>
  );
}

export default Cart;
