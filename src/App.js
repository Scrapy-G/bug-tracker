import './App.css';
import Dashboard from './pages/Dashboard';
import IssueDetail from './pages/IssueDetail';
import ReportBug from './pages/ReportBug';
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Login } from './components/Login';
import { createContext, useState } from 'react';

export const authContext = createContext();

function App() {

  //user is logged in if token in local storage
  const [user, setUser] = useState(localStorage.getItem('token') ? true : false);

  const ProvideAuth = ({children}) => {
    return (
      <authContext.Provider value={{ user, setUser }}>
        {children}
      </authContext.Provider>
    )
  }

  const PrivateRoute = ({component: Component, ...rest}) => (
    <Route
      {...rest}
      render = {props =>
        user ? (<Component {...props} />) :
        (<Redirect to={{pathname:`${process.env.PUBLIC_URL}/login`}} />)}
    />
  )

  return (
    <div className="App">
      <ProvideAuth>
        <Router basename='/apps/issuetracker'>
          <Route path={`${process.env.PUBLIC_URL}/`}><Header/></Route>
          <Route path={`${process.env.PUBLIC_URL}/login`}>
            <Login />
          </Route>
          <PrivateRoute path={`${process.env.PUBLIC_URL}/dashboard`} exact component={Dashboard}/>
          <PrivateRoute path={`${process.env.PUBLIC_URL}/`} exact component={Dashboard}/>
          <PrivateRoute path={`${process.env.PUBLIC_URL}/issue/:id`} component={IssueDetail} />
          <Route path={`${process.env.PUBLIC_URL}/report`} component={ReportBug} />
        </Router>
      </ProvideAuth>
    </div>
  );
}

export default App;
