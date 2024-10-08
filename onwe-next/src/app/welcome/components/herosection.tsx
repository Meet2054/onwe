import React from 'react';

interface NavItemProps {
  text: string;
}

const NavItem: React.FC<NavItemProps> = ({ text }) => {
  return <div className="self-stretch my-auto">{text}</div>;
};

interface ButtonProps {
  text: string;
}

const Button: React.FC<ButtonProps> = ({ text }) => {
  return (
    <button className="flex flex-col justify-center items-center px-4 py-3 text-right bg-white rounded-xl min-h-[45px] text-neutral-800">
      <div className="gap-2.5 self-stretch">{text}</div>
    </button>
  );
};



const Header: React.FC = () => {

    const navItems = ['Explore Events', 'Join the Community', 'Onwe Read'];
   
  return (
    <div className="h-screen">
      <header className="flex flex-wrap gap-5 justify-between w-full text-base max-md:flex-col max-md:gap-2 p-4 pt-0">
        <nav className="flex flex-wrap gap-10 items-center my-auto text-white max-md:flex-col">
          <div className="font-bold leading-8 uppercase tracking-[3px] w-[72px]">
            <span className="text-rose-500">/</span>Onwe
          </div>
          <div className="flex flex-col ml-2 min-w-[240px] w-[412px] max-md:w-full">
            <div className="flex gap-5 items-center">
              {navItems.map((item, index) => (
                <NavItem key={index} text={item} />
              ))}
            </div>
          </div>
        </nav>
        <div className="flex gap-5 font-medium max-md:w-full max-md:justify-between">
          <div className="grow my-auto text-white">Sign in</div>
          <Button text="Create account" />
        </div>
      </header>

      <div className="flex h-[82%] w-[95.9%] mt-14 ml-24 max-md:flex-col max-md:w-full max-md:mt-10 max-md:ml-0 p-4">
        <div className="flex flex-col gap-8 p-5 w-[500px] max-md:w-full">
          <h1 className="text-white text-[58px] font-extrabold leading-[66px] max-md:text-[40px] max-md:leading-[50px]">
          Unleash Your Social Side with Onwe!
          </h1>
          <p className="text-base font-normal leading-[26px] text-zinc-300">
          Discover a vibrant community where you can connect with friends, clubs, Magazines, Articles and participate in local events. 
          </p>
          <div className="flex items-center justify-between bg-white rounded-xl py-2 px-5 pr-2 max-md:flex-col">
            <p>Enter email address</p>
            <button className="bg-black text-white text-center px-5 py-3 rounded-xl mt-3 max-md:mt-2">Connect</button>
          </div>
          <div className="flex items-center gap-2.5 text-[44px] text-white">
            <h1>2943</h1>
            <p className="text-[12px]">
              Students<br />
              Connected
            </p>
            <h1 className="mx-2">&</h1>
            <h1>10+</h1>
            <p className="text-[12px]">
              Universities<br />
              Partners
            </p>
          </div>
        </div>
        <div className="text-white text-[218px] my-auto mx-auto font-extrabold leading-[66px] text-center max-md:text-[100px]">
          MG
          <span className="text-sm">andaru vachi</span>
        </div>
      </div>
    </div>
  );
};

interface Feature {
  title: string;
  description: string;
}

interface FeatureItemProps {
  title: string;
  description: string;
}

const FeatureItem: React.FC<FeatureItemProps> = ({ title, description }) => {
  return (
    <div className="flex gap-5 items-start self-stretch my-auto min-w-[240px]">
      <div className="flex gap-2.5 items-center py-1 w-[27px]">
        <div className="flex self-stretch my-auto rounded-full bg-zinc-300 h-[27px] min-h-[27px] w-[27px]" />
      </div>
      <div className="flex flex-col w-[229px]">
        <h3 className="text-lg font-semibold leading-loose text-white">{title}</h3>
        <p className="text-base leading-7 text-neutral-400">{description}</p>
      </div>
    </div>
  );
};


const FeatureSection: React.FC = () => {

    const features = [
        {
          title: 'Clubs',
          description: 'Connect with like-minded individuals in clubs that enhance your vibe!',
        },
        {
          title: 'Events',
          description: 'Step into the spotlight with local events crafted by your campus crew!',
        },
        {
          title: 'Onwe Read',
          description: 'Get lost in a treasure trove of magazines and articles waiting to be read!',
        },
        {
          title: 'Polls',
          description: 'Express yourself through polls that reflect our diverse voices!',
        },
      ];
  

  return (
    <section className="flex flex-wrap mt-20 gap-36  items-center self-center max-md:mt-20 max-md:max-w-full">
      <img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/56046dfd63afcc37e0afe24434efb625f6691149fa5a09670afda1bcac035be4?placeholderIfAbsent=true&apiKey=fa090b16b04649b4a5024c30e95337f0"
        alt="Feature illustration"
        className="object-contain self-stretch my-auto rounded-none aspect-[1.09] min-w-[240px] w-[494px] max-md:max-w-full"
      />
      <div className="flex flex-col self-stretch my-auto min-w-[240px] w-[625px] max-md:max-w-full">
        <div className="flex flex-col max-w-full rounded-none w-[625px]">
          <div className="self-start text-lg font-bold leading-loose text-blue-600">
            ONWE Features
          </div>
          <h2 className="mt-7 text-5xl font-semibold tracking-tighter text-white leading-[62px] max-md:max-w-full max-md:text-4xl max-md:leading-[53px]">
            
          </h2>
        </div>
        <div className="flex flex-col mt-9 w-full max-w-[605px] max-md:max-w-full">
          <div className="flex flex-wrap gap-10 items-center w-full max-md:max-w-full">
            {features.map((feature, index) => (
              <FeatureItem key={index} title={feature.title} description={feature.description} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export { Header, FeatureSection };