import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import Helmet from 'react-helmet'


class RandomPage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      repos: [ { name: 'Mario'} , { name: 'Art' } ]
    }
  }

  componentDidMount() {
    console.log('didMount!', this.state.repos)
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
            return (<li key={index}>{ repo.name }</li>)
          })}
        </ul>
      </div>
    );
  }
}

export default RandomPage;
