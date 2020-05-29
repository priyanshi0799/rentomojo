import React from 'react';
import {BrowserRouter, Route, Switch, useHistory} from 'react-router-dom';
import Home from './components/Home'
import CreateAccount from './components/CreateAccount'
import Profile from './components/Profile';
import './App.css';

function App() {
  return (
      <BrowserRouter>
        <Route exact path='/'>
          <Home />
        </Route>
        <Route exact path='/home'>
          <Home />
        </Route>
        <Route path='/profile/:id'>
          <Profile />
        </Route>
        <Route exact path='/createaccount/:id'>
          <CreateAccount />
        </Route>
        <Route exact path='/createaccount'>
          <CreateAccount />
        </Route>
        </BrowserRouter>
  );
}

export default App;
