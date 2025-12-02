"use client";
import ListingCard from "@/components/ListingCard";
import { RootState, store } from "@/redux/store";
import axios from "axios";
import React from "react";
import { useSelector } from "react-redux";

const page = () => {
  const listingsData = useSelector(
    (store: RootState) => store.listings.listings
  );

  console.log("lisitng data in search page - ", listingsData);

  if(listingsData.length == 0){
    return (
       <div>
      <h2 className="text-center mb-8">search page</h2>
      <p>No data with search item</p>
    </div>
    )
  }

  return (
    <div>
      <h2 className="text-center mb-8">search page</h2>
      {listingsData.map((listingData) => (
        <ListingCard key={listingData?._id} listingData={listingData} />
      ))}
      {/* <button onClick={handleClick} className="p-2 text-white bg-gray-600">
        Get-data
      </button> */}
    </div>
  );
};

export default page;
