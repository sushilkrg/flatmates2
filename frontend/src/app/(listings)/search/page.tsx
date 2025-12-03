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
      {/* {listingsData.map((listingData) => (
        <ListingCard
          key={listingData?._id}
          listing={listingData}
          onBookmark={(id) => handleBookmark(id)}
          onViewDetails={(id) => router.push(`/details/${id}`)}
        />
      ))} */}

      {listingsData.map((listing) => (
        <ListingCard
          key={listing._id}
          listing={listing}
          primaryAction={{
            label: "Save",
            activeLabel: "Saved",
            icon: (
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                />
              </svg>
            ),
            activeIcon: (
              <svg
                className="w-4 h-4"
                fill="currentColor"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                />
              </svg>
            ),
            onClick: (id) => handleBookmark(id),
            variant: "primary",
          }}
          secondaryAction={{
            label: "View Details",
            icon: (
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            ),
            onClick: (id) => router.push(`/details/${id}`),
          }}
        />
      ))}
    </div>
  );
};

export default page;
