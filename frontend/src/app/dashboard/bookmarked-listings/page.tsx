"use client";
import ListingCard from "@/components/ListingCard";
import axios from "axios";
import React, { useEffect, useState } from "react";

const page = () => {
  const [mySavedListings, setMySavedListings] = useState([]);
  const [loading, setLoading] = useState(false);


  useEffect(() => {

    const getMySavedListings = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `/api/v1/listing/bookmarks`
        );
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
    }

    getMySavedListings();

  },[]);

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
        <ListingCard key={listing?._id} listing={listing} />
      ))}
    </div>
  );
};

export default page;
