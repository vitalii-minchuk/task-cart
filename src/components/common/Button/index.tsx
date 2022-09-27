import { ReactNode } from 'react';
import styles from './Button.module.css';

interface ButtonProps {
  type?: 'submit' | 'button';
  children: ReactNode;
  onClick?: any;
  color: string;
  disabled?: boolean;
  size?: 'small' | 'big';
}

function Button({
  children,
  type,
  onClick,
  color,
  disabled,
  size,
}: ButtonProps) {
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
