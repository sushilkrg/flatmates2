// // // src/redux/listingSlice.ts
// // import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// // export type Listing = {
// //   _id: string;
// //   postedBy: string;
// //   postedByName: string;
// //   location: string;
// //   cityName: string;
// //   rent: number;
// //   lookingForGender: "male" | "female" | "any" | string;
// //   isFeatured: boolean;
// //   contactNumber: string;
// //   contactEmail: string;
// //   imageUrl: string;
// //   facilities: string[];
// //   bookmarkedBy: string[];
// //   createdAt: string; // or Date if you convert
// //   updatedAt: string;
// //   __v: number;
// //   accommodationType: "flatmate" | "room" | "pg" | string;
// // };

// // export type ListingsState = {
// //   listings: Listing[];
// // };

// // const initialState: ListingsState = {
// //   listings: [],
// // };

// // const listingSlice = createSlice({
// //   name: "listings",
// //   initialState,
// //   reducers: {
// //     setListings(state, action: PayloadAction<Listing[]>) {
// //       state.listings = action.payload;
// //     },
// //     // optional: add single listing
// //     addListing(state, action: PayloadAction<Listing>) {
// //       state.listings.push(action.payload);
// //     },
// //     // optional: clear all
// //     clearListings(state) {
// //       state.listings = [];
// //     },
// //   },
// // });

// // export const { setListings, addListing, clearListings } = listingSlice.actions;
// // export default listingSlice.reducer;

// // redux/slices/listingSlice.ts
// import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// export type Listing = {
//   _id: string;
//   postedBy: string;
//   postedByName: string;
//   location: string;
//   cityName: string;
//   rent: number;
//   lookingForGender: string;
//   isFeatured: boolean;
//   contactNumber: string;
//   contactEmail: string;
//   facilities: string[];
//   bookmarkedBy: string[];
//   createdAt: string;
//   updatedAt: string;
//   __v: number;
//   accommodationType: string;
//   imageUrl?: string;
// };

// export type ListingsState = {
//   listings: Listing[];
//   loading: boolean; // Add loading state
//   error: string | null;
// };

// const initialState: ListingsState = {
//   listings: [],
//   loading: false,
//   error: null,
// };

// const listingSlice = createSlice({
//   name: "listings",
//   initialState,
//   reducers: {
//     setListings(state, action: PayloadAction<Listing[]>) {
//       state.listings = action.payload;
//       state.loading = false;
//       state.error = null;
//     },
//     setLoading(state, action: PayloadAction<boolean>) {
//       state.loading = action.payload;
//     },
//     setError(state, action: PayloadAction<string>) {
//       state.error = action.payload;
//       state.loading = false;
//     },
//     clearListings(state) {
//       state.listings = [];
//       state.loading = false;
//       state.error = null;
//     },
//   },
// });

// export const { setListings, setLoading, setError, clearListings } = listingSlice.actions;
// export default listingSlice.reducer;

// redux/slices/listingsSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PaginationMeta {
  currentPage: number;
  totalPages: number;
  totalListings: number;
  limit: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

interface ListingsState {
  listings: any[];
  loading: boolean;
  error: string | null;
  pagination: PaginationMeta | null;
}

const initialState: ListingsState = {
  listings: [],
  loading: false,
  error: null,
  pagination: null,
};

const listingsSlice = createSlice({
  name: "listings",
  initialState,
  reducers: {
    setListings: (
      state,
      action: PayloadAction<{ results: any[]; pagination: PaginationMeta }>
    ) => {
      state.listings = action.payload.results;
      state.pagination = action.payload.pagination;
      state.loading = false;
      state.error = null;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
    clearListings: (state) => {
      state.listings = [];
      state.pagination = null;
      state.error = null;
    },
  },
});

export const { setListings, setLoading, setError, clearListings } =
  listingsSlice.actions;
export default listingsSlice.reducer;
