// "use client";
// import { resetFilters, setFilters } from "@/redux/slices/filterSlice";
// import { setListings } from "@/redux/slices/listingSlice";
// import { RootState } from "@/redux/store";
// import axios from "axios";
// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";

// export default function FiltersSidebar() {
//   const dispatch = useDispatch();
//   const filters = useSelector((state: RootState) => state.filters);

//   // -------------
//   // const [query, setQuery] = useState(filters.location);
//   const [debouncedQuery, setDebouncedQuery] = useState("");
//   const [results, setResults] = useState([]);
//   const [loading, setLoading] = useState(false);

//   // Update debouncedQuery 4s after last keypress
//   useEffect(() => {
//     const handler = setTimeout(() => {
//       setDebouncedQuery(filters.location.trim());
//     }, 2000); // 4 seconds

//     return () => clearTimeout(handler);
//   }, [filters.location]);

//   // Call API when debouncedQuery changes
//   useEffect(() => {
//     if (!debouncedQuery) {
//       console.log("no data ");

//       return;
//     }

//     const fetchData = async () => {
//       try {
//         setLoading(true);
//         const res = await axios.get(
//           `/api/v1/listing/search/${encodeURIComponent(debouncedQuery)}`
//         );
//         if (!res) throw new Error("Request failed");
//         console.log("res is - ", res);

//         const data = res?.data.results;
//         dispatch(setListings(data));
//         console.log(data);
//       } catch (error) {
//         console.error(error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [debouncedQuery]);

//   // ----------------

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
//   ) => {
//     dispatch(setFilters({ [e.target.name]: e.target.value }));
//   };

//   const handleSearch = () => {
//     console.log("filters value - ", filters);
//   };

//   return (
//     <div className="border p-4 rounded-lg  shadow-sm space-y-4 md:sticky top-24">
//       <div className="flex items-center justify-between">
//         <h2 className="text-lg font-semibold">Filters</h2>
//         <button
//           onClick={() => dispatch(resetFilters())}
//           className="mt-3 bg-gray-200 text-black text-sm px-3 py-1 rounded cursor-pointer"
//         >
//           Reset Filters
//         </button>
//       </div>

//       <div>
//         <label>Location</label>
//         <input
//           type="text"
//           name="location"
//           value={filters.location}
//           onChange={handleChange}
//           // value={query}
//           // onChange={(e) => setQuery(e.target.value)}
//           className="border p-2 rounded w-full"
//         />
//       </div>

//       <div>
//         <label>City Name</label>
//         <input
//           type="text"
//           name="cityName"
//           value={filters.cityName}
//           onChange={handleChange}
//           className="border p-2 rounded w-full"
//         />
//       </div>
//       <div>
//         <label>Rent upto</label>
//         <input
//           name="rent"
//           type="number"
//           min={0}
//           max={200000}
//           value={filters.rent ?? ""}
//           onChange={handleChange}
//           className="border p-2 rounded w-full"
//         />
//       </div>

//       <div>
//         <label>Accommodation Type</label>
//         <select
//           name="accommodationType"
//           value={filters.accommodationType}
//           onChange={handleChange}
//           className="border p-2 rounded w-full"
//         >
//           <option value="">Any</option>
//           <option value="flatmate">Flatmate</option>
//           <option value="roommate">Roommate</option>
//           <option value="pg">PG</option>
//         </select>
//       </div>

//       <div>
//         <label>Gender</label>
//         <select
//           name="lookingForGender"
//           value={filters.lookingForGender}
//           onChange={handleChange}
//           className="border p-2 rounded w-full"
//         >
//           <option value="">Any</option>
//           <option value="male">Male</option>
//           <option value="female">Female</option>
//         </select>
//       </div>

//       <button
//         onClick={() => handleSearch()}
//         className="mt-3 bg-gray-200 text-black font-semibold text-sm px-3 py-1 rounded cursor-pointer flex items-center justify-center"
//       >
//         Search
//       </button>
//     </div>
//   );
// }

// "use client";
// import { resetFilters, setFilters } from "@/redux/slices/filterSlice";
// import {
//   setListings,
//   setLoading,
//   setError,
//   clearListings,
// } from "@/redux/slices/listingSlice";
// import { RootState } from "@/redux/store";
// import axios from "axios";
// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";

// export default function FiltersSidebar() {
//   const dispatch = useDispatch();
//   const filters = useSelector((state: RootState) => state.filters);
//   const [debouncedQuery, setDebouncedQuery] = useState("");

//   // Debounce location input
//   useEffect(() => {
//     const handler = setTimeout(() => {
//       setDebouncedQuery(filters.location.trim());
//     }, 2000); // 2 seconds

