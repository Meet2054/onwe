
import React from "react";
import Header from "./Header";
import Link from "next/link";

const Hero: React.FC = () => {
  return (
    <section className="bg-gray-100 flex justify-beween items-center md:px-20 h-screen overflow-none  ">
      
      <div className=" mx-auto flex flex-col  md:flex-row items-center">
        <div className="md:w-1/2 mb-10 md:mb-0">
          <h1 className="text-4xl md:text-5xl font-black uppercase mb-4">
            Welcome to Onwe
          </h1>
          <h2 className="text-2xl md:text-4xl font-light text-neutral-950">
            Your campus community hub!
          </h2>
          <Link scroll={false} href="/home" className="mt-5">
            <button className="border bg-black mt-5 rounded-md px-8 py-2 text-white">Connect</button>
          </Link>
          <p className="text-black text-center absolute bottom-16 text-xl font-semibold">Scroll down..</p>
        </div>
        <div className="md:w-1/2">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/756c6a940586bf6b56ddad886e4ce5716de283c3d59c34a9db26f6f010627da3?placeholderIfAbsent=true&apiKey=fa090b16b04649b4a5024c30e95337f0"
            alt="Hero image"
            className="w-full h-[90vh] rounded-2xl shadow-lg"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
