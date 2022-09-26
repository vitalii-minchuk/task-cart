import AppBar from '../../components/AppBar';
import BreadCrumb from '../../components/BreadCrumb';
import CartProductItem from '../../components/CartProductItem';
import useCartData from '../../hooks/useCartData';
import useProductData from '../../hooks/useProductData';

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
    <section>
      <BreadCrumb />
      <AppBar />
      <h1>Total Price: {totalPrice}</h1>
      {isFetching && <p>Loading...</p>}
      <div>
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
