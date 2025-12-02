"use client";
import { useRouter } from "next/navigation";
import React from "react";

const page = () => {
  const router = useRouter();
  return (
    <div className="flex items-center justify-center">
      <div>payment failed</div>
      <button
        className="px-2 py-2 bg-red-600 text-white"
        onClick={() => router.push("/search")}
      >
        Back to homepage
      </button>
    </div>
  );
};

export default page;
