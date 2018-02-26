import React from 'react'
import { Link } from 'react-router-dom'

export default function NavMenu () {
    return (
        <nav>
            <li>
                <Link to="/">Home</Link>
            </li>
            <li>
                <Link to="/about">About</Link>
            </li>
            <li>
                <Link to="/tweets">Tweets</Link>
            </li>
            <li>
                <Link to="/pagefalse">Page false</Link>
            </li>
        </nav>
    )
}