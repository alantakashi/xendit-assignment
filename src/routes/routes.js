import Home from '../modules/home';
import SearchResult from '../modules/search';
import Newsletter from '../modules/newsletter';
import Favourite from '../modules/favourite';
import Login from '../modules/user/login';
import Register from '../modules/user/register';

const routes = [
  {
    path: '/',
    component: Home,
    auth: false,
    header: true,
    exact: true
  }, {
    path: '/search-result',
    component: SearchResult,
    auth: false,
    header: true,
    exact: true
  }, {
    path: '/newsletter',
    component: Newsletter,
    auth: false,
    header: true,
    exact: true
  }, {
    path: '/favourite',
    component: Favourite,
    auth: false,
    header: true,
    exact: true
  }, {
    path: '/login',
    component: Login,
    auth: false,
    header: false,
    exact: true
  }, {
    path: '/register',
    component: Register,
    auth: false,
    header: false,
    exact: true
  }
]

export default routes