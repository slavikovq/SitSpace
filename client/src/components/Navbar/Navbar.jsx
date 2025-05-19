import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";

import logo from "../../assets/img/logo.png";
import "../../scss/Navbar.scss";

export default function Navbar() {
  return (
    <>
      <nav className="navbar">
        <div className="list">
          <div>
            <Link to="/">
              <img src={logo} alt="SitSpace logo" className="logo" />
            </Link>
          </div>
          <div className="menu">
            <ul>
              <li><HashLink to="/#AboutUs">About us</HashLink></li>
              <li><HashLink to="/#HowToBegin">How to begin</HashLink></li>
              <li><HashLink to="/#WhatPeopleAreSaying">Reviews</HashLink></li>
              <li><HashLink to="/#Footer">Contact</HashLink></li>
            </ul>
          </div>
        </div>

        <div>
          <button className="start-button">Get started now</button>
        </div>
      </nav>
    </>
  );
}
