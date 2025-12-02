// src/redux/listingSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Listing = {
  _id: string;
  postedBy: string;
  postedByName: string;
  location: string;
  cityName: string;
  rent: number;
  lookingForGender: "male" | "female" | "any" | string;
  isFeatured: boolean;
  contactNumber: string;
  contactEmail: string;
  facilities: string[];
  bookmarkedBy: string[];
  createdAt: string; // or Date if you convert
  updatedAt: string;
  __v: number;
  accommodationType: "flatmate" | "room" | "pg" | string;
};

export type ListingsState = {
  listings: Listing[];
};

const initialState: ListingsState = {
  listings: [],
};

const listingSlice = createSlice({
  name: "listings",
  initialState,
  reducers: {
    setListings(state, action: PayloadAction<Listing[]>) {
      state.listings = action.payload;
    },
    // optional: add single listing
    addListing(state, action: PayloadAction<Listing>) {
      state.listings.push(action.payload);
    },
    // optional: clear all
    clearListings(state) {
      state.listings = [];
    },
  },
});

export const { setListings, addListing, clearListings } = listingSlice.actions;
export default listingSlice.reducer;
