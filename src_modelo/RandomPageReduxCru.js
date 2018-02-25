import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'

function getRepos() {
  return (dispatch) => {
    dispatch( { type: 'REPOS__LOAD_ITENS' } )
  }
}

class RandomPageRedux extends Component {
  constructor(props) {
    super(props)

    this.state = {
      repos: []
    }
  }

  componentWillMount() {
    this.context.store.subscribe(() => {
      this.setState( { repos: this.context.store.getState().repos } )
    })
  }

  componentDidMount() {
    // this.context.store.dispatch({ type: 'LOAD_ITENS' })
    this.context.store.dispatch(getRepos())
  }

  static requestInitialData() {
    return {
      
    }
  }

  render() {
    return (
      <div className="Random">
          <Helmet title="Random Page"/>
          <Link to="/">Home</Link>
        <h1>This is just another page :)</h1>
        <ul>
          {this.state.repos && this.state.repos.map( (repo,index) => {
            return (<li key={index}>{ index }</li>)
          })}
        </ul>
      </div>
    );
  }
}

export default RandomPageRedux;

RandomPageRedux.contextTypes = {
  store: PropTypes.object
};