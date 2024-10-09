import React from "react";

const EventsSection: React.FC = () => {
  return (
    <section className="flex overflow-hidden flex-col justify-center items-start px-16 py-40 w-full h-screen bg-[#E5E1DA] max-md:px-5 max-md:py-24 max-md:max-w-full">
      <div className="mb-0 ml-5 max-w-full w-[843px] max-md:mb-2.5">
        <div className="flex justify-center items-center gap-5 max-md:flex-col">
          <div className="flex flex-col w-[30%] max-md:ml-0 max-md:w-full">
            <div className="flex z-10 flex-col justify-center self-stretch p-1.5 my-auto mr-0 rounded-full border border-white border-solid max-md:mt-10">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/feecac15706e9e56b94e783f577fde7c1a724aa3fb18b45b08c522310917f5b5?placeholderIfAbsent=true&apiKey=fa090b16b04649b4a5024c30e95337f0"
                alt="Discover events illustration"
                className="object-contain w-full rounded-full aspect-square"
              />
            </div>
          </div>
          <div className="flex flex-col gap-y-10 items-start w-[65%] max-md:ml-0 max-md:w-full">
            <div className="flex flex-col gap-y-10 items-start w-full max-md:max-w-full">
              <div className="flex flex-col gap-y-10 items-start ml-20 max-w-full w-[448px]">
                <div className="max-md:mr-1.5 max-md:max-w-full">
                  <div className="flex gap-5 max-md:flex-col items-start">
                    {/* <div className="flex flex-col w-[42%] max-md:ml-0 max-md:w-full">
                      <div className="flex shrink-0 rounded-full border border-white border-solid h-[201px] w-[241px]" />
                    </div> */}
                    <div className="flex flex-col ml-2 items-start max-md:ml-0 max-md:w-full">
                      <h2 className="mt-16 text-5xl font-semibold text-black max-md:mt-10 max-md:text-4xl">
                        Discover Events
                      </h2>
                    </div>
                  </div>
                </div>
                <div className="flex gap-3 self-start rounded-2xl border-solid shadow-lg bg-white bg-opacity-60 border-[8px] border-[#E5E1DA] border-opacity-60 min-h-[81px]">
                  <div className="flex flex-col justify-center items-center px-3 font-semibold text-white whitespace-nowrap bg-black rounded-2xl h-[81px] w-[81px]">
                    <div className="flex flex-col justify-center items-center">
                      <div className="text-2xl">24</div>
                      <div className="text-sm">JUN</div>
                    </div>
                  </div>
                  <div className="flex gap-5 my-auto text-black min-h-[47px]">
                    <div className="flex flex-col justify-center self-start w-[130px]">
                      <div className="flex flex-col w-full max-w-[140px]">
                        <h3 className="gap-3.5 self-stretch text-lg font-semibold">
                          Summer night!
                        </h3>
                        <p className="mt-1 text-sm">EDM party</p>
                      </div>
                    </div>
                    <div className="flex flex-col justify-between text-xs font-medium leading-5 text-center pr-3">
                      <div className="flex flex-col justify-center">
                        <div className="px-2 py-0.5 rounded-2xl min-h-[22px]">
                          2 days to go
                        </div>
                      </div>
                      <div className="self-stretch px-2 py-0.5 w-full whitespace-nowrap rounded-2xl bg-black bg-opacity-20 min-h-[22px]">
                        remainder
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <p className="max-md:mt-10 max-md:max-w-full ml-20 text-start">
                <span className="text-2xl font-md text-black">
                  Never miss out on the latest campus events! Browse event
                  listings, register, and add them to your calendar
                  with ease.
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventsSection;
