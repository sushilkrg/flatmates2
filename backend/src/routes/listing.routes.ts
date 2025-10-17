import express from "express";
import {
  addListing,
  toggleBookmark ,
  deleteListing,
  getAllListings,
  getBookmarkedListings,
  getFilteredListings,
  getListingDetails,
  getMyListings,
  searchByLocation,
} from "../controllers/listing.controller";
import { isAuthenticated } from "../middlewares/isAuthenticated";

const router = express.Router();

router.get("/", getAllListings);
router.get("/details/:id", getListingDetails);
router.post("/add", isAuthenticated, addListing);
router.patch("/bookmark/:listingId", isAuthenticated, toggleBookmark );
router.get("/bookmarks", isAuthenticated, getBookmarkedListings);
router.delete("/:id", isAuthenticated, deleteListing);
router.get("/mylistings", isAuthenticated, getMyListings);
router.get("/search/:location", searchByLocation);
router.get("/search/", getFilteredListings);

export default router;
