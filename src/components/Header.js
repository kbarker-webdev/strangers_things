import React from "react";
import './Header.css'


import {
    BrowserRouter as Router,
    Link
  } from "react-router-dom";

const Header = () => {
    return  <nav className="header">
            <p>Stranger's Things</p>
            <ul>
                <li>
                    <Link className="navlinks" to="/">HOME</Link>
                </li>
                <li>
                    <Link className="navlinks" to="/posts">POSTS</Link>
                </li>
                <li>
                    <Link className="navlinks" to="/profile">PROFILE</Link>
                </li>
                <li>
                    <Link className="navlinks" to="/logout">LOG OUT</Link>
                </li>
            </ul>
    </nav>
}

export default Header;