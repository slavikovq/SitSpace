import logo from "../../assets/img/logo.png";
import "../../scss/NotFound.scss";

export default function NotFound() {
  return (
    <>
      <div className="loading">
        <div className="logoBox">
          <div className="spinnerBox">
            <div className="spinner"></div>
          </div>
          <img src={logo} alt="logo" className="logo" />
          <h1 style={{marginTop: "20px"}}>404 - Page not found</h1>
          <p>Sorry, the page you are looking for does not exist.</p>
        </div>
      </div>
    </>
  );
}