
import React from "react";

const ShareSection: React.FC = () => {
  return (
    <section className="bg-[#B0C5A4] flex items-center justify-center px-16  h-screen">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center px-16">
        <div className="md:w-1/3 mb-10 md:mb-0">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/b3d92f6a33b380510f364b08692e55cd77adc7a36ba5234956d604fdb7ee9b15?placeholderIfAbsent=true&apiKey=fa090b16b04649b4a5024c30e95337f0"
            alt="Share and engage"
            className="w-full h-auto rounded-full border border-black p-2"
          />
        </div>
        <div className="md:w-2/3 md:pl-20">
          <h2 className="text-4xl md:text-5xl font-semibold text-black mb-10">
            Share & Engage
          </h2>
          <p className="text-xl md:text-2xl font-light">
            Post your thoughts, share opinions through polls, and engage with
            tweet-like posts. Stay in the loop with what's trending on your
            campus.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ShareSection;
