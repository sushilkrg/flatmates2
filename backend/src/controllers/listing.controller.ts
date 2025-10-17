import { v2 as cloudinary } from "cloudinary";
import { Request, Response } from "express";
import Listing from "../models/Listing";
import User from "../models/User";

export const getAllListings = async (req: Request, res: Response) => {
  try {
    const listings = await Listing.find().sort({ createdAt: -1 });

    if (listings.length === 0) {
      return res.status(200).json([]);
    }
    return res.status(200).json(listings);
  } catch (error) {
    console.error("Error in getAllListings", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getListingDetails = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const listingId = id;

    const listingDetails = await Listing.findById(listingId);

    if (!listingDetails) {
      return res.status(404).json({ message: "Listing not found" });
    }

    res.status(200).json({ listingDetails });
  } catch (err) {
    console.error("Error in getListingDetails", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const addListing = async (req: Request, res: Response) => {
  try {
    const {
      postedByName,
      location,
      cityName,
      rent,
      accomodationType,
      lookingForGender,
      contactNumber,
      contactEmail,
      facilities,
    } = req.body;

    let { imageUrl } = req.body;

    const userId = (req as any).user?._id.toString();

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    if (
      !postedByName ||
      !location ||
      !cityName ||
      !rent ||
      !accomodationType ||
      !lookingForGender ||
      !contactEmail
    ) {
      return res.status(400).json({ error: "User must fill required data" });
    }

    if (imageUrl) {
      const uploadedResponse = await cloudinary.uploader.upload(imageUrl);
      imageUrl = uploadedResponse.secure_url;
    }

    const newListing = new Listing({
      postedBy: userId,
      postedByName,
      location,
      cityName,
      rent,
      accomodationType,
      lookingForGender,
      imageUrl,
      isFeatured: false,
      contactNumber,
      contactEmail,
      facilities,
    });

    await newListing.save();
    await User.updateOne(
      { _id: userId },
      { $push: { myListings: newListing?._id } }
    );
    return res
      .status(200)
      .json({ newListing, message: "New Listing added successfully" });
  } catch (err) {
    console.error("Error");
    res.status(500).json({ error: "Internal Server Error" });
  }
};
export const toggleBookmark = async (req: Request, res: Response) => {
  try {
    const { listingId } = req.params;
    const userId = (req as any).user?._id.toString();

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const isBookmarked = user.myBookmarkedListings?.includes(listingId as any);

    if (isBookmarked) {
      // remove
      user.myBookmarkedListings = user.myBookmarkedListings?.filter(
        (id) => id.toString() !== listingId
      );
    } else {
      //add
      user.myBookmarkedListings?.push(listingId as any);
    }

    await user.save();

    res.status(200).json({
      message: isBookmarked ? "Listing unbookmarked" : "Listing bookmarked",
      isBookmarked: !isBookmarked,
      bookmarkedListings: user.myBookmarkedListings,
    });
  } catch (err) {
    console.error("Error");
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
export const getBookmarkedListings = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?._id.toString();

    const user = await User.findById(userId).populate("myBookmarkedListings");
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const bookmarkedListings = user?.myBookmarkedListings;
    if (bookmarkedListings?.length == 0) {
      return res.status(200).json([]);
    }
    return res.status(200).json(bookmarkedListings);
  } catch (err) {
    console.error("Error in getBookmarkedListings", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
export const deleteListing = async (req: Request, res: Response) => {
  try {
    const listingId = req.params.id;
    const listing = await Listing.findById(listingId);
    if (!listing) {
      return res.status(404).json({ error: "Listing not found" });
    }

    if (listing?.postedBy.toString() != req.user._id.toString()) {
      return res
        .status(401)
        .json({ error: "You cannot delete other user listing" });
    }

    if (listing?.imageUrl) {
      const imageUrl: string = listing.imageUrl;
      const imgId = imageUrl.split("/").pop()?.split(".")[0];
      if (imgId) {
        await cloudinary.uploader.destroy(imgId);
      }
    }

    await User.updateOne(
      { _id: req.user._id },
      { $pull: { myListings: listing?._id } }
    );

    await Listing.findByIdAndDelete(listingId);

    return res
      .status(200)
      .json({ listing, message: "Listing deleted successfully" });
  } catch (err) {
    console.error("Error in deleteListing", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
export const getMyListings = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?._id.toString();
    const user = await User.findById(userId).populate("myListings");

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const myListings = user?.myListings;

    return res.status(200).json(myListings);
  } catch (err) {
    console.error("Error in getMyListings", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
export const searchByLocation = async (req: Request, res: Response) => {
  try {
    const { location } = req.params;
    if (!location || location.trim() === "") {
      return res.status(400).json({ error: "Location is required" });
    }

    // Case-insensitive search using RegExp
    const regex = new RegExp(location, "i");

    // match with either cityName or location
    const listings = await Listing.find({
      $or: [{ location: regex }, { cityName: regex }],
    });

    if (!listings || listings.length === 0) {
      return res.status(404).json({ message: "No listings found" });
    }

    return res.status(200).json({
      count: listings.length,
      results: listings,
    });
  } catch (err) {
    console.error("Error");
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
export const getFilteredListings = async (req: Request, res: Response) => {
  try {
    const { location, cityName, rent, accommodationType, lookingForGender } =
      req.query;

    const filter: any = {};

    if (location) {
      filter.location = { $regex: new RegExp(location as string, "i") };
    }
    if (cityName) {
      filter.cityName = { $regex: new RegExp(cityName as string, "i") };
    }
    if (rent) {
      const rentValue = Number(rent);
      if (!isNaN(rentValue)) {
        filter.rent = { $lte: rentValue };
      }
    }
    if (accommodationType) {
      filter.accommodationType = accommodationType;
    }
    if (lookingForGender) {
      filter.lookingForGender = lookingForGender;
    }

    const listings = await Listing.find(filter).sort({ createdAt: -1 });

    if (!listings || listings.length === 0) {
      return res.status(404).json({ message: "No listings" });
    }

    return res.status(200).json({
      count: listings.length,
      results: listings,
    });
  } catch (err) {
    console.error("Error in getFilteredListings:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
