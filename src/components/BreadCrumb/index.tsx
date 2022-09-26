import { Routes } from '../../types';
import Link from '../Routing/Link';
import styles from './BreadCrumb.module.css';

function BreadCrumb() {
  const page = window.location.pathname.slice(1);
  return (
    <div className={styles.box}>
      <Link href={Routes.HOME}>
        <span>Home</span>
      </Link>
      <span>|</span>
      <span>{page}</span>
    </div>
  );
}

export default BreadCrumb;
