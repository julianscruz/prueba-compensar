import { useContext, useState, useEffect } from 'react'
import { userContext } from './context';
import compensarLogo from './assets/logo.png'
import { Route, Router, Switch, Redirect } from 'wouter';
import Session from './session'
import User from './pages/user'
import Login from './pages/login'
import Register from './pages/register'
import Survey from './pages/survey'

import './App.css'

const MobileMessage = () => {
  return (
    <div className='mobile'>
      <p>Esta prueba solo está disponible para navegadores de escritorio.</p>
    </div>
  );
};

function App() {
  const { user } = useContext(userContext);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const userAgent = navigator.userAgent.toLowerCase();
    //const isMobileDevice = /iphone|ipad|ipod|android|blackberry|windows phone|webos|tablet|mobile/i.test(userAgent);
    const isMobileDevice = /iphone|ipod|android|blackberry|windows phone|webos|tablet|mobile/i.test(userAgent);
    setIsMobile(isMobileDevice);
  }, []);

  if (isMobile) {
    return < MobileMessage />
  } else {
    return (
      <>
        <img src={compensarLogo} className="logo" alt="Compensar logo" />
        <Session />
        <Router>
          <Switch>
            <Route path="/login">
              {user ? <Redirect to="/survey" /> : <Login />}
            </Route>
            <Route path="/register">
              {user ? <Redirect to="/survey" /> : <Register />}
            </Route>
            <Route path="/survey">
              {user ? <Survey /> : <Redirect to="/login" />}
            </Route>
            <Route path="/user">
              {user ? <User /> : <Redirect to="/login" />}
            </Route>
            <Route path="/">
              {user ? <Redirect to="/survey" /> : <Redirect to="/login" />}
            </Route>
          </Switch>
        </Router>
      </>
    )
  }
}

export default App
