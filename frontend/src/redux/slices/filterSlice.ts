import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface FilterState {
  cityName: string;
  location: string;
  rent: number | null;
  accommodationType: "flatmate" | "roommate" | "pg" | "";
  lookingForGender: "male" | "female" | "any" | "";
  //   page: number;
  //   limit: number;
}

const initialState: FilterState = {
  // filters: {
  cityName: "",
  location: "",
  rent: null,
  accommodationType: "",
  lookingForGender: "",
  //   page: 1,
  //   limit: 10,
  // }
};

const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setFilters: (state, action: PayloadAction<Partial<FilterState>>) => {
      return { ...state, ...action.payload };
    },
    resetFilters: (state) => {
      Object.assign(state, initialState);
    },
    // setPagination: (
    //   state,
    //   action: PayloadAction<{ page: number; limit?: number }>
    // ) => {
    //   state.page = action.payload.page;
    //   if (action.payload.limit) state.limit = action.payload.limit;
    // },
  },
});

export const { setFilters, resetFilters } = filterSlice.actions;
export default filterSlice.reducer;
