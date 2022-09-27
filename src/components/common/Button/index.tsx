import { MouseEventHandler, ReactNode } from 'react';
import styles from './Button.module.css';

interface ButtonProps<T> {
  type?: 'submit' | 'button';
  children: ReactNode;
  onClick?: T;
  color: string;
  disabled?: boolean;
  size?: 'small';
}

function Button<T extends MouseEventHandler<HTMLButtonElement> | undefined>({
  children,
  type,
  onClick,
  color,
  disabled,
  size,
}: ButtonProps<T>) {
  return (
    <button
      disabled={disabled}
      className={`${styles.button} ${styles[color]} ${
        size ? styles[size] : ''
      }`}
      onClick={onClick}
      type={type ? 'submit' : 'button'}
    >
      {children}
    </button>
  );
}

Button.defaultProps = {
  type: 'button',
  onClick: () => {},
  disabled: false,
  size: '',
};

export default Button;
