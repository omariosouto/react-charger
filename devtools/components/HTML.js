import React from 'react';
import { renderToString } from 'react-dom/server';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
// import CircularJSON from 'circular-json';

const Html = ({ assets, component, store }) => {
    const head = Helmet.rewind();
    const body = component ? renderToString(component) : '';
    return (
<html lang="en-US">
    <head>

        {assets.styles && <link rel="stylesheet" href={assets.styles.main}/>}
    </head>
    <body>
        <div id="root" dangerouslySetInnerHTML={{ __html: body }} />
    </body>
</html>
    )
}