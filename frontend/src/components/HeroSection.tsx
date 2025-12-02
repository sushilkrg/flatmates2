import React from "react";

const HeroSection = () => {
  return (
    <div className="bg-linear-to-r from-[#020024] via-[#090979] to-[#00d4ff] w-full h-[93vh] text-white text-center py-16 px-4 flex items-center flex-col justify-center gap-4">
      <h1 className="text-3xl font-bold md:text-5xl">
        Find Your Perfect Flatmate or Roommate
      </h1>
      <p className="mt-4 text-lg">
        Discover verified flatmates and roommates nearby, tailored to your
        needs.
      </p>
      <button className="mt-6 bg-teal-200 text-blue-600 font-bold py-3 px-6 rounded-md shadow-md hover:bg-teal-100 hover:text-black">
        Start Searching
      </button>
    </div>
  );
};

export default HeroSection;
