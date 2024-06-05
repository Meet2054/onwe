import React, { useState } from "react";
import "../../styles/Middlesection.css";
import back from "../../images/back.png";
import logo from "../../images/onwelogo.svg";
import { useNavigate } from "react-router-dom";
import left from "../../images/left-arrow.png";
import right from "../../images/right-arrow.png";
const Signup = () => {
  const navigate = useNavigate();
  const [showCodeInput, setShowCodeInput] = useState(false);
  const [handleSignup, setHandleSignup] = useState(false);
  const redirectSignUp = () => {
    navigate("/login");
  };
  const handleSignUp = () => {
    if (handleSignup == false) {
      setHandleSignup(true);
    } else {
      setHandleSignup(false);
    }
  };
  const handleGetCodeClick = () => {
    setShowCodeInput(true);
  };
  const [selected, setSelected] = useState("Female");
  const handleRadio = (type) => {
    if (type == "Male") {
      setSelected("Male");
    } else if (type == "Female") {
      setSelected("Female");
    } else {
      setSelected("Others");
    }
  };
  return (
    <div>
      {!handleSignup && (
        <div className="SignUp">
          <img src={back} alt="" />
          <form action="" className="signup-form">
            <img src={logo} alt="" />
            <span>Welcome onboard!</span>
            <div>
              <input type="email" placeholder="Email" required />
              <input type="text" placeholder="Create Username" required />
            </div>
            <span className="underline"></span>
            <div>
              <input type="password" placeholder="Create Password" required />
              <input type="password" placeholder="Password Again" required />
            </div>
            <span className="underline"></span>
            {!showCodeInput && (
              <div className="Getcode" onClick={handleGetCodeClick}>
                <span>Get Code</span>
              </div>
            )}
            {showCodeInput && (
              <div>
                <input type="text" placeholder="Enter Code" required />
              </div>
            )}
            <button onClick={handleSignUp}>
              <span>Next </span>
              <img src={right} alt="" width="20" />
            </button>
            <span onClick={redirectSignUp}>I have an account</span>
          </form>
        </div>
      )}
      {handleSignup && (
        <div className="user-d">
          <img src={back} alt="" />
          <form action="" className="user-d-form">
            <img src={logo} alt="" />
            <h3>Welcome onboard!</h3>
            <div className="radio-options">
              <div onClick={() => handleRadio("Male")}>
                <label
                  htmlFor="male"
                  style={{
                    color: selected == "Male" ? "black" : "rgb(199, 195, 195)",
                  }}
                >
                  Male
                </label>
                <input
                  type="radio"
                  id="male"
                  name="gender"
                  checked={selected === "Male"}
                />
              </div>
              <span></span>
              <div onClick={() => handleRadio("Female")}>
                <label
                  htmlFor="female"
                  style={{
                    color:
                      selected == "Female" ? "black" : "rgb(199, 195, 195)",
                  }}
                >
                  Female
                </label>
                <input
                  type="radio"
                  id="female"
                  name="gender"
                  checked={selected === "Female"}
                />
              </div>
              <span></span>
              <div onClick={() => handleRadio("Others")}>
                <label
                  htmlFor="others"
                  style={{
                    color:
                      selected == "Others" ? "black" : "rgb(199, 195, 195)",
                  }}
                >
                  Others
                </label>
                <input
                  type="radio"
                  id="others"
                  name="gender"
                  checked={selected === "Others"}
                />
              </div>
            </div>
            <input
              className="input-age"
              type="age"
              placeholder="Age"
              required
            />
            <span className="underline"></span>
            <input
              className="input-dep"
              type="text"
              placeholder="Department"
              required
            />
            <button>Join the community!</button>
            <div onClick={handleSignUp} className="previous">
              <img src={left} alt="" width="15" />
              <span>previous</span>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Signup;
