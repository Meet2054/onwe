"use client"

import React from 'react';

interface Testimonial {
  quote: string;
  name: string;
  role: string;
}

interface Image {
  src: string;
  alt: string;
}

const testimonials: Testimonial[] = [
  {
    quote: "We love Landingfolio! Our designers were using it for their projects, so clients already knew what Landingfolio was and how to use it.",
    name: "Darlene Robertson",
    role: "Product Manager at Jomanar"
  },
  {
    quote: "I didn't know designing in Webflow could be this individualized. I'd never considered it before, but Landingfolio changed my mind.",
    name: "Bessie Cooper",
    role: "Freelance UX Designer"
  },
  {
    quote: "We love Landingfolio! Our designers were using it for their projects, so clients already knew what Landingfolio was and how to use it.",
    name: "Arlene McCoy",
    role: "Product Designer at Martina.co"
  }
];

const images: Image[] = [
  { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/d1ef2905ffadc39ad7ef29749a5187eabd0f37cd048264701f4cbe7f06bbd07b?placeholderIfAbsent=true&apiKey=fa090b16b04649b4a5024c30e95337f0", alt: "Grid image 1" },
  { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/2b8750b746e8f9b4647ea3cc3869dc08777e829ad27592cdcf5916d07f672a9f?placeholderIfAbsent=true&apiKey=fa090b16b04649b4a5024c30e95337f0", alt: "Grid image 2" },
  { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/86a4f478f6349c2adbe0d5d1e3ab5a65c7f4bb17c89bff75d211683400ec5248?placeholderIfAbsent=true&apiKey=fa090b16b04649b4a5024c30e95337f0", alt: "Grid image 3" },
  { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/630571fcf0e70f8f25960db48ac40ed355cc5ad1791ef801c94b7f697b43e062?placeholderIfAbsent=true&apiKey=fa090b16b04649b4a5024c30e95337f0", alt: "Grid image 4" },
  { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/28c713925aaa4dc80e24451540c84525f2b3737f6aee7278a42626123e746ff0?placeholderIfAbsent=true&apiKey=fa090b16b04649b4a5024c30e95337f0", alt: "Grid image 5" },
  { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/61db56f59645d07c20128cd1c3dacdf205b612d1d81434d444afe7f39d64bb64?placeholderIfAbsent=true&apiKey=fa090b16b04649b4a5024c30e95337f0", alt: "Grid image 6" }
];

const BottomPage: React.FC = () => {
  return (
    <div className="flex overflow-hidden flex-col items-center px-20  pb-44 bg-neutral-900 max-md:px-5 max-md:pb-24">
      <div className="flex flex-col w-full max-w-[1299px] max-md:max-w-full">
        <section className="flex flex-col items-center w-full text-center max-md:max-w-full">
          <div className="flex flex-col w-full text-3xl font-semibold tracking-tight leading-none text-white rounded-none">
            <div className="flex relative flex-col pt-60 w-full rounded-3xl min-h-[568px] max-md:pt-24 max-md:max-w-full">
              <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/60620ad4ebdeb12feafdcc6b22f65a1a22f78fe3134bab6ea1522bd4315771cc?placeholderIfAbsent=true&apiKey=fa090b16b04649b4a5024c30e95337f0" alt="" className="object-cover absolute inset-0 size-full rounded-3xl  bg-gradient-radial from-transparent to-black opacity-90" />
              <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/e1f9a8270cacfc6fa14ae8fd11a4610cbb9222e71f620215aad435ab75b6fcfc?placeholderIfAbsent=true&apiKey=fa090b16b04649b4a5024c30e95337f0" alt="Company logo" className="object-contain absolute self-center rounded-none aspect-square w-[81px]" />
              <div className="relative px-16 pt-56 pb-12 mt-5 rounded-none max-md:px-5 max-md:pt-24 max-md:max-w-full">
                See how we helped Groover to grow 11x faster
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-10 items-center mt-16 text-base text-white max-md:mt-10 max-md:max-w-full">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="flex flex-col items-center self-stretch px-1 my-auto rounded-none min-w-[240px] w-[367px]">
                <p className="self-stretch leading-7">{testimonial.quote}</p>
                <h3 className="mt-16 font-semibold tracking-normal leading-7 max-md:mt-10">{testimonial.name}</h3>
                <p className="text-sm leading-loose text-zinc-100">{testimonial.role}</p>
              </div>
            ))}
          </div>
        </section>
        <section className="flex flex-wrap gap-10 items-center mx-auto mt-52 max-md:mt-10 max-md:mr-1 max-md:max-w-full">
          <div className="flex flex-col  self-stretch my-auto min-w-[320px] w-[432px] max-md:max-w-full">
            <div className="flex flex-col w-full max-w-screen-sm max-md:max-w-full">
              <h2 className="text-6xl font-extrabold leading-[66px] text-slate-50 max-md:max-w-full max-md:text-4xl max-md:leading-[51px]">
                Join the Cult
              </h2>
              <p className="mt-4 text-lg leading-8 text-gray-300 max-md:max-w-full">
                Become part of a community that celebrates connections and shared experiences.
              </p>
            </div>
            <button className="flex flex-col justify-center items-center px-4 py-3 mt-8 max-w-full text-base font-medium text-right bg-white rounded-xl min-h-[45px] text-neutral-800 w-[187px]">
              Let's Connect
            </button>
          </div>
          <div className="flex flex-wrap gap-2.5 items-start self-stretch my-auto min-w-[240px] w-[734px] max-md:max-w-full">
            {images.map((image, index) => (
              <div key={index} className="flex overflow-hidden flex-col  flex-1 shrink basis-0 min-h-[169px] min-w-[160px] rounded-[48px]">
                <img loading="lazy" src={image.src} alt={image.alt} className="object-contain mt-3  w-full rounded-[48px]" />
              </div>
            ))}
          </div>
        </section>
        <footer className="flex flex-col justify-center p-2 mt-52 ml-2.5 max-md:mt-10 max-md:mr-2.5 max-md:max-w-full">
          <div className="flex flex-col px-10 py-8 w-full rounded-3xl bg-neutral-900 max-md:px-5 max-md:max-w-full">
            <div className="flex flex-wrap gap-14 justify-between items-start w-full text-slate-50 max-md:max-w-full">
              <div className="flex flex-col flex-1 shrink basis-0 min-w-[248px] max-md:max-w-full">
                <div className="flex gap-2 justify-center items-center self-start text-sm leading-relaxed whitespace-nowrap">
                  <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/57924840308efdbd227f282b354d0093399e1abae6b6b123430740ac84f75003?placeholderIfAbsent=true&apiKey=fa090b16b04649b4a5024c30e95337f0" alt="ONWE logo" className="object-contain shrink-0 self-stretch my-auto w-8 aspect-square" />
                  <div className="self-stretch my-auto">ONWE</div>
                </div>
                <div className="mt-6 text-lg">Connect with Us</div>
              </div>
              <nav className="flex flex-wrap flex-1 shrink gap-10 items-start text-sm leading-relaxed basis-0 min-w-[280px] max-md:max-w-full">
                <div className="flex flex-col flex-1 shrink whitespace-nowrap basis-0 min-w-[108px]">
                  <h3>Company</h3>
                  <a href="#" className="mt-4">About</a>
                  <a href="#" className="mt-4">Careers</a>
                  <a href="#" className="mt-4">Newsroom</a>
                </div>
                <div className="flex flex-col flex-1 shrink basis-0 min-w-[108px]">
                  <h3>App Features</h3>
                  <a href="#" className="mt-4">Speedy Connections</a>
                  <a href="#" className="mt-4">Event Cards</a>
                  <a href="#" className="mt-4">Newsroom Updates</a>
                </div>
                <div className="flex flex-col flex-1 shrink whitespace-nowrap basis-0 min-w-[108px]">
                  <h3>Social</h3>
                  <a href="#" className="mt-4">Twitter</a>
                  <a href="#" className="mt-4">Instagram</a>
                  <a href="#" className="mt-4">Threads</a>
                </div>
              </nav>
            </div>
            <div className="flex mt-8 w-full bg-neutral-700 min-h-[1px] max-md:max-w-full" />
            <div className="flex flex-wrap gap-10 justify-between items-center mt-8 w-full leading-relaxed max-md:max-w-full">
              <div className="self-stretch my-auto text-xs text-gray-300">
                All rights Onwe
              </div>
              <div className="flex flex-wrap gap-4 items-center self-stretch my-auto text-sm min-w-[240px] text-slate-50 w-[612px] max-md:max-w-full">
                <a href="#" className="self-stretch my-auto">Terms of Use</a>
                <a href="#" className="self-stretch my-auto">Privacy Policy</a>
              </div>
            </div>
          </div>
        </footer>
      </div>
      <style jsx>{`
        builder-component {
          max-width: none !important;
        }
      `}</style>
    </div>
  );
}

export default BottomPage;