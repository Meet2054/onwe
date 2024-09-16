import React from "react";

const ConnectSection: React.FC = () => {
  return (
    <section className="flex overflow-hidden flex-col justify-center items-center px-16 h-screen w-full bg-[#B1DDE2] max-md:px-5 max-md:pt-24 max-md:max-w-full">
      <div className="flex justify-between items-center px-20 w-[85%]">
        <div className="flex z-10 flex-col self-center items-start justify-center gap-5 mt-0 max-w-full text-black">
          <h2 className="z-10 text-5xl font-semibold text-black text-start max-md:max-w-full max-md:text-4xl">
            Stay connected with your campus
          </h2>
          <div className="relative flex overflow-hidden flex-col px-7 py-7 mt-3 max-w-full text-sm font-medium rounded-2xl border-solid shadow-lg bg-white bg-opacity-70 border-[12px] border-[#B1DDE2] border-opacity-40 w-[402px] max-md:px-5 max-md:ml-2.5">
            <blockquote className="w-full text-start">
              "
              <br />
              With Onwe, your campus community is at your fingertips—accessible
              anywhere, anytime.
            </blockquote>
            <div className="flex gap-10 justify-center items-center mt-4 w-full whitespace-nowrap">
              <div className="flex flex-col flex-1 shrink items-start self-stretch pr-10 my-auto w-full basis-0 min-w-[240px]">
                <div className="flex gap-3 items-center">
                  <div className="flex gap-2 items-center self-stretch my-auto">
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/f2bb9988772f19e54c5c496c2f84b2ef816e20e81c9abb50a1389f4e75ea66db?placeholderIfAbsent=true&apiKey=fa090b16b04649b4a5024c30e95337f0"
                      alt=""
                      className="object-contain shrink-0 self-stretch my-auto w-6 aspect-square"
                    />
                    <span className="self-stretch my-auto">13</span>
                  </div>
                  <div className="flex gap-2 items-center self-stretch my-auto">
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/c2a6f9063736e69888f635bfaa69468f463c2a9919243820497df2ce6cc5dd12?placeholderIfAbsent=true&apiKey=fa090b16b04649b4a5024c30e95337f0"
                      alt=""
                      className="object-contain shrink-0 self-stretch my-auto w-6 aspect-square"
                    />
                    <span className="self-stretch my-auto">6</span>
                  </div>
                  <div className="flex gap-2 items-center self-stretch my-auto">
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/e927057da52bd7f1a27b7bcec4b0a065750d65b383b3cb9053ae578e3e53db72?placeholderIfAbsent=true&apiKey=fa090b16b04649b4a5024c30e95337f0"
                      alt=""
                      className="object-contain shrink-0 self-stretch my-auto w-6 aspect-square"
                    />
                    <span className="self-stretch my-auto">1</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <p className="mt-8 text-2xl text-start font-md max-md:max-w-full">
            Onwe brings your campus community to life! From social posts, event
            updates, clubs, and more, connect with your peers in one vibrant
            space.
          </p>
          {/* <div className="absolute flex flex-col self-center mt-0 ml-28 max-w-full w-[283px]">
          <div className="flex shrink-0 self-end rounded-tl-full rounded-br-full rounded-tr-lg rounded-bl-lg border border-white border-solid h-[201px] w-[241px]" />
          <div className="flex z-10 shrink-0 mt-0 rounded-full border border-teal-300 border-solid h-[201px] w-[241px]" />
        </div> */}
        </div>

        <div className="flex flex-col justify-center self-start px-2 py-2 mt-0 w-3/4 max-w-full rounded-full border border-white border-solid">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/69cdd7608028d4a6e56c959a4eea03f84fd374a7210da043f074e244c25bf760?placeholderIfAbsent=true&apiKey=fa090b16b04649b4a5024c30e95337f0"
            alt="Campus connection illustration"
            className="object-contain w-full rounded-full aspect-square"
          />
        </div>
      </div>
    </section>
  );
};

export default ConnectSection;
