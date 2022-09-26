import { Product } from '../../../types';

interface LinkProps {
  href: string;
  children: JSX.Element | string;
  obj?: Product;
}

function Link({ obj, href, children }: LinkProps) {
  const handleCLick = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    window.history.pushState(obj, '', href);

    const navEvent = new PopStateEvent('popstate');
    window.dispatchEvent(navEvent);
  };
  return (
    <a onClick={handleCLick} href={href}>
      {children}
    </a>
  );
}

Link.defaultProps = {
  obj: {},
};

export default Link;
