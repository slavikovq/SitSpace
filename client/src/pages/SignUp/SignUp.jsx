import "../../scss/SignUp.scss";
import { Link } from "react-router-dom";
import chairs from "../../assets/img/sign.png";

export default function SignUp() {
  return (
    <>
      <div className="signup-content">
        <div>
          <img src={chairs} alt="" className="chairs" />
        </div>
        <div className="signup-form">
          <h1>Sign Up</h1>
          <form>
            <input type="text" name="" id="" placeholder="First name" />
            <input type="text" name="" id="" placeholder="Last name" />
            <input type="email" name="" id="" placeholder="Email" />
            <input type="password" name="" id="" placeholder="Password" />
          </form>
          <button>Sign Up</button>
          <p>
            Already have an account? <Link to={"/SignIn"}>Sign In</Link>
          </p>
        </div>
      </div>
    </>
  );
}
