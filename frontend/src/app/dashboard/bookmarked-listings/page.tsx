"use client";
import ListingCard from "@/components/ListingCard";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const page = () => {
  const [mySavedListings, setMySavedListings] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleToggleBookmark = async (listingId: string) => {
    try {
      const result = await axios.patch(
        `/api/v1/listing/bookmark/${listingId}`,
        {
          // headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      console.log("bookmark result-", result);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const getMySavedListings = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`/api/v1/listing/bookmarks`);
        if (!res) throw new Error("Request failed");
        console.log("res is - ", res);

        const data = res?.data;
        setMySavedListings(data);
        console.log(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    getMySavedListings();
  }, []);

  if (loading) {
    return (
      <div>
        <p className="text-center">Loading data...</p>
      </div>
    );
  }
  if (!loading && mySavedListings.length === 0) {
    return (
      <div>
        <p className="text-center">No data available</p>
      </div>
    );
  }
  return (
    <div>
      {mySavedListings.map((listing: any) => (
        <ListingCard
          key={listing?._id}
          listing={listing}
          primaryAction={{
            label: "Remove",
            icon: (
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
            onClick: (id) => handleToggleBookmark(id),
            variant: "warning",
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
