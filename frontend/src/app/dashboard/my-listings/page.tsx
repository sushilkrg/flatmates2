"use client";
import ListingCard from "@/components/ListingCard";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const page = () => {
  const [myListings, setMyListings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const router = useRouter();

  const handleDelete = async (id: string) => {
    console.log("handle delete id -", id);

    if (confirm("Are you sure you want to delete this listing?")) {
      // Call delete API
      const res = await axios.delete(`/api/v1/listing/${id}`);
      if (res?.data?.message) {
        setIsDeleted(!isDeleted);
      }
      console.log("delete res - ", res?.data);
    }
  };

  useEffect(() => {
    const getMyListings = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`/api/v1/listing/mylistings`);
        if (!res) throw new Error("Request failed");
        console.log("res is - ", res);

        const data = res?.data;
        setMyListings(data);
        console.log(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    getMyListings();
  }, [isDeleted]);

  if (loading) {
    return (
      <div>
        <p className="text-center">Loading data...</p>
      </div>
    );
  }
  if (!loading && myListings.length === 0) {
    return (
      <div>
        <p className="text-center">No data available</p>
      </div>
    );
  }
  return (
    <div>
      {myListings.map((listing: any) => (
        <ListingCard
          key={listing?._id}
          listing={listing}
          primaryAction={{
            label: "Delete",
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
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            ),
            onClick: (id) => handleDelete(id),
            variant: "danger",
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
          // secondaryAction={{
          //   label: "Edit",
          //   icon: (
          //     <svg
          //       className="w-4 h-4"
          //       fill="none"
          //       stroke="currentColor"
          //       viewBox="0 0 24 24"
          //     >
          //       <path
          //         strokeLinecap="round"
          //         strokeLinejoin="round"
          //         strokeWidth={2}
          //         d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
          //       />
          //     </svg>
          //   ),
          //   onClick: (id) => router.push(`/dashboard/edit-listing/${id}`),
          // }}
        />
      ))}
    </div>
  );
};

export default page;
