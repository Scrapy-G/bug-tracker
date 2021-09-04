import './App.css';
import Dashboard from './pages/Dashboard';
import IssueDetail from './pages/IssueDetail';
import ReportBug from './pages/ReportBug';
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Login } from './components/Login';
import { Component, createContext, useContext, useEffect, useState } from 'react';

export const authContext = createContext();

function App() {

  const [isAuth, setAuth] = useState(false);
  console.log(isAuth);
  useEffect(() => {
    fetch('http://localhost/bugtracker/checkuser.php')
    .then(response => response.text())
    .then(response => {
      console.log("useEffect: ", response);
      if(response !== 'false') {
        setAuth(true);
      }
    })
  }, []);

  async function authenticate(formData) {
    return fetch('http://localhost/bugtracker/login.php', {
        method: 'post',
        body: formData
    })
    .then(response => response.text())
    .then((response => {
        console.log(response);
        if(response == 'success'){
            setAuth(true);
        }}))
    .catch(error => console.log(error));
  }

  const logout = () => {
    fetch('http://localhost/bugtracker/logout.php')
    .then(response => response.text())
    .then(setAuth(false))
    .then(<Redirect to='/login' />);

    console.log("logout: ", isAuth);
  }

  const ProvideAuth = ({children}) => {
    return (
      <authContext.Provider value={{isAuth, authenticate, logout}}>
        {children}
      </authContext.Provider>
    )
  }

  const PrivateRoute = ({component: Component, ...rest}) => (
    <Route
      {...rest}
      render = {props =>
        isAuth ? (<Component {...props} />) :
        (<Redirect to={{pathname:'/login'}} />)}
    />
  )

  return (
    <div className="App">
      <ProvideAuth>
        <Router>
          <Route path='/'><Header/></Route>
          <Route path='/login'>
            <Login />
          </Route>
          <Route path='/' exact component={Dashboard}/>
          <PrivateRoute path='/issue/:id' component={IssueDetail} />
          <Route path='/report' component={ReportBug} />
        </Router>
      </ProvideAuth>
    </div>
  );
}

export default App;