//     return () => clearTimeout(handler);
//   }, [filters.location]);

//   // Fetch data when debounced query changes
//   useEffect(() => {
//     if (!debouncedQuery) {
//       console.log("No search query");
//       return;
//     }

//     const fetchData = async () => {
//       try {
//         dispatch(setLoading(true)); // Set loading to true

//         const res = await axios.get(
//           `/api/v1/listing/search/${encodeURIComponent(debouncedQuery)}`,
//           { withCredentials: true }
//         );

//         if (!res || !res.data) throw new Error("Request failed");

//         const data = res?.data.results || [];
//         dispatch(setListings(data)); // Set listings and loading to false

//         console.log("Fetched listings:", data);
//       } catch (error: any) {
//         console.error("Search error:", error);
//         dispatch(setError(error?.message || "Failed to fetch listings"));
//       }
//     };

//     fetchData();
//   }, [debouncedQuery, dispatch]);

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
//   ) => {
//     dispatch(setFilters({ [e.target.name]: e.target.value }));
//   };

//   const handleReset = () => {
//     dispatch(resetFilters());
//     dispatch(clearListings());
//   };

//   const handleSearch = () => {
//     console.log("Current filters:", filters);
//     // Additional search logic if needed
//   };

//   return (
//     <div className="border border-gray-700 bg-gray-800 p-4 rounded-lg shadow-sm space-y-4 md:sticky top-24">
//       <div className="flex items-center justify-between">
//         <h2 className="text-lg font-semibold text-white">Filters</h2>
//         <button
//           onClick={handleReset}
//           className="bg-gray-700 text-white text-sm px-3 py-1 rounded hover:bg-gray-600 transition"
//         >
//           Reset Filters
//         </button>
//       </div>

//       <div>
//         <label className="block text-sm font-medium text-gray-300 mb-1">
//           Location
//         </label>
//         <input
//           type="text"
//           name="location"
//           value={filters.location}
//           onChange={handleChange}
//           placeholder="Enter location..."
//           className="border border-gray-600 bg-gray-700 text-white p-2 rounded w-full focus:outline-none focus:border-blue-500"
//         />
//       </div>

//       <div>
//         <label className="block text-sm font-medium text-gray-300 mb-1">
//           City Name
//         </label>
//         <input
//           type="text"
//           name="cityName"
//           value={filters.cityName}
//           onChange={handleChange}
//           placeholder="Enter city..."
//           className="border border-gray-600 bg-gray-700 text-white p-2 rounded w-full focus:outline-none focus:border-blue-500"
//         />
//       </div>

//       <div>
//         <label className="block text-sm font-medium text-gray-300 mb-1">
//           Rent upto
//         </label>
//         <input
//           name="rent"
//           type="number"
//           min={0}
//           max={200000}
//           value={filters.rent ?? ""}
//           onChange={handleChange}
//           placeholder="Max rent..."
//           className="border border-gray-600 bg-gray-700 text-white p-2 rounded w-full focus:outline-none focus:border-blue-500"
//         />
//       </div>

//       <div>
//         <label className="block text-sm font-medium text-gray-300 mb-1">
//           Accommodation Type
//         </label>
//         <select
//           name="accommodationType"
//           value={filters.accommodationType}
//           onChange={handleChange}
//           className="border border-gray-600 bg-gray-700 text-white p-2 rounded w-full focus:outline-none focus:border-blue-500"
//         >
//           <option value="">Any</option>
//           <option value="flatmate">Flatmate</option>
//           <option value="roommate">Roommate</option>
//           <option value="pg">PG</option>
//         </select>
//       </div>

//       <div>
//         <label className="block text-sm font-medium text-gray-300 mb-1">
//           Gender
//         </label>
//         <select
//           name="lookingForGender"
//           value={filters.lookingForGender}
//           onChange={handleChange}
//           className="border border-gray-600 bg-gray-700 text-white p-2 rounded w-full focus:outline-none focus:border-blue-500"
//         >
//           <option value="">Any</option>
//           <option value="male">Male</option>
//           <option value="female">Female</option>
//         </select>
//       </div>

//       <button
//         onClick={handleSearch}
//         className="w-full bg-linear-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-2 px-4 rounded transition"
//       >
//         Search
//       </button>
//     </div>
//   );
// }

