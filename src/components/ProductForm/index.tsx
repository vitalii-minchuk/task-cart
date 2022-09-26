import { Dispatch, FormEvent, SetStateAction } from 'react';
import useValidation from '../../hooks/useValidation';
import { Product } from '../../types';

interface IProductForm {
  values: Product;
  setValues: Dispatch<SetStateAction<Product>>;
  handleSave: () => void;
}
function ProductForm({ values, setValues, handleSave }: IProductForm) {
  const { errors, touched, isValid, handleChange, handleTouche } =
    useValidation({ values, setValues });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    handleSave();
  };

  return (
    <form>
      <label htmlFor="title">
        Product name:
        <input
          onBlur={handleTouche}
          value={values.title}
          onChange={handleChange}
          type="text"
          id="title"
        />
      </label>
      {errors.title && touched.title && <p>{errors.title}</p>}
      <label htmlFor="price">
        Product price:
        <input
          onBlur={handleTouche}
          value={values.price}
          onChange={handleChange}
          type="number"
          id="price"
        />
      </label>
      {errors.price && touched.price && <p>{errors.price}</p>}
      <label htmlFor="description">
        Product price:
        <textarea
          onBlur={handleTouche}
          value={values.description}
          onChange={handleChange}
          id="description"
        />
      </label>
      {errors.description && touched.description && <p>{errors.description}</p>}
      <button onClick={handleSubmit} disabled={!isValid} type="submit">
        save
      </button>
    </form>
  );
}

export default ProductForm;
