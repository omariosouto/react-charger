import React, { Component } from 'react';
import Helmet from 'react-helmet'
import logo from './logo.svg';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props)

    const isServer = typeof window === 'undefined'
    if(isServer) {
      console.log('No server:', props.staticContext.initialData.userInfo.login)
      this.state = {
        userInfo: props.staticContext.initialData.userInfo,
        tweets: props.staticContext.initialData.tweets
      }
    } else {
      this.state = {
        userInfo: window.__initialData__.userInfo || {},
        tweets: window.__initialData__.tweets || []
      }
    }

  }
  
  static componentInitialData() {
    return {
      userInfo: fetch('http://twitelum-api.herokuapp.com/usuarios/omariosouto').then( data => data.json() ),
      tweets: fetch('http://twitelum-api.herokuapp.com/usuarios/omariosouto/tweets').then( data => data.json() )
   }
  }

  componentDidMount() {
    if(!this.state.userInfo.login) {
      fetch('http://twitelum-api.herokuapp.com/usuarios/omariosouto').then(response => response.json())
        .then((responseInJSON) => {
          this.setState({
            userInfo: responseInJSON
          })
        })
    }
    if(this.state.tweets.length === 0) {
      fetch('http://twitelum-api.herokuapp.com/usuarios/omariosouto/tweets').then(response => response.json())
        .then((responseInJSON) => {
          this.setState({
            tweets: responseInJSON
          })
        })
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
        <div>
          Login: { this.state.userInfo && this.state.userInfo.login }
          <ul>
              { this.state.tweets && this.state.tweets.map( (tweet, index) => <li key={index}>{tweet.conteudo}</li> ) }
          </ul>
        </div>
      </div>
    );
  }
}

export default App;