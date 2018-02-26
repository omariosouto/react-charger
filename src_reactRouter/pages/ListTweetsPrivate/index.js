import React, { Component } from 'react';
import Helmet from 'react-helmet'
import NavMenu from '../../components/NavMenu'
import logo from '../../assets/img/logo.svg';
import './ListTweetsPrivate.css';

class ListTweetsPrivate extends Component {

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
      <div className="ListTweetsPrivate">
        <Helmet title="ListTweetsPrivate - React Charger" />
        <header className="ListTweetsPrivate-header">
          <img src={logo} className="ListTweetsPrivate-logo" alt="logo" />
          <h1 className="ListTweetsPrivate-title">Welcome to React, this is an async component that still server render</h1>
        </header>
        <NavMenu />
        <p className="ListTweetsPrivate-intro">
          To get started, edit <code>src/pages/ListTweetsPrivate/index.js</code> and save to reload.
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

export default ListTweetsPrivate;