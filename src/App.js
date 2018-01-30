import React, { Component } from 'react';
import pikachuJPG from './pikachu.jpg';
import Helmet from 'react-helmet'
import './App.css';

class App extends Component {

  componentWillMount() {
  }
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
      </div>
    );
  }
}

export default App;
