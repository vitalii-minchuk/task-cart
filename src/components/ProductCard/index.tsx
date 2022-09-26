import { Product, Routes } from '../../types';
import Link from '../Routing/Link';

interface ProductCardProps {
  product: Product;
  isFetching: boolean;
  deleteProduct: (id: string) => void;
  updateProduct: (obj: Product) => void;
}

function ProductCard({
  product,
  isFetching,
  deleteProduct,
  updateProduct,
}: ProductCardProps) {
  const handleDeleteProduct = () => {
    deleteProduct(product.id!);
  };

  const handleAddProductToCart = () => {
    const productInCart = { ...product, inCart: true };
    updateProduct(productInCart);
  };

  return (
    <div>
      <p>{product.title}</p>
      <p>{product.description}</p>
      <p>{product.price}</p>
      <button disabled={isFetching} onClick={handleDeleteProduct} type="button">
        delete
      </button>
      <button
        onClick={handleAddProductToCart}
        type="button"
        disabled={product.inCart || isFetching}
      >
        add to cart
      </button>
      <Link obj={product} href={Routes.EDIT}>
        edit
      </Link>
    </div>
  );
}

export default ProductCard;