"use client";
import { resetFilters, setFilters } from "@/redux/slices/filterSlice";
import {
  setListings,
  setLoading,
  setError,
  clearListings,
} from "@/redux/slices/listingSlice";
import { RootState } from "@/redux/store";
import api from "@/utils/axiosClient";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function FiltersSidebar() {
  const dispatch = useDispatch();
  const filters = useSelector((state: RootState) => state.filters);
  const [debouncedQuery, setDebouncedQuery] = useState("");

  // Debounce location input for auto-search
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(filters.location.trim());
    }, 2000); // 2 seconds

    return () => clearTimeout(handler);
  }, [filters.location]);

  // Auto-fetch when location is debounced
  useEffect(() => {
    if (!debouncedQuery) {
      console.log("No search query");
      return;
    }

    fetchFilteredListings({ location: debouncedQuery });
  }, [debouncedQuery]);

  // Function to fetch filtered listings
  const fetchFilteredListings = async (customFilters?: any) => {
    try {
      dispatch(setLoading(true));

      // Use custom filters or current filters from Redux
      const filtersToApply = customFilters || filters;

      // Build query params
      const params = new URLSearchParams();

      if (filtersToApply.location) {
        params.append("location", filtersToApply.location);
      }
      if (filtersToApply.cityName) {
        params.append("cityName", filtersToApply.cityName);
      }
      if (filtersToApply.rent) {
        params.append("rent", filtersToApply.rent.toString());
      }
      if (filtersToApply.accommodationType) {
        params.append("accommodationType", filtersToApply.accommodationType);
      }
      if (filtersToApply.lookingForGender) {
        params.append("lookingForGender", filtersToApply.lookingForGender);
      }

      const queryString = params.toString();
      const url = `/listing/filter${
        queryString ? `?${queryString}` : ""
      }`;
      // const url = `/api/v1/listing/filter${
      //   queryString ? `?${queryString}` : ""
      // }`;

      console.log("Fetching with URL:", url);

      // const res = await axios.get(url);
      const res = await api.get(url);

      if (!res || !res.data) throw new Error("Request failed");

      const data = res?.data.results || [];
      dispatch(setListings(data));

      console.log("Fetched listings:", data);
    } catch (error: any) {
      console.error("Search error:", error);
      dispatch(
        setError(error?.response?.data?.message || "Failed to fetch listings")
      );
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    dispatch(setFilters({ [e.target.name]: e.target.value }));
  };

  const handleReset = () => {
    dispatch(resetFilters());
    dispatch(clearListings());
  };

  const handleSearch = () => {
    // console.log("Searching with filters:", filters);
    fetchFilteredListings();
  };

  return (
    <div className="border border-gray-700 bg-gray-800 p-4 rounded-lg shadow-sm space-y-4 md:sticky top-24">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-white">Filters</h2>
        <button
          onClick={handleReset}
          className="bg-gray-700 text-white text-sm px-3 py-1 rounded hover:bg-gray-600 transition"
        >
          Reset
        </button>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">
          Location
        </label>
        <input
          type="text"
          name="location"
          value={filters.location}
          onChange={handleChange}
          placeholder="e.g., Sector 54"
          className="border border-gray-600 bg-gray-700 text-white p-2 rounded w-full focus:outline-none focus:border-blue-500"
        />
        <p className="text-xs text-gray-500 mt-1">
          Auto-searches after 2 seconds
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">
          City Name
        </label>
        <input
          type="text"
          name="cityName"
          value={filters.cityName}
          onChange={handleChange}
          placeholder="e.g., Delhi"
          className="border border-gray-600 bg-gray-700 text-white p-2 rounded w-full focus:outline-none focus:border-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">
          Max Rent (₹)
        </label>
        <input
          name="rent"
          type="number"
          min={0}
          max={200000}
          value={filters.rent ?? ""}
          onChange={handleChange}
          placeholder="e.g., 15000"
          className="border border-gray-600 bg-gray-700 text-white p-2 rounded w-full focus:outline-none focus:border-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">
          Accommodation Type
        </label>
        <select
          name="accommodationType"
          value={filters.accommodationType}
          onChange={handleChange}
          className="border border-gray-600 bg-gray-700 text-white p-2 rounded w-full focus:outline-none focus:border-blue-500"
        >
          <option value="">Any</option>
          <option value="flatmate">Flatmate</option>
          <option value="roommate">Roommate</option>
          <option value="pg">PG</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">
          Looking For Gender
        </label>
        <select
          name="lookingForGender"
          value={filters.lookingForGender}
          onChange={handleChange}
          className="border border-gray-600 bg-gray-700 text-white p-2 rounded w-full focus:outline-none focus:border-blue-500"
        >
          <option value="">Any</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>

      <button
        onClick={handleSearch}
        className="w-full bg-linear-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-2 px-4 rounded transition shadow-md hover:shadow-lg"
      >
        Apply Filters
      </button>
    </div>
  );
}
