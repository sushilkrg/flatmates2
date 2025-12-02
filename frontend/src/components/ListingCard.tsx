import React from "react";

const ListingCard = ({ listingData }: any) => {
  console.log(listingData);

  return (
    <div className="border border-white text-white p-8 rounded-xl mb-8">
      <h2>Listing Card</h2>
      <p>{listingData.postedByName}</p>
      <p>{listingData.location}</p>
      <p>{listingData.cityName}</p>
    </div>
  );
};

export default ListingCard;
