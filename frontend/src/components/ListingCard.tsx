"use client";
import axios from "axios";
// import { LISTING_API_ENDPOINT } from '../utils/constant';
import { useDispatch, useSelector } from "react-redux";
// import toast from 'react-hot-toast';

const ListingCard = ({listing}: any) => {
    console.log("listing -", listing);
    
  // let { listing } = listings;
  // const navigate = useNavigate();
  const dispatch = useDispatch();
  // const user = useSelector(store => store.user.user);

  const handleDetails = (id: any) => {
    // navigate(`/details/${id}`);
  };

  // const handleSaveForLater = async (id) => {
  //     if (!user) {
  //         toast.error("Login to save for later");
  //         return;
  //     }
  //     try {
  //         const res = await axios.post(`${LISTING_API_ENDPOINT}/saveforlater/${id}`, { id: user?._id },
  //             {
  //                 withCredentials: true
  //             });
  //         toast.success(res?.data?.message);
  //         // console.log("res ok-", res.status);
  //         if (res.status === 200) {
  //             dispatch(setSavedForLaterListings(res?.data?.listing));
  //         }

  //     } catch (error) {
  //         console.error(error);
  //     }
  // }

  // const handleDeleteListing = async (id) => {
  //     try {
  //         const res = await axios.delete(`${LISTING_API_ENDPOINT}/${id}`,
  //             {
  //                 withCredentials: true
  //             });
  //         toast.success(res?.data?.message);
  //         dispatch(deleteListing(res?.data?.listing))
  //     } catch (error) {
  //         console.error(error);
  //     }
  // }

  return (
    <div className="border border-gray-300 p-4 flex flex-row mb-4 mx-1 rounded-lg shadow-lg shadow-cyan-500/30">
      <div className="bg-gray-200  md:h-56 flex-1 items-center justify-center text-gray-500  rounded-lg">
        <img
          className="object-cover w-full h-full "
          src={listing?.image ? listing?.image : "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg"}
          alt="No image"
        />
      </div>
      <div className="mt-0 flex-1 pl-4">
        <p>
          <span className="text-gray-300">Posted by: </span>
          <span className="text-white font-semibold">
            {" "}
            {listing?.postedByName}
          </span>
        </p>
        <p>
          <span className="text-gray-300">Location: </span>
          <span className="text-white font-semibold"> {listing?.location}</span>
        </p>
        <p>
          <span className="text-gray-300">City: </span>
          <span className="text-white font-semibold"> {listing?.cityName}</span>
        </p>
        <p>
          <span className="text-gray-300">Rent: </span>
          <span className="text-white font-semibold"> ₹ {listing?.rent}</span>
        </p>
        <p>
          <span className="text-gray-300">Looking for: </span>
          <span className="text-white font-semibold">
            {" "}
            {listing?.lookingForGender}
          </span>
        </p>
        <p>
          <span className="text-gray-300">Acco Type: </span>
          <span className="text-white font-semibold">
            {" "}
            {listing?.accommodationType}
          </span>
        </p>
        <div className="flex justify-between flex-row md:flex-row">
          {/* {user?._id != listing?.postedBy && <button onClick={() => handleSaveForLater(listing?._id)} className="mt-4 flex items-center justify-center bg-white hover:bg-slate-300  px-4 py-1 rounded-lg"> */}
          {/* save for later */}
          <img
            className="w-8 h-8 border rounded-md"
            src="https://w7.pngwing.com/pngs/430/166/png-transparent-bookmark-computer-icons-bookmark-angle-rectangle-black-thumbnail.png"
            alt="save for later"
          />
          {/* </button>} */}
          {/* {user?._id == listing?.postedBy && <button onClick={() => handleDeleteListing(listing?._id)} className="mt-4 flex items-center justify-center bg-red-700 hover:bg-red-900 text-white px-4 py-1 rounded-lg">
                        delete
                    </button>} */}
          <button
            onClick={() => handleDetails(listing?._id)}
            className="mt-4 bg-white hover:bg-slate-300 text-black px-4 py-2 rounded-lg"
          >
            Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default ListingCard;
