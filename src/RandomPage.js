import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import Helmet from 'react-helmet'

class RandomPage extends Component {
  constructor(props) {
    super(props)

    const isBrowser = typeof window !== undefined

    let initialData;
    if (props.staticContext) {
      console.log('SSR: Server')
      initialData = props.staticContext.initialData
    } else if(isBrowser) {
      initialData = window.__innitialData__
      delete window.__innitialData__
      console.log('SSR: Browser', initialData)
    }

    this.state = {
      repos: initialData
    }
  }
  static requestInitialData() {
    return fetch('https://api.github.com/users/omariosouto/repos')
      .then((response) => response.json())
  }

  componentDidMount() {
    console.log('didMount Only!', this.state.repos)
    if (!this.state.repos) {
      console.log('didMountRequest!')
      RandomPage.requestInitialData()
                .then( repos => { 
                  this.setState({ repos: repos }) 
                })
    }
  }

  render() {
    return (
      <div className="Random">
        <Helmet>
          <meta charSet="utf-8" />
          <title>Random Page</title>
        </Helmet>
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
