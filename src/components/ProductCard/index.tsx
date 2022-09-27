import { RefObject, useState } from 'react';
import { Product, Routes } from '../../types';
import styles from './ProductCard.module.css';
import Button from '../common/Button';
import Link from '../Routing/Link';
import Modal from '../common/Modal';
import goBackHome from '../Routing/goBackHome';

interface ProductCardProps {
  product: Product;
  isFetching: boolean;
  snackBarRef: RefObject<HTMLDivElement>;
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
  snackBarRef,
  removeItemFromCart,
}: ProductCardProps) {
  const [open, setOpen] = useState(false);

  const openModal = () => {
    setOpen(true);
  };

  const handleDeleteProduct = async () => {
    await deleteProduct(product.id!);
    if (product.inCart) {
      await removeItemFromCart(product.id!);
    }
    snackBarRef.current?.click();
    goBackHome();
  };

  const handleAddProductToCart = async () => {
    const productInCart = { ...product, inCart: true };
    await updateProduct(productInCart);
    await addToCart(productInCart);
    snackBarRef.current?.click();
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
          onClick={openModal}
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
      <Modal
        isFetching={isFetching}
        onConfirm={handleDeleteProduct}
        onClose={() => setOpen(false)}
        question="Would you like to delete this product?"
        open={open}
      >
        <h4 className={styles.title}>{product.title}</h4>
        <p>{product.description}</p>
        <p>price: {product.price}</p>
      </Modal>
    </div>
  );
}

export default ProductCard;
