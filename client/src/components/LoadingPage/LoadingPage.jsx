import logo from "../../assets/img/logo.png";
import "../../scss/LoadingPage.scss";
import { Link } from "react-router-dom";

export default function LoadingPage({extra = ""}) {
  return (
    <>
      <div className="loading">
        <div className="logoBox">
          <img src={logo} alt="logo" className="logo" />
          {extra !== "" ? (
            <>  
              <h3>{extra}</h3>
              <Link to={"/sitManager/seatingPlans"}  id="back">Return back</Link>
            </>
          ) : ""}
          <div className="spinnerBox">
            <div className="spinner"></div>
          </div>
        </div>
      </div>
    </>
  );
}