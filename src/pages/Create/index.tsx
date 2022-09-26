import { useState } from 'react';
import BreadCrumb from '../../components/BreadCrumb';
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

  const handleSave = () => {
    createNewProduct(newProduct);
    setProduct({
      title: '',
      description: '',
      price: 0,
      inCart: false,
    });
    goBackHome();
  };

  return (
    <section>
      <BreadCrumb />
      {isFetching && <p>Loading...</p>}
      {fetchError && <p>{fetchError}</p>}
      <ProductForm
        values={newProduct}
        handleSave={handleSave}
        setValues={setProduct}
      />
    </section>
  );
}

export default Create;
