import React, { Component } from 'react';
import Helmet from 'react-helmet'
import NavMenu from '../../components/NavMenu'
import logo from '../../assets/img/logo.svg';
import './Home.css';
// Redux things
import PropTypes from 'prop-types'
import { connect } from "react-redux";

function getTweets() {
  return (dispatch) => {
    return fetch('http://twitelum-api.herokuapp.com/usuarios/omariosouto/tweets').then( data => data.json() )
      .then((tweets) => {
        dispatch({ type: 'TWEETS__LOAD_ITENS', tweets })
      })
  }
}

function getUserInfo() {
  return (dispatch) => {
    return fetch('http://twitelum-api.herokuapp.com/usuarios/omariosouto').then( data => data.json() )
      .then((userInfo) => {
        dispatch({ type: 'USERINFO__LOAD', userInfo })
      })
  }
}

class Home extends Component {

  static componentInitialData() {
    return [
      getTweets,
      getUserInfo
    ]
  }

  componentDidMount() {
    if(!this.props.userInfo.login) {
      this.props.dispatch(getUserInfo())
    }
    if( this.props.tweets.length === 0 ) {
      this.props.dispatch(getTweets())
    }
  }

  render() {
    return (
      <div className="Home">
        <Helmet title="Home - React Charger" />
        <header className="Home-header">
          <img src={logo} className="Home-logo" alt="logo" />
          <h1 className="Home-title">Welcome to React</h1>
        </header>
        <NavMenu />
        <p className="Home-intro">
          To get started, edit <code>src/pages/Home/index.js</code> and save to reload.
        </p>
        <div>
          Login: { this.props.userInfo && this.props.userInfo.login }
          <ul>
              { this.props.tweets && this.props.tweets.map( (tweet, index) => <li key={index}>{tweet.conteudo}</li> ) }
          </ul>
        </div>
      </div>
    );
  }
}

Home.contextTypes = {
  store: PropTypes.object
};

const mapStateToProps = state => ({
  tweets: state.tweets,
  userInfo: state.userInfo
});

export default connect(mapStateToProps)(Home);