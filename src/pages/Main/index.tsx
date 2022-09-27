import { useEffect, useState } from 'react';
import styles from './Main.module.css';
import Button from '../../components/common/Button';
import Pagination from '../../components/Pagination';
import ProductCard from '../../components/ProductCard';
import Link from '../../components/Routing/Link';
import usePagination from '../../hooks/usePagination';
import useProductData from '../../hooks/useProductData';
import { Product, Routes } from '../../types';
import Loader from '../../components/common/Loader';
import { useShoppingCartContext } from '../../context/ShoppingCartContext';
import SnackBar from '../../components/common/SnackBar';

function Main() {
  const { addToCart, removeItemFromCart } = useShoppingCartContext();
  const {
    isFetching,
    products,
    fetchSuccess,
    updateProduct,
    deleteProduct,
    fetchError,
  } = useProductData();
  const [search, setSearch] = useState('');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const { shownProducts, productsPerPage, currentPage, setCurrentPage } =
    usePagination(filteredProducts, search);

  useEffect(() => {
    setFilteredProducts(
      products.filter((el) =>
        el.title.toLocaleLowerCase().includes(search.toLocaleLowerCase())
      )
    );
  }, [search, products]);

  return (
    <section className={styles.container}>
      <div className={styles.wrapper}>
        <Loader isFetching={isFetching} />
        <div className={styles.appBar}>
          <input
            placeholder="Search..."
            className={styles.input}
            onChange={(e) => setSearch(e.target.value)}
            type="text"
          />
          <Link href={Routes.CREATE}>
            <Button size="big" color="blue">
              + create new
            </Button>
          </Link>
        </div>
        <div className={styles.content}>
          {shownProducts.map((product) => (
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
        <Pagination
          setCurrentPage={setCurrentPage}
          totalItems={filteredProducts?.length}
          currentPage={currentPage}
          productsPerPage={productsPerPage}
        />
      </div>
      <SnackBar fetchSuccess={fetchSuccess} fetchError={fetchError} />
    </section>
  );
}

export default Main;
