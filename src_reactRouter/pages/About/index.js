import React, { Component } from 'react'
import Helmet from 'react-helmet'
import NavMenu from '../../components/NavMenu'

class About extends Component {
    render() {
        return (
            <div className="AboutPage">
                <Helmet title="About - React Charger" />
                This is an example of about page, you can put anything here :)
                <NavMenu />
            </div>
        )
    }
}

export default About