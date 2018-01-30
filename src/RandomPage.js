import React, { Component } from 'react';
import Helmet from 'react-helmet'

class RandomPage extends Component {

  render() {
    return (
      <div className="Random">
        <Helmet>
          <meta charSet="utf-8" />
          <title>Random Page</title>
        </Helmet>
        <h1>This is just another page :)</h1>
      </div>
    );
  }
}

export default RandomPage;
