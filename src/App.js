import React, { Component } from 'react';
import pikachuJPG from './pikachu.jpg';
import Helmet from 'react-helmet'
import { Link } from 'react-router-dom'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Helmet>
          <meta charSet="utf-8" />
          <title>Home Page</title>
        </Helmet>
        <header className="App-header">
          <img src={pikachuJPG} className="App-logo" alt="logo" />
          <h1 className="App-title">Bem vindo!</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <Link to={'/random'}>Random</Link>
      </div>
    );
  }
}

export default App;
