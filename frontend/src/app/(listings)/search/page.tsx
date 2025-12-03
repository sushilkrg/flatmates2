"use client";
import ListingCard from "@/components/ListingCard";
import { RootState, store } from "@/redux/store";
import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";
import { useSelector } from "react-redux";

const page = () => {
  const listingsData = useSelector(
    (store: RootState) => store.listings.listings
  );

  const router = useRouter();

  console.log("lisitng data in search page - ", listingsData);

  const handleBookmark = async (listingId: string) => {
    try {
      const result = await axios.patch(
        `/api/v1/listing/bookmark/${listingId}`,
        {
          // headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      console.log("bookmark result-", result);
      // if (result?.status !== 200) {
      //   console.log(result);
      // } else {
      //   router.push("/search");
      // }
    } catch (error) {
      console.log(error);
    }
  };

  if (listingsData.length == 0) {
    return (
      <div>
        <h2 className="text-center mb-8">search page</h2>
        <p>No data with search item</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-center mb-8">search page</h2>
      {listingsData.map((listingData) => (
        <ListingCard
          key={listingData?._id}
          listing={listingData}
          onBookmark={(id) => handleBookmark(id)}
          onViewDetails={(id) => router.push(`/details/${id}`)}
        />
      ))}
      {/* <button onClick={handleClick} className="p-2 text-white bg-gray-600">
        Get-data
      </button> */}
    </div>
  );
};

export default page;
