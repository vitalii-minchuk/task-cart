/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/interactive-supports-focus */
import { ReactNode } from 'react';
import Button from '../Button';
import Loader from '../Loader';
import styles from './Modal.module.css';

interface ModalProps {
  isFetching: boolean;
  children: ReactNode;
  open: boolean;
  question: string;
  onClose: () => void;
  onConfirm: () => void;
}

function Modal({
  isFetching,
  children,
  open,
  question,
  onClose,
  onConfirm,
}: ModalProps) {
  if (!open) return null;
  return (
    <div role="button" onClick={onClose} className={styles.overlay}>
      <div
        role="button"
        onClick={(e) => e.stopPropagation()}
        className={styles.box}
      >
        <div className={styles.closeBtn}>
          <Button onClick={onClose} size="small" color="trans">
            X
          </Button>
        </div>
        <div className={styles.content}>{children}</div>
        <p className={styles.question}>{question}</p>
        <div className={styles.actions}>
          {isFetching ? (
            <Loader isFetching={isFetching} />
          ) : (
            <>
              <Button onClick={onClose} color="blue">
                cancel
              </Button>
              <Button onClick={onConfirm} color="blue">
                confirm
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Modal;
