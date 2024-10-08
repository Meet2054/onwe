import React from "react";
import './Hero.css';
import Link from "next/link";
import Image from "next/image";
import heart from "./assets/heart.png";
import blueheart from "./assets/blue heart.png";
import bell from "./assets/bell.png";
import globe from "./assets/globe.png";
import share from "./assets/share.png";
import comment from "./assets/comment.png";


// const Hero: React.FC = () => {
//   return (
//     <section className="bg-gray-100 flex justify-between items-center h-screen">
//       <div className="hero-container mx-auto flex flex-col md:flex-row items-center">
//         <div className="md:w-1/2 mb-10 md:mb-0 hero-content">
//           <h1 className="text-4xl md:text-5xl font-black uppercase mb-4">
//             Welcome to Onwe
//           </h1>
//           <h2 className="text-2xl md:text-4xl font-light text-neutral-950">
//             Your campus community hub!
//           </h2>
//           <Link scroll={false} href="/home" className="mt-5">
//             <button className="border bg-black mt-5 rounded-md px-8 py-2 text-white">
//               Connect
//             </button>
//           </Link>
//           <p className="text-black text-center absolute bottom-16 text-xl font-semibold animate-bounce">
//             Scroll down..
//           </p>
//         </div>
//         <div className="md:w-1/2 flex flex-col">
//         <div className="create flex justify-center">
//         {/* <Image src={heart} className="" alt="" /> */}
//         {/* <Image src={share}  alt="" /> */}
//         <div className="components ml-60 flex flex-col items-center">
//           <button className="btn1">Create</button>
//           <div>
//             <button className="btn2">Connect</button>
//             <button className="btn3">Cherrish</button>
//           </div>
//         </div>
//         {/* <div className="globe-div">
//           <Image src={globe} alt="" className="globe" />
//         </div> */}
//         {/* <div className="v-box"></div>
//         <div className="h-box"></div> */}
//         {/* <Image src={blueheart} alt="" className="blueheart" />
//         <Image src={bell} alt="" className="bell" /> */}
//         <div className="comment">
//           <div className="comment-box">
//             <div className="heart-share">
//               <Image src={heart} alt="" />
//               <span>13</span>
//               <Image src={comment} alt="" />
//               <span>6</span>
//               <Image src={share} alt="" />
//               <span>1</span>
//             </div>
//             <div className="text-black">
//               “A meticulously crafted, high-fidelity app, refined with time and
//               effort for a premium user experience.”
//             </div>
//             {/* <div className="text-blue">
//               Designed in 108-L, by Shivam Patel.Appreciative thanks, Abhishek
//               G.
//             </div> */}
//             </div>
//             </div>
//             </div>
//         </div>
//       </div>
//     </section>
//   );
// };

const Hero: React.FC = () => {
  return (
    <section className="bg-gray-100 flex justify-self-start items-center h-screen">
      <div className="hero-container ml-48 flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 mb-10 md:mb-0 hero-content">
          <h1 className="text-4xl md:text-5xl font-black uppercase mb-4">
            Welcome to Onwe
          </h1>
          <h2 className="text-2xl md:text-4xl font-light text-neutral-950">
            Your campus community hub!
          </h2>
          <Link scroll={false} href="/home" className="mt-5">
            <button className="border bg-black mt-5 rounded-md px-8 py-2 text-white">
              Connect
            </button>
          </Link>
          {/* <p className="text-black text-center absolute bottom-16 text-xl font-semibold animate-bounce">
            Scroll down..
          </p> */}
        </div>
 
      </div>
    </section>
  );
};

export default Hero;
