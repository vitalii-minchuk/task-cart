import Route from './components/Routing/Route';
import { Routes } from './types';
import Header from './components/Header';
import Cart from './pages/Cart';
import Create from './pages/Create';
import Edit from './pages/Edit';
import Main from './pages/Main';

function App() {
  return (
    <>
      <Header />
      <main>
        <Route path={Routes.HOME}>
          <Main />
        </Route>
        <Route path={Routes.CART}>
          <Cart />
        </Route>
        <Route path={Routes.EDIT}>
          <Edit />
        </Route>
        <Route path={Routes.CREATE}>
          <Create />
        </Route>
      </main>
    </>
  );
}

export default App;
