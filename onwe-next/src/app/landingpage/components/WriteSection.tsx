
import React from "react";

const WriteSection: React.FC = () => {
  return (
    <section className="h-screen flex justify-start items-center bg-[#D6DAC8] px-16">
      <div className="max-w-[920px]  flex flex-col md:flex-row items-center px-16">
        <div className="md:w-2/3 mb-10 md:mb-0">
          <h2 className="text-4xl md:text-5xl font-semibold text-black mb-10">
            Write & Inspire
          </h2>
          <p className="text-xl md:text-2xl font-light pr-16">
            Have something to say? Publish articles and share your voice with
            the community. Let your ideas shine!
          </p>
        </div>
        <div className="md:w-1/3">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/ac0a10dc2ddcf551b5cb129af5058c00c13798c47215cae62027cfae8bdf4dc0?placeholderIfAbsent=true&apiKey=fa090b16b04649b4a5024c30e95337f0"
            alt="Write and inspire"
            className="w-full h-auto rounded-full border border-black p-2"
          />
        </div>
      </div>
    </section>
  );
};

export default WriteSection;
