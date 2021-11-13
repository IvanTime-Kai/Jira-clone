import { Route, Router, Switch } from 'react-router';
import './App.css';
import 'antd/dist/antd.css';
import { createBrowserHistory } from 'history';
import UserLoginTemplate from './template/LoginTemplate/UserLoginTemplate';
import CyberBugsTempalte from 'template/CyberBugsTemplate/CyberBugsTemplate';
import HomeTemplate from 'template/HomeTemplate/HomeTemplate';
import DrawerComponent from 'components/Drawer/Drawer,';
import { ClientRoutes } from 'routes';
import UserLogin from 'pages/UserLogin/UserLogin';
import Loading from 'components/Loading/Loading';
import { Suspense, lazy } from 'react';
import PageNotFound from './pages/PageNotFound/PageNotFound';
import indexCyberBugs from 'redux/sagas/Cyberbugs/indexCyberBugs';


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
      />
    })
  }

  return (
    <Router history={history}>
      <DrawerComponent/>
      <Loading/>
      <Switch>
        <CyberBugsTempalte exact path="/cyberbugs" Component={indexCyberBugs}/>
        <UserLoginTemplate exact path="/" Component={UserLogin}/>
        <UserLoginTemplate exact path="/userlogin" Component={UserLogin}/>
       
        <Suspense fallback={<Loading/>}>
          {renderRouter(ClientRoutes, HomeTemplateLazy)}
          <Route path="*" component={PageNotFound}/>
        </Suspense>
       
      </Switch>
    </Router>
  );
}

export default App;
