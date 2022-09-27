import { useEffect, useState } from 'react';
import styles from './Main.module.css';
import Button from '../../components/common/Button';
import Pagination from '../../components/Pagination';
import ProductCard from '../../components/ProductCard';
import Link from '../../components/Routing/Link';
import useCartData from '../../hooks/useCartData';
import usePagination from '../../hooks/usePagination';
import useProductData from '../../hooks/useProductData';
import { Product, Routes } from '../../types';
import Loader from '../../components/common/Loader';

function Main() {
  const { addToCart, removeItemFromCart } = useCartData();
  const { isFetching, products, updateProduct, deleteProduct, fetchError } =
    useProductData();
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
            className={styles.input}
            onChange={(e) => setSearch(e.target.value)}
            type="text"
          />
          <Link href={Routes.CREATE}>
            <Button color="blue">create new</Button>
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
    </section>
  );
}

export default Main;
