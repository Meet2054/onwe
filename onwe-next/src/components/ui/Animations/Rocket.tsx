import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import './Rocket.css'


const RocketSVG: React.FC = () => {
    
    useEffect(() => {
        // Your animation logic here...
    
        const bubble = document.getElementsByClassName("jetBubble");
        const rocketMan = document.querySelector(".rocketManSVG")!;
        const star = document.querySelector(".star")!;
        const satellite = document.querySelector(".satellite")!;
        const astronaut = document.querySelector(".astronaut")!;
        const starContainer = document.querySelector(".starContainer")!;
    
        // Animate astronaut
        gsap.to(astronaut, { y: "+=4", repeat: -1, yoyo: true, duration: 0.05 });
    
        // Create timeline for satellite rotation
        const timeline = gsap.timeline({ repeat: -1 });
        timeline.to(satellite, { rotation: 360, transformOrigin: "50% 50%", ease: "none", duration: 46 });
    
        // Pulsing effects
        gsap.to(".pulse", { opacity: 0, repeat: -1, ease: "power2.inOut", yoyo: false, stagger: 0.1, duration: 0.8 });
        gsap.to(".satellitePulse", { opacity: 0, repeat: -1, ease: "power2.inOut", yoyo: false, stagger: 0.1, duration: 0.8 });
    
        // Create animations for bubbles
        for (let i = 0; i < bubble.length; i++) {
          const f = bubble[i];
          const bubbleTimeline = gsap.timeline({ repeat: -1 });
          bubbleTimeline.to(f, { attr: { r: "+=15" }, ease: "none", duration: 1 })
                        .to(f, { attr: { r: "-=15" }, ease: "none", duration: 1 });
          timeline.add(bubbleTimeline, i / 4);
        }
    
        // Animate speed lines
        for (let i = 0; i < 7; i++) {
          const speedLine = document.querySelector(`#speedLine${i}`) as SVGElement;
          const speedLineAnimation = gsap.timeline({ repeat: -1, repeatDelay: Math.random() });
          speedLineAnimation.set(speedLine, { drawSVG: false })
            .to(speedLine, { drawSVG: "0% 30%", ease: "none", duration: 0.05 })
            .to(speedLine, { drawSVG: "70% 100%", ease: "none", duration: 0.2 })
            .to(speedLine, { drawSVG: "100% 100%", ease: "none", duration: 0.05 })
            .set(speedLine, { drawSVG: "-1% -1%" });
          timeline.add(speedLineAnimation, i / 23);
        }
    
        // Create stars
        for (let i = 0; i < 7; i++) {
          const starClone = star.cloneNode(true) as SVGElement;
          starContainer.appendChild(starClone);
          const b = (i + 1) / 2;
          gsap.fromTo(starClone, b, { x: 600 * Math.random(), y: -30, scale: 3 - b }, 
            { y: 100 * Math.random() + 600, repeat: -1, repeatDelay: 1, ease: "none" });
        }
    
        // Remove original star element
        if (rocketMan) {
          rocketMan.removeChild(star);
        }
      }, []);
      

  return (
    <svg
      className="rocketManSVG"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 600 600"
    >
      <defs>
        <path
          id="rocketClip"
          d="M300,465.7L300,465.7c-13.8,0-25-11.3-25-25V249.4c0-13.7,11.3-25,25-25h0c13.7,0,25,11.2,25,25v191.3
          C325,454.5,313.8,465.7,300,465.7z"
        />
        <circle id="bubble" cx="0" cy="0" r="8" />
        <clipPath id="rainbowClip">
          <use xlinkHref="#rocketClip" overflow="visible" />
        </clipPath>
        <symbol id="badge">
          <circle
            fill="#1668B2"
            stroke="#EF3D43"
            strokeWidth="1.4389"
            strokeMiterlimit="10"
            cx="319.6"
            cy="288.9"
            r="8.7"
          />
          <g>
            <g>
              <path
                fill="#FFFFFF"
                d="M319.6,294.7L319.6,294.7c-1.7,0-2.8-0.9-2.6-1.9c0.5-2.6,0.9-5.2,1.4-7.8c0.2-1,0.4-2.8,1.2-2.8
                c0,0,0,0,0,0c0.8,0,1,1.8,1.2,2.8c0.5,2.6,0.9,5.2,1.4,7.8C322.5,293.8,321.3,294.6,319.6,294.7z"
              />
            </g>
            <path
              fill="#FFFFFF"
              d="M316.4,294.2L316.4,294.2c-0.4,0-0.8-0.3-0.8-0.8v-3.3c0-0.4,0.3-0.8,0.8-0.8l0,0c0.4,0,0.8,0.3,0.8,0.8
              v3.3C317.2,293.9,316.9,294.2,316.4,294.2z"
            />
            <path
              fill="#FFFFFF"
              d="M322.8,294.2L322.8,294.2c-0.4,0-0.7-0.3-0.7-0.7v-3.3c0-0.4,0.3-0.7,0.7-0.7l0,0c0.4,0,0.7,0.3,0.7,0.7
              v3.3C323.6,293.9,323.2,294.2,322.8,294.2z"
            />
          </g>
          <g>
            <circle fill="#FFFFFF" cx="314" cy="288.3" r="0.7" />
            <ellipse fill="#FFFFFF" cx="314" cy="288.3" rx="0.1" ry="1.2" />
            <ellipse fill="#FFFFFF" cx="314" cy="288.3" rx="0.1" ry="1.2" />
          </g>
        </symbol>
      </defs>
      <g className="starContainer" />
      <g className="jetBubble">
        {/* Example of jet bubbles, you can customize as needed */}
        <circle className="pulse" cx="100" cy="500" r="10" fill="blue" />
        <circle className="pulse" cx="200" cy="500" r="15" fill="green" />
        <circle className="pulse" cx="300" cy="500" r="20" fill="red" />
      </g>
      <g className="satellite">
        <circle className="satellitePulse" cx="400" cy="400" r="5" fill="orange" />
      </g>
      <g className="astronaut" transform="translate(300, 200)">
        <circle cx="0" cy="0" r="10" fill="yellow" />
      </g>
    </svg>
  );
};

export default RocketSVG;
