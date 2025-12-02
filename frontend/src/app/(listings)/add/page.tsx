"use client";

import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { store } from "@/redux/store";

interface ListingForm {
  postedByName: string;
  location: string;
  cityName: string;
  rent: string;
  lookingForGender: string;
  accommodationType: string;
  contactNumber?: string;
  contactEmail: string;
  facilities: string[];
  imageUrl?: File | null;
}

const AddListingPage: React.FC = () => {
  const [formData, setFormData] = useState<ListingForm>({
    postedByName: "",
    location: "",
    cityName: "",
    rent: "",
    lookingForGender: "",
    accommodationType: "",
    contactNumber: "",
    contactEmail: "",
    facilities: [],
    // uploadImage: null,
  });

  const [isFeatured, setIsFeatured] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const user = useSelector((store: any) => store?.auth?.user);
    console.log("user in add listing -", user);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   if (e.target.files) {
  //     setFormData({ ...formData, uploadImage: e.target.files[0] });
  //   }
  // };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImageUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);

  try {
    let uploadedImage = imageUrl;

    // ✅ 1. Upload image to Cloudinary (if needed)
    // If you want real cloudinary upload do this:
    // const formImageData = new FormData();
    // formImageData.append("file", formData.uploadImage);
    // formImageData.append("upload_preset", "your_preset");
    // const imgUploadRes = await axios.post("cloudinary-upload-url", formImageData);
    // uploadedImage = imgUploadRes.data.secure_url;

    // ✅ 2. ALWAYS create the listing with isFeatured: false
    const listingRes = await axios.post(
      // "http://localhost:5000/api/v1/listing/add",
      // `${process.env.NEXT_PUBLIC_API_BASE_URL}/listing/add`,
      `/api/v1/listing/add`,
      {
        postedByName: formData?.postedByName,
        location: formData?.location,
        cityName: formData?.cityName,
        rent: formData?.rent,
        lookingForGender: formData?.lookingForGender,
        accommodationType: formData?.accommodationType,
        contactNumber: formData?.contactNumber,
        contactEmail: formData?.contactEmail,
        facilities: formData?.facilities,
        imageUrl: uploadedImage,
        isFeatured: false, // ✅ Always false
      },
      { withCredentials: true }
    );

    console.log("listingRes-", listingRes);
    
    const listingId = listingRes.data.newListing._id;

    // ✅ 3. If Featured → Start Stripe Checkout (with listingId)
    if (isFeatured) {
      const checkoutRes = await axios.post(
        // "http://localhost:5000/api/v1/transaction/create-checkout-session",
        // `${process.env.NEXT_PUBLIC_API_BASE_URL}/transaction/create-checkout-session`,
        `/api/v1/transaction/create-checkout-session`,
        {
          amount: 199,
          listingId,
        },
      { withCredentials: true }
    );


      // ✅ Stripe URL returned → redirect user
      window.location.href = checkoutRes.data.url;
      console.log("Stripe session response:", checkoutRes.data);
      // return;
    }

    // ✅ 4. If normal listing → success message
    alert("Listing created successfully!");
    
  } catch (error: any) {
    console.log("Add listing error:", error);
    alert(error.response?.data?.message || "Something went wrong!");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="max-w-lg mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Add New Listing</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="postedByName"
          placeholder="Posted by"
          onChange={handleChange}
          className="border p-2 w-full"
        />
        <input
          name="location"
          placeholder="Location"
          onChange={handleChange}
          className="border p-2 w-full"
        />
        <input
          name="cityName"
          placeholder="City"
          onChange={handleChange}
          className="border p-2 w-full"
        />
        <input
          name="lookingForGender"
          placeholder="lookingForGender"
          onChange={handleChange}
          className="border p-2 w-full"
        />
        <input
          name="accommodationType"
          placeholder="accommodationType"
          onChange={handleChange}
          className="border p-2 w-full"
        />
        <input
          name="rent"
          placeholder="Rent (₹)"
          onChange={handleChange}
          className="border p-2 w-full"
        />
        <input
          name="contactNumber"
          placeholder="Contact Number"
          onChange={handleChange}
          className="border p-2 w-full"
        />

        <input
          name="contactEmail"
          placeholder="Contact Email"
          onChange={handleChange}
          className="border p-2 w-full"
        />

        {/* <label>Upload Image:</label>
        <input type="file" accept="image/*" onChange={handleImageUpload} /> */}

        <label htmlFor="imageUrl" className=" font-medium mb-2">
          Upload Image
        </label>
        <input
          type="file"
          name="imageUrl"
          id="imageUrl"
          accept="image/*"
          onChange={handleImageUpload}
          className="block w-full px-3 py-2 border rounded-md  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={isFeatured}
            onChange={(e) => setIsFeatured(e.target.checked)}
          />
          <span>Mark as Featured (₹199)</span>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          {loading ? "Processing..." : "Add Listing"}
        </button>
      </form>
    </div>
  );
};

export default AddListingPage;
