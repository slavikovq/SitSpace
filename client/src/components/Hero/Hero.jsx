import "../../scss/Hero.scss";
import { HashLink } from "react-router-hash-link";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <>
      <div className="hero">
        <div className="content">
          <h1>Take control of your seating plan</h1>
          <p>A simple tool for creating seating plans</p>
          <div className="buttons">
            <Link to="/signUp" className="GS-button">Get Started</Link>
            <HashLink to={"/#AboutUs"} className="AU-button">About us</HashLink>
          </div>
        </div>
      </div>
    </>
  );
}
