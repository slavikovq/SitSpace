import { useState } from "react";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";

import logo from "../../assets/img/logo.png";
import bars from "../../assets/icons/bars.svg";
import "../../scss/Navbar.scss";

import { useAuth } from "../../context/AuthProvider";

export default function Navbar() {
  const { user } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="list">
        <Link to="/">
          <img src={logo} alt="SitSpace logo" className="logo" />
        </Link>

        <button
          className="hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <img src={bars} alt="Menu" />
        </button>

        <div className={`menu ${menuOpen ? "open" : ""}`}>
          <ul>
            <li>
              <HashLink to="/#AboutUs" onClick={() => setMenuOpen(false)}>About us</HashLink>
            </li>
            <li>
              <HashLink to="/#HowToBegin" onClick={() => setMenuOpen(false)}>How to begin</HashLink>
            </li>
            <li>
              <HashLink to="/#WhatPeopleAreSaying" onClick={() => setMenuOpen(false)}>Reviews</HashLink>
            </li>
            <li>
              <HashLink to="/#Footer" onClick={() => setMenuOpen(false)}>Contact</HashLink>
            </li>
          </ul>

          <div className="menu-buttons">
            {user ? (
              <Link
                to={"/sitManager/seatingPlans"}
                className="start-button"
                id="full"
                onClick={() => setMenuOpen(false)}
              >
                Sit Manager
              </Link>
            ) : (
              <Link
                to={"/SignIn"}
                className="start-button"
                onClick={() => setMenuOpen(false)}
              >
                Sign in now
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
