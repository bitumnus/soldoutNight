import React from 'react';
import './App.css';
import SearchContainer from './components/SearchContainer';
// import SearchResult from './components/SearchResult/SearchResult/';
import SearchResult from './components/SearchResult'
import {Route, Switch} from 'react-router-dom';
import Profile from './components/Profile';

function App() {
  return (
    <div>
      <Switch>
        <Route path="/" exact component={SearchContainer} />
        {/* <Route path="/search/:searchType/:value" component={SearchResult} /> */}
        <Route path="/search" component={SearchResult} />
        <Route path="/user/:user" component={Profile} />
      </Switch>
    </div>
  );
}

export default App;
