import React, { Component } from 'react';
import Helmet from 'react-helmet'
import logo from './logo.svg';
import './App.css';

class App extends Component {
  
  static componentInitialData() {
    return {
      posts: fetch('https://api.github.com/users/omariosouto').then( data => data.json() ),
      repos: fetch('https://api.github.com/users/omariosouto/repos').then( data => data.json() )
   }
  }

  render() {
    return (
      <div className="App">
        <Helmet title="App - React Charger" />
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;