import { ChangeEventHandler } from 'react';
import styles from './Input.module.css';

interface InputProps<T> {
  type?: 'text' | 'number' | 'email';
  placeholder?: string;
  onChange: T;
  colorError?: string;
}

function Input<T extends ChangeEventHandler<HTMLInputElement> | undefined>({
  type,
  placeholder,
  onChange,
  colorError,
}: InputProps<T>) {
  return (
    <input
      className={`${styles.input} ${colorError ? styles.error : ''}`}
      onChange={onChange}
      placeholder={placeholder}
      type={type}
    />
  );
}

Input.defaultProps = {
  type: 'text',
  placeholder: '',
  colorError: '',
};

export default Input;
