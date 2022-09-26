const goBackHome = () => {
  window.history.pushState({}, '', '/');
  const navEvent = new PopStateEvent('popstate');
  window.dispatchEvent(navEvent);
};
export default goBackHome;
