import React, { useState } from "react";
import Image from "next/image";
import back from "../../public/images/back.png";
import logo from "../../public/images/onwelogo.svg";
import rightArrow from "../../public/images/right-arrow.png";

interface SignupProps {
  switchToLogin: () => void;
}

const Signup: React.FC<SignupProps> = ({ switchToLogin }) => {
  const [showCodeInput, setShowCodeInput] = useState(false);

  const handleGetCodeClick = () => {
    setShowCodeInput(true);
  };

  return (
    <div className="relative flex items-center justify-center h-screen bg-gray-100">
      <Image
        src={back}
        alt="Background"
        layout="fill"
        objectFit="cover"
        className="absolute z-0"
      />
      <div className="relative z-10 p-6 bg-white bg-opacity-50 rounded-2xl shadow-lg w-full max-w-md">
        <form className="space-y-6">
          <div className="flex justify-center mb-4">
            <Image src={logo} alt="Logo" width={150} height={150} />
          </div>
          <span className="block text-center text-2xl font-semibold">
            Welcome onboard!
          </span>
          <div className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              className="w-full px-3 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="text"
              placeholder="Create Username"
              className="w-full px-3 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="border-b-2 my-4"></div>
          <div className="space-y-4">
            <input
              type="password"
              placeholder="Create Password"
              className="w-full px-3 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="password"
              placeholder="Password Again"
              className="w-full px-3 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="border-b-2 my-4"></div>
          {!showCodeInput ? (
            <div
              className="cursor-pointer text-center py-2 border rounded-xl  bg-white"
              onClick={handleGetCodeClick}
            >
              Get Code
            </div>
          ) : (
            <input
              type="text"
              placeholder="Enter Code"
              className="w-full px-3 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          )}
          <button
            type="submit"
            className="w-full flex items-center justify-center px-4 py-2 bg-black text-white border rounded-xl"
          >
            <span>Next</span>
            <Image src={rightArrow} alt="Right Arrow" width={20} height={20} />
          </button>
          <span
            onClick={switchToLogin}
            className="block text-center text-blue-500 cursor-pointer"
          >
            I have an account
          </span>
        </form>
      </div>
    </div>
  );
};

export default Signup;
