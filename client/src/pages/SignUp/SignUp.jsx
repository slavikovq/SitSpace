import "../../scss/SignUp.scss";
import { Link, useNavigate } from "react-router-dom";
import chairs from "../../assets/img/sign.png";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthProvider";
import { registerUser } from "../../models/user";
import { alert } from "../../utils/sweetAlert";

export default function SignUp() {
  const [formData, setFormData] = useState()
  const [info, setInfo] = useState();
  const navigate = useNavigate();
  const { login } = useAuth();

  const sendData = async () => {
    const emailRegex = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
    if (!emailRegex.test(formData.email)) return setInfo("Invalid email format");
  
    const res = await registerUser(formData);
    if(res.status === 201){
      login(res.token);
      alert("success", "Successfully registered.");
      return navigate("/");
    }
    setInfo(res.message);
  }

  const handleInput = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  const handleButton = (e) => {
    e.preventDefault();
    sendData();
  };

  useEffect(() => {
    document.title = "SignUp • SitSpace";
  }, []);

  return (
    <>
      <div className="signup-content">
        <div>
          <img src={chairs} alt="" className="chairs" />
        </div>
        <div className="signup-form">
          <h1>Sign Up</h1>
          <form>
            <input type="text" name="first_name" placeholder="First name" onChange={handleInput}/>
            <input type="text" name="last_name" placeholder="Last name" onChange={handleInput}/>
            <input type="email" name="email" placeholder="Email" onChange={handleInput}/>
            <input type="password" name="password" placeholder="Password" onChange={handleInput}/>
          </form>
          <button onClick={handleButton}>Sign Up</button>
          <p style={{color: "red"}}>{info}</p>
          <p>
            Already have an account? <Link to={"/SignIn"}>Sign In</Link>
          </p>
        </div>
      </div>
    </>
  );
}
