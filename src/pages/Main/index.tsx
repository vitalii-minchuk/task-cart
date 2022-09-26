import AppBar from '../../components/AppBar';
import ProductCard from '../../components/ProductCard';
import Link from '../../components/Routing/Link';
import useCartData from '../../hooks/useCartData';
import useProductData from '../../hooks/useProductData';
import { Routes } from '../../types';

function Main() {
  const { addToCart, removeItemFromCart } = useCartData();
  const { isFetching, products, updateProduct, deleteProduct, fetchError } =
    useProductData();
  return (
    <section>
      {isFetching && <p>Loading...</p>}
      <AppBar />
      <div>
        <Link href={Routes.CREATE}>create</Link>
      </div>
      <div>
        {products.map((product) => (
          <ProductCard
            removeItemFromCart={removeItemFromCart}
            addToCart={addToCart}
            isFetching={isFetching}
            deleteProduct={deleteProduct}
            updateProduct={updateProduct}
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </section>
  );
}

export default Main;
