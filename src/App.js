import { Route, Router, Switch } from 'react-router';
import './App.css';
import 'antd/dist/antd.css';
import { createBrowserHistory } from 'history';
import UserLoginTemplate from './template/LoginTemplate/UserLoginTemplate';
import HomeTemplate from 'template/HomeTemplate/HomeTemplate';
import DrawerComponent from 'components/Drawer/Drawer,';
import { ClientRoutes } from 'routes';
import UserLogin from 'pages/UserLogin/UserLogin';
import Loading from 'components/Loading/Loading';
import { Suspense, lazy } from 'react';
import PageNotFound from './pages/PageNotFound/PageNotFound';
import { USER_LOGIN } from 'utils/SettingSystem/SettingSystem';


const HomeTemplateLazy = lazy(() => import('./template/HomeTemplate/HomeTemplate.js'))


export const history = createBrowserHistory()

function App() {

  const renderRouter = (routes, Layout) => {
    return routes.map((item, index) => {
      return <Layout
        key = {index}
        exact = {item.exact}
        path = { item.path}
        Component = {item.Component}
        isPrivate = {item.isPrivate}
      />
    })
  }

  return (
    <Router history={history}>
      <DrawerComponent/>
      <Loading/>
      <Switch>
        {/* { localStorage.getItem(USER_LOGIN) ? <UserLoginTemplate exact path="/" Component={UserLogin}/> : ''} */}
        <UserLoginTemplate exact path="/userlogin" Component={UserLogin}/>
        {/* <Suspense fallback={<Loading/>}>
          
        </Suspense> */}
        {renderRouter(ClientRoutes, HomeTemplate)}
        <Route path="*" component={PageNotFound}/>
      </Switch>
    </Router>
  );
}

export default App;
