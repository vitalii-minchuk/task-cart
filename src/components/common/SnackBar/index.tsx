/* eslint-disable react/display-name */
import { forwardRef, useEffect, useState, useImperativeHandle } from 'react';
import styles from './SnackBar.module.css';

interface SnackBarProps {
  fetchError: string;
  fetchSuccess: string;
}

const SnackBar = forwardRef(
  ({ fetchError, fetchSuccess }: SnackBarProps, ref) => {
    const [show, setShow] = useState(false);

    useImperativeHandle(ref, () => ({
      showSnackbar: () => {
        setShow(true);
      },
    }));

    useEffect(() => {
      if (!show) return;
      const timer = setTimeout(() => {
        setShow(false);
      }, 2000);

      return () => clearTimeout(timer);
    }, [show]);
    return (
      <div
        className={`${styles.box} ${fetchError ? styles.error : ''} ${
          show ? styles.show : styles.hide
        }`}
      >
        {fetchError && <h4>{fetchError}</h4>}
        {fetchSuccess && <h4>{fetchSuccess}</h4>}
      </div>
    );
  }
);

export default SnackBar;
