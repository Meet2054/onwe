"use client"

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Hero from "./components/Hero";
import ConnectSection from "./components/ConnectSection";
import EventsSection from "./components/EventsSection";
import ClubsSection from "./components/ClubsSection";
import ShareSection from "./components/ShareSection";
import WriteSection from "./components/WriteSection";
import CommunitySection from "./components/CommunitySection";
import Header from "./components/Header";

const sections = [
  { component: Hero, id: "hero" },
  { component: ConnectSection, id: "connect" },
  { component: EventsSection, id: "events" },
  { component: ClubsSection, id: "clubs" },
  { component: ShareSection, id: "share" },
  { component: WriteSection, id: "write" },
  { component: CommunitySection, id: "community" },
];

const Page: React.FC = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false); // To prevent multiple scrolls

  const handleScroll = (direction: "next" | "prev") => {
    if (isScrolling) return; // Prevent scrolling while already animating

    setIsScrolling(true); // Block further scrolls until this one completes

    if (direction === "next" && currentSection < sections.length - 1) {
      setCurrentSection(currentSection + 1);
    } else if (direction === "prev" && currentSection > 0) {
      setCurrentSection(currentSection - 1);
    }

    setTimeout(() => setIsScrolling(false), 1000); // Delay between scrolls
  };

  const variants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, transition: { duration: 0.3 } },
  };

  return (
    <div
      className="h-screen w-screen overflow-hidden  relative"
      onWheel={(e) => {
        if (e.deltaY > 0) handleScroll("next");
        if (e.deltaY < 0) handleScroll("prev");
      }}
    >
      <Header />
      <AnimatePresence mode="wait">
        {sections.map(({ component: Component, id }, index) =>
          index === currentSection ? (
            <motion.div
              key={id}
              className="absolute top-0 left-0 w-full h-full"
              initial="initial"
              animate="animate"
              exit="exit"
              variants={variants}
            >
              <Component />
            </motion.div>
          ) : null
        )}
      </AnimatePresence>
    </div>
  );
};

export default Page;
