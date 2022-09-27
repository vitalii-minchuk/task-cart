import { Product, Routes } from '../../types';
import styles from './ProductCard.module.css';
import Button from '../common/Button';
import Link from '../Routing/Link';

interface ProductCardProps {
  product: Product;
  isFetching: boolean;
  deleteProduct: (id: string) => void;
  updateProduct: (obj: Product) => void;
  addToCart: (obj: Product) => void;
  removeItemFromCart: (id: string) => void;
}

function ProductCard({
  product,
  isFetching,
  deleteProduct,
  updateProduct,
  addToCart,
  removeItemFromCart,
}: ProductCardProps) {
  const handleDeleteProduct = () => {
    deleteProduct(product.id!);
    if (product.inCart) {
      removeItemFromCart(product.id!);
    }
  };

  const handleAddProductToCart = () => {
    const productInCart = { ...product, inCart: true };
    updateProduct(productInCart);
    addToCart(productInCart);
  };

  return (
    <div className={styles.box}>
      <h4 className={styles.title}>{product.title}</h4>
      <p className={styles.description}>{product.description}</p>
      <div className={styles.price}>
        <span>price:</span>
        <p>{product.price}</p>
      </div>
      <div className={styles.actions}>
        <Button
          size="small"
          color="red"
          disabled={isFetching}
          onClick={handleDeleteProduct}
          type="button"
        >
          delete
        </Button>
        <Button
          size="small"
          color="blue"
          onClick={handleAddProductToCart}
          type="button"
          disabled={product.inCart || isFetching}
        >
          add to cart
        </Button>
        <Link obj={product} href={Routes.EDIT}>
          <Button color="blue" disabled={isFetching} size="small">
            edit
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default ProductCard;
