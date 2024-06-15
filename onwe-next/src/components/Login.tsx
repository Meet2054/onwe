import React from "react";
import Image from "next/image";
import back from "../../public/images/back.png";
import logo from "../../public/images/onwelogo.svg";

interface LoginProps {
  switchToSignup: () => void;
}

const Login: React.FC<LoginProps> = ({ switchToSignup }) => {
  return (
    <div className="relative flex items-center justify-center h-screen bg-gray-100">
      <Image
        src={back}
        alt="Background"
        layout="fill"
        objectFit="cover"
        className="absolute z-0"
      />
      <div className="relative z-10 p-6 bg-white rounded-2xl shadow-lg w-full max-w-md bg-opacity-40">
        <form className="space-y-6">
          <div className="flex justify-center mb-2">
            <Image src={logo} alt="Logo" width={150} height={150} className="" />
          </div>
          <span className="block text-center text-2xl font-semibold">Welcome onboard!</span>
          <input
            type="email"
            placeholder="username or email"
            className="w-full px-3 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="password"
            placeholder="password"
            className="w-full px-3 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <button
            type="submit"
            className="w-full flex items-center justify-center px-4 py-2 bg-black text-white border rounded-xl"
          >
            Login
          </button>
          <span
            onClick={switchToSignup}
            className="block text-center text-red-500 cursor-pointer"
          >
            new user?
          </span>
        </form>
      </div>
    </div>
  );
};

export default Login;
