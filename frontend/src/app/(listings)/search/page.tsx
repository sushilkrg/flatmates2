// "use client";
// import ListingCard from "@/components/ListingCard";
// import { RootState, store } from "@/redux/store";
// import axios from "axios";
// import { useRouter } from "next/navigation";
// import React from "react";
// import { useSelector } from "react-redux";

// const page = () => {
//   const listingsData = useSelector(
//     (store: RootState) => store.listings.listings
//   );

//   const router = useRouter();

//   console.log("lisitng data in search page - ", listingsData);

//   const handleBookmark = async (listingId: string) => {
//     try {
//       const result = await axios.patch(
//         `/api/v1/listing/bookmark/${listingId}`,
//         {
//           // headers: { "Content-Type": "application/json" },
//           withCredentials: true,
//         }
//       );

//       console.log("bookmark result-", result);
//       // if (result?.status !== 200) {
//       //   console.log(result);
//       // } else {
//       //   router.push("/search");
//       // }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   if (listingsData.length == 0) {
//     return (
//       <div>
//         <h2 className="text-center mb-8">search page</h2>
//         <p>No data with search item</p>
//       </div>
//     );
//   }

//   return (
//     <div>
//       <h2 className="text-center mb-8">search page</h2>
//       {/* {listingsData.map((listingData) => (
//         <ListingCard
//           key={listingData?._id}
//           listing={listingData}
//           onBookmark={(id) => handleBookmark(id)}
//           onViewDetails={(id) => router.push(`/details/${id}`)}
//         />
//       ))} */}

//       {listingsData.map((listing) => (
//         <ListingCard
//           key={listing._id}
//           listing={listing}
//           primaryAction={{
//             label: "Save",
//             activeLabel: "Saved",
//             icon: (
//               <svg
//                 className="w-4 h-4"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
//                 />
//               </svg>
//             ),
//             activeIcon: (
//               <svg
//                 className="w-4 h-4"
//                 fill="currentColor"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
//                 />
//               </svg>
//             ),
//             onClick: (id) => handleBookmark(id),
//             variant: "primary",
//           }}
//           secondaryAction={{
//             label: "View Details",
//             icon: (
//               <svg
//                 className="w-4 h-4"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M9 5l7 7-7 7"
//                 />
//               </svg>
//             ),
//             onClick: (id) => router.push(`/details/${id}`),
//           }}
//         />
//       ))}
//     </div>
//   );
// };

// export default page;

"use client";
import ListingCard from "@/components/ListingCard";
import ListingCardSkeleton from "@/components/ui/ListingCardShimmer";
import { RootState } from "@/redux/store";
import api from "@/utils/axiosClient";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

const SearchPage = () => {
  const listingsData = useSelector(
    (store: RootState) => store.listings.listings
  );
  const isLoading = useSelector((store: RootState) => store.listings.loading);
  const error = useSelector((store: RootState) => store.listings.error);
  const router = useRouter();

  const handleBookmark = async (listingId: string) => {
    try {
      const result = await api.patch(
        `/listing/bookmark/${listingId}`
        // ,
        // { withCredentials: true }
      );
      // const result = await axios.patch(
      //   `/api/v1/listing/bookmark/${listingId}`,
      //   { withCredentials: true }
      // );
      console.log("Bookmark result:", result);
    } catch (error) {
      console.error("Bookmark error:", error);
    }
  };

  // Show loading skeletons
  if (isLoading) {
    return (
      <div>
        <h2 className="text-center text-2xl font-bold text-white mb-8 mt-8">
          Searching...
        </h2>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <ListingCardSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  // Show error message
  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <svg
          className="w-24 h-24 text-red-500 mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <h2 className="text-2xl font-bold text-white mb-2">Error</h2>
        <p className="text-gray-400 mb-6">{error}</p>
        <button
          onClick={() => router.push("/")}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Back to Home
        </button>
      </div>
    );
  }

  // Show no results
  if (listingsData.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <svg
          className="w-24 h-24 text-gray-600 mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <h2 className="text-2xl font-bold text-white mb-2">No Results Found</h2>
        <p className="text-gray-400 mb-6">Try adjusting your search filters</p>
        <button
          onClick={() => router.push("/")}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div>
      <h3 className="text-center text-xl font-mono text-gray-300 mb-8 mt-8">
        Around {listingsData.length} search results
      </h3>

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
            requiresAuth: true,
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

export default SearchPage;
