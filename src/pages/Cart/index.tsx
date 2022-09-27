import styles from './Cart.module.css';
import BreadCrumb from '../../components/BreadCrumb';
import CartProductItem from '../../components/CartProductItem';
import useCartData from '../../hooks/useCartData';
import useProductData from '../../hooks/useProductData';
import Loader from '../../components/common/Loader';

function Cart() {
  const { updateProduct } = useProductData();
  const {
    cartItems,
    isFetching,
    totalPrice,
    removeItemFromCart,
    decreaseQuantity,
    increaseQuantity,
  } = useCartData();
  return (
    <section className={styles.container}>
      <BreadCrumb />
      <Loader isFetching={isFetching} />
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
