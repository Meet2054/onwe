import React from "react";
import Image from "next/image";
import Link from "next/link";
import back from "../../public/images/back.png";
import logo from "../../public/images/onwelogo.svg";

interface SignInFormProps {
  signInWithEmail: ({
    emailAddress,
    password,
  }: {
    emailAddress: string;
    password: string;
  }) => void;
  clerkError: string;
  switchToSignup: () => void;
}


const SigninForm: React.FC<SignInFormProps> = ({ signInWithEmail, clerkError }) => {
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
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const target = e.target as typeof e.target & {
              email: { value: string };
              password: { value: string };
            };
            const email = target.email.value;
            const password = target.password.value;
            signInWithEmail({ emailAddress: email, password: password });
          }}
          className="space-y-6"
        >
          <div className="flex justify-center mb-2">
            <Image src={logo} alt="Logo" width={150} height={150} />
          </div>
          <span className="block text-center text-2xl font-semibold">Welcome onboard!</span>
          <input
            name="email"
            className="w-full px-3 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="username or email"
            type="email"
            required
          />
          <input
            name="password"
            className="w-full px-3 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="password"
            type="password"
            required
          />
          {clerkError && (
            <div className="text-red-500 text-center">{clerkError}</div>
          )}
          <button
            className="w-full flex items-center justify-center px-4 py-2 bg-black text-white border rounded-xl"
            type="submit"
          >
            Sign in
          </button>
         <Link href={"/sign-up"}>
         <span
            className="block text-center text-red-500 cursor-pointer"
          >
            Don&apos;t have an account? Sign up
          </span>
         </Link>
         <Link href={"/forgot-password"}>
         <span
            className="block text-center text-red-500 cursor-pointer"
          >
            Forgot Password?
          </span>
         </Link>
        </form>
      </div>
    </div>
  );
};

export default SigninForm;
