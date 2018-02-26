import React from 'react'
import Helmet from 'react-helmet'
import NavMenu from '../../components/NavMenu'

const NotFound = () => {
    return (
        <div>
            <Helmet title="NotFound - React Charger" />
            Not Found Page: 404
            <NavMenu />
        </div>
    )
}

export default NotFound