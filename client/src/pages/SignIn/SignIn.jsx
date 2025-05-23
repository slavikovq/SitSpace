import "../../scss/SignIn.scss";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import chairs from "../../assets/img/sign.png";
import { alert } from "../../utils/sweetAlert";
import { useAuth } from "../../context/AuthProvider";
import { loginUser } from "../../models/user";

export default function SignIn() {
  const [formData, setFormData] = useState()
  const [info, setInfo] = useState();
  const navigate = useNavigate();
  const { login } = useAuth();

  const sendData = async () => {
    const res = await loginUser(formData);
    if (res.status === 200) {
      login(res.token);
      alert("success", "Logged in succesfully.");
      navigate("/");
    }
    setInfo(res.message);
  };

  const handleInput = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleButton = (e) => {
    e.preventDefault();
    sendData();
  };

  useEffect(() => {
    document.title = "SignIn • SitSpace";
  }, []);

  return (
    <>
      <div className="signin-content">
        <div className="signin-form">
          <h1>Sign In</h1>
          <form>
            <input type="email" name="email" placeholder="Email" onChange={handleInput} />
            <input type="password" name="password" placeholder="Password" onChange={handleInput} />
            <p style={{color: "red", marginBottom: "10px"}}>{info}</p>
            <div id="formBtn">
              <button onClick={handleButton}>Sign In</button>
            </div>
          </form>
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
