import { HashLink } from "react-router-hash-link";
import "../../scss/Footer.scss";
import logo from "../../assets/img/footer-logo.png";
import circle from "../../assets/icons/gray-circle.png";
import { Link } from "react-router-dom";

// Icons 
import facebook from "../../assets/icons/facebook.svg"
import youtube from "../../assets/icons/youtube.svg"
import instagram from "../../assets/icons/instagram.svg"
import linkedin from "../../assets/icons/linkedin.svg"

export default function Footer() {
  return (
    <>
      <div id="Footer">
        <div className="footer">
          <div>
            <img src={logo} alt="" className="footer-logo" />
          </div>
          <div>
            <h1>Useful links</h1>
            <ul>
              <li><HashLink to="/#AboutUs">About us</HashLink></li>
              <li><HashLink to="/#HowToBegin">How to begin</HashLink></li>
              <li><HashLink to="/#WhatPeopleAreSaying">Reviews</HashLink></li>
              <li><HashLink to="/">Sign-up</HashLink></li>
            </ul>
          </div>
          <div className="footer-contact">
            <h1>Contact us</h1>
            <Link to="mailto:contact@sitspace.com" id="email"><p>contact@sitspace.com</p></Link>
          </div>
          <div>
            <h1>Social sites</h1>
            <div className="socials">
              <Link to="https://facebook.com"><img src={facebook} alt="" className="circle" /></Link>
              <Link to="https://youtube.com"><img src={youtube} alt="" className="circle" /></Link>
              <Link to="https://instagram.com"><img src={instagram} alt="" className="circle" /></Link>
              <Link to="https://linkedin.com"><img src={linkedin} alt="" className="circle" /></Link>
            </div>
          </div>
        </div>
        <div className="copyright">
          <p>© 2025 SitSpace</p>
        </div>
      </div>
    </>
  );
}
