import { useEffect, useState } from 'react';

interface RouteProps {
  children: JSX.Element;
  path: string;
}

function Route({ path, children }: RouteProps) {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const onLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener('popstate', onLocationChange);

    return () => window.removeEventListener('popstate', onLocationChange);
  }, []);

  return currentPath === path ? children : null;
}

export default Route;
