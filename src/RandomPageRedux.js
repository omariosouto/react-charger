import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { connect } from "react-redux";

function getRepos(externalInfo = { cookies: [] }) {
  return (dispatch) => {
    console.log('pega reposs!')
    return fetch('https://api.github.com/users/omariosouto')
            .then( data => data.json() )
            .then( data => {
              
              console.log('externalInfo: ',externalInfo.cookies)
              
              dispatch( { type: 'CHAT__LOAD_ITENS' } )
              return 0
            })
            .then( data => {
              dispatch( { type: 'REPOS__LOAD_ITENS' } )
            })
  }
}

class RandomPageRedux extends Component {

  componentWillMount() {
    this.context.store.subscribe(() => {
      this.setState( { repos: this.context.store.getState().repos } )
    })
  }
  
  componentDidMount() {
    // this.context.store.dispatch({ type: 'LOAD_ITENS' })
    console.log(this.props)
    if( this.props.repos.length === 0 ) {
      console.log('REQUESTAO!')
      this.props.dispatch(getRepos())
    }
  }
  
  static requestInitialData(externalInfo) {
    return getRepos(externalInfo)
  }
  
  render() {
    const { repos } = this.props;
    return (
      <div className="Random">
          <Helmet title="Random Page"/>
          <Link to="/">Home</Link>
        <h1>This is just another page :)</h1>
        <ul>
          {repos && repos.map( (repo,index) => {
            return (<li key={index}>{ repo }</li>)
          })}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  repos: state.repos,
  chat: state.chat,  
});

export default connect(mapStateToProps)(RandomPageRedux);

RandomPageRedux.contextTypes = {
  store: PropTypes.object
};