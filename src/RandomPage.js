import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import Helmet from 'react-helmet'


function getInitialData(props) {
  let initialData;
  const __isBrowser__ = typeof window !== 'undefined' && !!window.__innitialData__
  const __isServer__  = props.staticContext

  if(__isBrowser__) { console.log('SSR: Browser', window.__innitialData__)
    initialData = window.__innitialData__
    delete window.__innitialData__
  } 
  if(__isServer__) { console.log('SSR: Server')
    initialData = props.staticContext.initialData
  }
  return initialData || {}
}

class RandomPage extends Component {
  constructor(props) {
    super(props)


    let initialData = getInitialData(props); 

    this.state = {
      repos: initialData.repos,
      posts: initialData.posts,
    }

    console.log(this.state)
  }

  static requestInitialData() {
    return {
      // posts: fetch('https://api.github.com/users/omariosouto').then( data => data.json() ),
      repos: fetch('https://api.github.com/users/omariosouto/repos').then( data => data.json() )
   }
  }

  componentDidMount() {
    console.log('didMount!', this.state.repos)
    if (!this.state.repos) {
      console.log('didMount but no repos in state, let`s Request!')
      this.setState({ repos: [{ name: 'Mario' }, {name: 'Art'}] })
      // --[FAZER O SETSTATE]--
      // this.setState({ repos: repos }) 
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
