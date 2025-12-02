"use client";
import React, { useState } from "react";
// import { setLocation } from "../redux-store/locationSlice";
import { useDispatch } from "react-redux";
import axios from "axios";
// import { LISTING_API_ENDPOINT } from "../utils/constant";
// import { setAllListings } from "../redux-store/listingSlice";

const SearchSection = () => {
  const cityNames = ["Noida", "Gurgaon", "Chennai", "Bangalore", "Hyderabad"];
  const [cityName, setCityName] = useState("");
  const dispatch = useDispatch();

  const handleClick = (e: any) => {
    setCityName(e.target.innerText);
    // dispatch(setLocation(e.target.innerText));
  };

  const handleSearch = async (e: any) => {
    e.preventDefault();
    // try {
    //     const res = await axios.get(`${LISTING_API_ENDPOINT}/search/${cityName}`);
    //     dispatch(setAllListings(res?.data?.filteredListings));
    //     dispatch(setLocation(cityName));
    // } catch (error) {
    //     console.error(error);
    // }
  };

  return (
    <section className="bg-gray-800 h-[450px] md:h-[500px] px-4 flex items-center justify-center">
      <div className="container mx-auto">
        <h2 className="text-2xl text-center font-semibold mb-2">
          Search for a Flatmate/Roommate
        </h2>
        <div className="flex flex-col md:flex-row gap-4 justify-center items-center mt-20">
          <input
            type="text"
            placeholder="Enter City Name"
            value={cityName}
            className="p-3 border bg-white text-black rounded-md w-full md:w-1/2 focus:outline-none focus:border-blue-400"
            onChange={(e) => setCityName(e.target.value)}
          />
          <button
            onClick={handleSearch}
            className="bg-blue-600 text-white py-3 px-6 rounded-md shadow-md w-full md:w-auto cursor-pointer"
          >
            Search
          </button>
        </div>
        <div className="text-center mt-4 space-x-1">
          {cityNames?.map((city, index) => (
            <button
              onClick={handleClick}
              key={index}
              className="bg-[#325074]  py-1 px-4 rounded-full shadow-md cursor-pointer w-auto mt-1"
            >
              {city}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SearchSection;
