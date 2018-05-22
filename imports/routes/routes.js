import {Meteor} from 'meteor/meteor';
import React from 'react';
import { Router, Route, Switch,Redirect } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import SignUp from '../ui/Signup';
import Dashboard from '../ui/Dashboard';
import NotFound from '../ui/NotFound';
import Login from '../ui/Login';



const history = createHistory();
const unauthenticatedPages = ['/', '/signup'];
const authenticatedPages = ['/dashboard'];
 
export const onAuthChange = (isAuthenticated)=>{
   const pathname = history.location.pathname;
  const isAuthenticatedPage = authenticatedPages.includes(pathname);
  const isUnauthenticatedPage = unauthenticatedPages.includes(pathname);
  if (isUnauthenticatedPage && isAuthenticated){
    history.replace('/dashboard');
  } else if (isAuthenticatedPage && !isAuthenticated){
    history.replace('/');
  }
}
export const routes =(
<Router history={history}>
     <Switch>
         <Route path='/'  exact={true} render={() => {return Meteor.userId() ? <Redirect to="/dashboard" /> : <Login />}} />
         <Route path='/signup'   render={() => {return Meteor.userId() ? <Redirect to="/Dashboard" /> : <SignUp /> }}/>
         <Route path='/dashboard' render={() => {return Meteor.userId() ? <Dashboard/> : <Login /> }} />
         <Route path='*' component={NotFound}/>
         
     </Switch>
</Router>
);