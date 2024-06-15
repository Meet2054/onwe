'use client'
import React, { useState } from "react";
import Signup from "../../components/Signup";
import Login from "../../components/Login";

const Page: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);

  const switchToSignup = () => {
    setIsLogin(false);
  };

  const switchToLogin = () => {
    setIsLogin(true);
  };

  return (
    <div>
      {isLogin ? <Login switchToSignup={switchToSignup} /> : <Signup switchToLogin={switchToLogin} />}
    </div>
  );
};

export default Page;
