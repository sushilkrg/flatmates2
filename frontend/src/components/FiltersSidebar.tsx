"use client";
import { resetFilters, setFilters } from "@/redux/slices/filterSlice";
import { setListings } from "@/redux/slices/listingSlice";
import { RootState } from "@/redux/store";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function FiltersSidebar() {
  const dispatch = useDispatch();
  const filters = useSelector((state: RootState) => state.filters);

  // -------------
  // const [query, setQuery] = useState(filters.location);
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  // Update debouncedQuery 4s after last keypress
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(filters.location.trim());
    }, 2000); // 4 seconds

    return () => clearTimeout(handler);
  }, [filters.location]);

  // Call API when debouncedQuery changes
  useEffect(() => {
    if (!debouncedQuery) {
      console.log("no data ");

      return;
    }

    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `/api/v1/listing/search/${encodeURIComponent(debouncedQuery)}`
        );
        if (!res) throw new Error("Request failed");
        console.log("res is - ", res);

        const data = res?.data.results;
        dispatch(setListings(data));
        console.log(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [debouncedQuery]);

  // ----------------

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    dispatch(setFilters({ [e.target.name]: e.target.value }));
  };

  const handleSearch = () => {
    console.log("filters value - ", filters);
  };

  return (
    <div className="border p-4 rounded-lg  shadow-sm space-y-4 md:sticky top-24">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Filters</h2>
        <button
          onClick={() => dispatch(resetFilters())}
          className="mt-3 bg-gray-200 text-black text-sm px-3 py-1 rounded cursor-pointer"
        >
          Reset Filters
        </button>
      </div>

      <div>
        <label>Location</label>
        <input
          type="text"
          name="location"
          value={filters.location}
          onChange={handleChange}
          // value={query}
          // onChange={(e) => setQuery(e.target.value)}
          className="border p-2 rounded w-full"
        />
      </div>

      <div>
        <label>City Name</label>
        <input
          type="text"
          name="cityName"
          value={filters.cityName}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        />
      </div>
      <div>
        <label>Rent upto</label>
        <input
          name="rent"
          type="number"
          min={0}
          max={200000}
          value={filters.rent ?? ""}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        />
      </div>

      <div>
        <label>Accommodation Type</label>
        <select
          name="accommodationType"
          value={filters.accommodationType}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        >
          <option value="">Any</option>
          <option value="flatmate">Flatmate</option>
          <option value="roommate">Roommate</option>
          <option value="pg">PG</option>
        </select>
      </div>

      <div>
        <label>Gender</label>
        <select
          name="lookingForGender"
          value={filters.lookingForGender}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        >
          <option value="">Any</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>

      <button
        onClick={() => handleSearch()}
        className="mt-3 bg-gray-200 text-black font-semibold text-sm px-3 py-1 rounded cursor-pointer flex items-center justify-center"
      >
        Search
      </button>
    </div>
  );
}
