import logo from "../../assets/img/logo.png";
import "../../scss/LoadingPage.scss";

export default function LoadingPage() {
  return (
    <>
      <div className="loading">
        <div className="logoBox">
          <img src={logo} alt="logo" className="logo" />
          <div className="spinnerBox">
            <div className="spinner"></div>
          </div>
        </div>
      </div>
    </>
  );
}