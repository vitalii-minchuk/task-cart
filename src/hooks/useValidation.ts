import {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import { Product } from '../types';

type UseValidationProps = {
  values: Product;
  setValues: Dispatch<SetStateAction<Product>>;
};

function useValidation({ setValues, values }: UseValidationProps) {
  const [touched, setTouched] = useState({
    title: false,
    price: false,
    description: false,
  });
  const [errors, setErrors] = useState({
    title: '',
    price: '',
    description: '',
  });
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    if (!values.title.trim()) {
      setErrors((prev) => ({ ...prev, title: 'Field is required' }));
    } else {
      setTouched((prev) => ({ ...prev, title: true }));
    }
    if (Number(values.price) < 1) {
      setErrors((prev) => ({ ...prev, price: 'Field is required' }));
    } else {
      setTouched((prev) => ({ ...prev, price: true }));
    }
    if (!values.description.trim()) {
      setErrors((prev) => ({ ...prev, description: 'Field is required' }));
    } else {
      setTouched((prev) => ({ ...prev, description: true }));
    }
  }, [values.description, values.price, values.title]);

  const handleTouche = (e: FormEvent) => {
    switch (e.currentTarget.id) {
      case 'title':
        setTouched((prev) => ({ ...prev, title: true }));
        break;
      case 'price':
        setTouched((prev) => ({ ...prev, price: true }));
        break;
      case 'description':
        setTouched((prev) => ({ ...prev, description: true }));
        break;
      default:
        break;
    }
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    switch (e.currentTarget.id) {
      case 'title':
        setValues((prev) => ({ ...prev, title: e.target.value }));
        if (e.target.value.length > 50) {
          setErrors((prev) => ({ ...prev, title: 'Too long' }));
        } else if (e.target.value.length < 2) {
          setErrors((prev) => ({ ...prev, title: 'Too short' }));
        } else {
          setErrors((prev) => ({ ...prev, title: '' }));
        }
        break;
      case 'price':
        setValues((prev) => ({ ...prev, price: Number(e.target.value) }));
        if (Number(e.target.value) > 1000) {
          setErrors((prev) => ({ ...prev, price: 'Too big' }));
        } else if (Number(e.target.value) < 1) {
          setErrors((prev) => ({ ...prev, price: 'Field is required' }));
        } else {
          setErrors((prev) => ({ ...prev, price: '' }));
        }
        break;
      case 'description':
        setValues((prev) => ({ ...prev, description: e.target.value }));
        if (e.target.value.length > 110) {
          setErrors({ ...errors, description: 'Too long' });
        } else if (e.target.value.length < 10) {
          setErrors({ ...errors, description: 'Too short' });
        } else {
          setErrors({ ...errors, description: '' });
        }
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if (
      !errors.price.length &&
      !errors.description.length &&
      !errors.title.length
    ) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [errors.description.length, errors.price.length, errors.title.length]);

  return { handleChange, handleTouche, errors, touched, isValid };
}

export default useValidation;
