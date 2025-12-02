import React from "react";

const Profile = () => {
  return (
    <div className="bg-white text-black min-h-screen">
      <div className="container mx-auto">
        <div className="flex justify-between items-center px-8 py-8">
          <h2 className="text-2xl font-bold">Profile</h2>
          <button className="px-4 py-4 bg-green-500 rounded-xl text-white cursor-pointer">
            Edit profile
          </button>
        </div>
        <div className="flex flex-col md:flex-row gap-8 mx-auto items-center justify-center mt-16">
          <div>
            {/* for image  */}
            <p className="p-12 border-gray-800 border rounded-full text-3xl">
              A1
            </p>
          </div>
          <div className="">
            {/* for details  */}
            <p>Name - A11user</p>
            <p>Email - a11user@gmail.com</p>
            <p>Mobile No - 9898989898</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
