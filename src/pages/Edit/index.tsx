import { useState } from 'react';
import styles from './Edit.module.css';
import BreadCrumb from '../../components/BreadCrumb';
import ProductForm from '../../components/ProductForm';
import goBackHome from '../../components/Routing/goBackHome';
import useProductData from '../../hooks/useProductData';
import { Product } from '../../types';
import Loader from '../../components/common/Loader';

function Edit() {
  const { fetchError, isFetching, updateProduct } = useProductData();
  const product = window.history.state;
  const [newProduct, setProduct] = useState<Product>(product);

  const handleSave = async () => {
    await updateProduct(newProduct);
    goBackHome();
  };
  return (
    <section className={styles.container}>
      <BreadCrumb />
      <Loader isFetching={isFetching} />
      {fetchError && <p>{fetchError}</p>}
      <ProductForm
        values={newProduct}
        handleSave={handleSave}
        setValues={setProduct}
      />
    </section>
  );
}

export default Edit;
