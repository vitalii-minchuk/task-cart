import { useState } from 'react';
import BreadCrumb from '../../components/BreadCrumb';
import ProductForm from '../../components/ProductForm';
import goBackHome from '../../components/Routing/goBackHome';
import useProductData from '../../hooks/useProductData';
import { Product } from '../../types';

function Edit() {
  const { fetchError, isFetching, updateProduct } = useProductData();
  const product = window.history.state;
  const [newProduct, setProduct] = useState<Product>(product);

  const handleSave = async () => {
    await updateProduct(newProduct);
    goBackHome();
  };
  return (
    <section>
      <BreadCrumb />
      {fetchError && <p>{fetchError}</p>}
      {isFetching ? (
        <p>Loading...</p>
      ) : (
        <ProductForm
          values={newProduct}
          handleSave={handleSave}
          setValues={setProduct}
        />
      )}
    </section>
  );
}

export default Edit;
