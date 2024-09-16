import React from 'react';


interface Club {
  name: string;
  location: string;
  icon: string;
  additionalIcon?: string;
  bgColor?: string;
  textColor?: string;
}

const clubsData: Club[] = [
  {
    name: "Photography Club",
    location: "All around campus.",
    icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/14d058626f02f7b6929093c19a5b37da57bbc414414082a01808514e4c1e9cfd?placeholderIfAbsent=true&apiKey=fa090b16b04649b4a5024c30e95337f0",
    additionalIcon: "https://cdn.builder.io/api/v1/image/assets/TEMP/b05bf83885cc45bd74c99d7562f1886e939aa2568b4a50ca04c1bcebc1463eb9?placeholderIfAbsent=true&apiKey=fa090b16b04649b4a5024c30e95337f0"
  },
  {
    name: "Coding",
    location: "New competitions!",
    icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/4c52ff9f3a872f03c775aa7a9256aa5b2a8478558da4ec77186a496801beea1e?placeholderIfAbsent=true&apiKey=fa090b16b04649b4a5024c30e95337f0",
    additionalIcon: "https://cdn.builder.io/api/v1/image/assets/TEMP/953c213e3e0867cd391ade555e0525e7b02e462da9bc164e0f9fa296c1b1eee4?placeholderIfAbsent=true&apiKey=fa090b16b04649b4a5024c30e95337f0",
    bgColor: "bg-gray-400",
    textColor: "text-black text-opacity-70"
  }
];

const ClubsSection: React.FC = () => {
  return (
    <section className="flex overflow-hidden flex-col items-center pl-60 px-16 pt-20 pb-60 bg-[#B3C8CF] max-md:px-5 max-md:pb-24">
      <div className="w-full max-w-[1023px] max-md:max-w-full">
        <div className="flex gap-5 max-md:flex-col">
          <div className="flex flex-col w-[63%] max-md:ml-0 max-md:w-full">
            <div className="flex flex-col items-start mt-36 w-full max-md:mt-10 max-md:max-w-full">
              <h1 className="ml-2.5 text-5xl font-semibold text-black max-md:text-4xl">
                Join Clubs
              </h1>
              <div className="mt-7 max-w-full w-[526px]">
                <div className="flex gap-5 max-md:flex-col">
                  {clubsData.map((club, index) => (
                    <div key={index} className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full">
                      <ClubCard {...club} />
                    </div>
                  ))}
                </div>
              </div>
              <p className="self-stretch mt-14 ml-2.5 text-2xl font-light text-black max-md:mt-10 max-md:max-w-full">
                Get involved! Explore various clubs, meet new people, and collaborate with like-minded students.
              </p>
            </div>
          </div>
          <div className="flex flex-col ml-5 w-[37%] max-md:ml-0 max-md:w-full">
            <div className="flex flex-col justify-center p-2.5 rounded-full border border-white border-solid max-md:mt-10">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/6c07d3fcc12b0676ebd3f9c0eb8d22c5f4b6c50e19202dee72877aa927806a0b?placeholderIfAbsent=true&apiKey=fa090b16b04649b4a5024c30e95337f0"
                alt="Club activity"
                className="object-contain w-full rounded-full aspect-square"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};


interface ClubCardProps {
  name: string;
  location: string;
  icon: string;
  additionalIcon?: string;
  bgColor?: string;
  textColor?: string;
}

const ClubCard: React.FC<ClubCardProps> = ({
  name,
  location,
  icon,
  additionalIcon,
  bgColor = 'bg-white',
  textColor = 'text-black'
}) => {
  return (
    <div
      className={`flex overflow-hidden flex-col items-start py-5 pr-3.5 pl-9 w-full tracking-normal ${bgColor} rounded-3xl border-solid border-[10px] border-[#B3C8CF]-30 border-opacity-20 max-md:pl-5 max-md:mt-2.5 ${textColor}`}
    >
      <div className="flex gap-3.5 text-base font-semibold leading-5 uppercase">
        <div className="mt-7">{name}</div>
        <img
          loading="lazy"
          src={icon}
          alt={`${name} icon`}
          className="object-contain shrink-0 rounded aspect-square w-[69px]"
        />
      </div>
      <div className="flex gap-1.5 text-xs font-medium leading-none">
        <div className="grow self-start">{location}</div>
        {additionalIcon && (
          <img
            loading="lazy"
            src={additionalIcon}
            alt=""
            className="object-contain shrink-0 rounded-sm aspect-square w-[45px]"
          />
        )}
      </div>
    </div>
  );
};




export default ClubsSection;