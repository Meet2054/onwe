import React from 'react';

interface Testimonial {
  name: string;
  role: string;
  imageSrc: string;
  avatarSrc: string;
}

const testimonials: Testimonial[] = [
  {
    name: "Albert Flores",
    role: "Founder of GearUp",
    imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/cfb63abebf6836090578d8a6ab538ebd6ac4f303c538280b6f169563000255cd?placeholderIfAbsent=true&apiKey=fa090b16b04649b4a5024c30e95337f0",
    avatarSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/1075f59104611d0cb818853cbd9a1a65d35c297d0943edede5ea01f9a185cdbd?placeholderIfAbsent=true&apiKey=fa090b16b04649b4a5024c30e95337f0"
  },
  {
    name: "Leslie Alexander",
    role: "Co-Founder of Womenia",
    imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/a2f3f63af4fb03ce495b42870b94effe31f538405386eb700698b337cc54db12?placeholderIfAbsent=true&apiKey=fa090b16b04649b4a5024c30e95337f0",
    avatarSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/43c12138114715558ca1f79d8b92ff2b7ac08c1fcae1fdaca8d3866eef4e1ccb?placeholderIfAbsent=true&apiKey=fa090b16b04649b4a5024c30e95337f0"
  },
  {
    name: "Courtney Henry",
    role: "Founder of CH Beauty",
    imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/59c75843cc8fa159b15ec709c9757854d2c92ffd9196f0681dbde72ba09910e5?placeholderIfAbsent=true&apiKey=fa090b16b04649b4a5024c30e95337f0",
    avatarSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/2bb67f59569539fad21f863cef2d8d80bb08e6cc25ae201faa948d347ec92bb1?placeholderIfAbsent=true&apiKey=fa090b16b04649b4a5024c30e95337f0"
  }
];

const MiddleSection: React.FC = () => {
  return (
    <section className="flex overflow-hidden flex-col items-center px-20 pt-36 pb-56 bg-neutral-900 max-md:px-5 max-md:py-24">
      <div className="flex flex-col max-w-full w-[1076px]">
        <header className="flex flex-col self-center max-w-full text-center w-[755px]">
          <h2 className="text-5xl font-semibold tracking-tighter leading-none text-white max-md:max-w-full max-md:text-4xl">
          Connect - Create - Cherish<br/>
          </h2>
          <p className="self-center mt-7 text-base leading-7 text-zinc-100 max-md:max-w-full">
            Get involved! Explore various clubs, meet new people, and collaborate with like-minded students.
          </p>
        </header>
        <div className="flex flex-col mt-24 w-full max-md:mt-10 max-md:max-w-full">
          <div className="w-full rounded-none max-md:max-w-full ">
            <div className="flex justify-center gap-16 ">
              {testimonials.map((testimonial, index) => (
                <article key={index} className="flex flex-col w-[30%] max-md:ml-0">
                  <div className="flex relative flex-col pt-80 w-full rounded-3xl aspect-[0.556] max-md:pt-24 max-md:mt-10">
                    <img loading="lazy" src={testimonial.imageSrc} alt={`Testimonial from ${testimonial.name}`} className="object-cover rounded-2xl absolute inset-0 size-full " />
                    <div className="flex relative gap-5 justify-between items-start px-8 pt-36 pb-6 rounded-none max-md:px-5 max-md:pt-24">
                      <div className="flex flex-col">
                        <h3 className="self-start text-lg font-semibold leading-loose text-white rotate-[-3.469446951953614e-18rad]">
                          {testimonial.name}
                        </h3>
                        <p className="text-sm leading-loose text-zinc-300">{testimonial.role}</p>
                      </div>
                      <img loading="lazy" src={testimonial.avatarSrc} alt={`${testimonial.name}'s avatar`} className="object-contain shrink-0 rounded-none aspect-square w-[58px]" />
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
          <button className="flex flex-col justify-center items-center self-center px-4 py-px mt-14 max-w-full text-lg leading-loose text-center text-blue-600 min-h-[32px] rounded-[50px] w-[416px] max-md:mt-10">
            <div className="flex gap-2.5 justify-center items-center">
              <span className="self-stretch my-auto">Check It Out, Why Not?</span>
              <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/91b7e0c4e165bb588f21e73958b7a915f2d4b47d842b91cd0deceebdb3d55190?placeholderIfAbsent=true&apiKey=fa090b16b04649b4a5024c30e95337f0" alt="" className="object-contain shrink-0 gap-2.5 self-stretch my-auto aspect-[0.96] w-[25px]" />
            </div>
          </button>
        </div>
      </div>
      <section className="flex flex-wrap gap-10 items-center mt-32 max-md:mt-10 max-md:max-w-full">
        <div className="flex flex-col justify-center self-stretch my-auto max-w-[720px] min-w-[272px] w-[373px]">
          <div className="flex flex-col justify-center w-full">
            <h2 className="text-5xl font-semibold tracking-tighter leading-none text-ellipsis text-slate-50 max-md:text-4xl">
            Stop By, Join the Fun!
            </h2>
            <p className="mt-4 text-base leading-7 text-gray-300">
            Kick off a journey to discover, connect, and immerse yourself in local clubs and events.
            </p>
          </div>
          <button className="flex flex-col justify-center items-center px-3 py-3 mt-10 max-w-full text-base font-medium text-center bg-white rounded-xl min-h-[45px] text-neutral-800 w-[160px]">
            <span className="gap-2.5 self-stretch">Explore More</span>
          </button>
        </div>
        <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/20ca0b3dd3fd5b7ac2ec1e134b1d36774ec7f203bd01e177f34f36ab9eae4c24?placeholderIfAbsent=true&apiKey=fa090b16b04649b4a5024c30e95337f0" alt="Illustration of how it works" className="object-contain self-stretch my-auto aspect-[1.98] min-w-[240px] rounded-[32px] w-[632px] max-md:max-w-full" />
      </section>
    </section>
  );
};

export default MiddleSection;