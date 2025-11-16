"use client";
import React, { useEffect } from "react";

const Profile = async () => {
  useEffect(() => {
    const token = typeof window !== "undefined" ? document.cookie : "";
    console.log("token is-", token);
  }, []);
  return <div>Profile</div>;
};

export default Profile;
