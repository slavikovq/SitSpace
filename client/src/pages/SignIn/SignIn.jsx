import "../../scss/SignIn.scss";
import { Link } from "react-router-dom";
import chairs from "../../assets/img/sign.png";

export default function SignIn() {
  return (
    <>
      <div className="signin-content">
        <div className="signin-form">
          <h1>Sign In</h1>
          <form>
            <input type="email" name="" id="" placeholder="Email" />
            <input type="password" name="" id="" placeholder="Password" />
          </form>
          <button>Sign Up</button>
          <p>
            Do not have an account? <Link to={"/SignUp"}>Sign Up</Link>
          </p>
        </div>
        <div>
          <img src={chairs} alt="" className="chairs" />
        </div>
      </div>
    </>
  );
}
