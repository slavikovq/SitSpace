import "../../scss/Hero.scss";
import { HashLink } from "react-router-hash-link";

export default function Hero() {
  return (
    <>
      <div className="hero">
        <div className="content">
          <h1>Take control of your seating plan</h1>
          <p>A simple tool for creating seating plans</p>
          <div className="buttons">
            <button className="GS-button">Get Started</button>
            <HashLink to={"/#AboutUs"} className="AU-button">About us</HashLink>
          </div>
        </div>
      </div>
    </>
  );
}
