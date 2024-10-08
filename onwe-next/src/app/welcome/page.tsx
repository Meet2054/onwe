import React from "react";
import App from "./components/app";

const Page: React.FC = () => {
  const navItems = ['Explore Events', 'Join the Community', 'Merchandise'];
  const features = [
    {
      title: 'App Features',
      description: 'Get unlimited design inspirations. Level up your design.',
    },
    {
      title: 'App Features',
      description: 'Get unlimited design inspirations. Level up your design.',
    },
    {
      title: 'App Features',
      description: 'Get unlimited design inspirations. Level up your design.',
    },
    {
      title: 'App Features',
      description: 'Get unlimited design inspirations. Level up your design.',
    },
  ];

  return (
    // <main className="flex overflow-auto  flex-col px-9 pt-9 pb-72 bg-neutral-900 max-md:px-5 max-md:pb-24">
    //   <Header navItems={navItems} />
    //   <FeatureSection features={features} />
    // </main>
    <div className="h-screen overflow-auto scrollbar-custom">
        <App />
    </div>
    
  );
};

export default Page;