import React from "react";
import "../../styles/Middlesection.css";
import back from "../../images/back.png";
import logo from "../../images/onwelogo.svg";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const navigate = useNavigate();
  const redirectSignUp = () => {
    navigate("/signup");
  };
  return (
    <div className="login">
      <img src={back} alt="" />
      <form action="" className="login-form">
        <img src={logo} alt="" />
        <span>Welcome onboard!</span>
        <input type="email" placeholder="username or email" required />
        <input type="password" placeholder="password" required />
        <button>Login</button>
        <span onClick={redirectSignUp}>new user?</span>
      </form>
    </div>
  );
};

export default Login;
