import { useState } from 'react';
import styles from './Create.module.css';
import BreadCrumb from '../../components/BreadCrumb';
import Loader from '../../components/common/Loader';
import ProductForm from '../../components/ProductForm';
import goBackHome from '../../components/Routing/goBackHome';
import useProductData from '../../hooks/useProductData';
import { Product } from '../../types';

function Create() {
  const { fetchError, isFetching, createNewProduct } = useProductData();
  const [newProduct, setProduct] = useState<Product>({
    title: '',
    description: '',
    price: 0,
    inCart: false,
  });

  const handleSave = async () => {
    await createNewProduct(newProduct);
    setProduct({
      title: '',
      description: '',
      price: 0,
      inCart: false,
    });
    goBackHome();
  };

  return (
    <section className={styles.container}>
      <BreadCrumb />
      <Loader isFetching={isFetching} />
      {fetchError && <p>{fetchError}</p>}
      <ProductForm
        isFetching={isFetching}
        values={newProduct}
        handleSave={handleSave}
        setValues={setProduct}
      />
    </section>
  );
}

export default Create;
