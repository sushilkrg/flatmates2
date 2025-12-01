"use client";
import { axiosClient } from "@/lib/axiosClient";
import { setUser } from "@/redux/slices/authSlice";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();
  const dispatch = useDispatch();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Password do not match");
      return;
    }
    try {
      // const res = await axiosClient.post("/auth/signup", {
      //   body: JSON.stringify({
      //     name,
      //     email,
      //     password,
      //   }),
      // });
      const result = await axios.post(
        // "http://localhost:5000/api/v1/auth/login",
        // `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/signup`,
        `/api/vi/auth/signup`,
        {
          name,
          email,
          password,
        },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      // const data = await res.json();

      // if (!res.ok) {
      //   throw new Error(data.error || "Registration failed");
      // }

      console.log("result-", result);
      dispatch(setUser(result.data));
      if (result?.status !== 200) {
        console.log(result);
      } else {
        router.push("/search");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-800 flex flex-col justify-center items-center py-12 px-2 lg:px-8 text-black">
      {/* mini-box  */}
      <div className="bg-white w-full md:w-100 py-8 md:px-8 px-6 shadow rounded-lg">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-2">
          Join Flatmates
        </h2>
        <p className="text-gray-500 text-center mb-6">
          Start your flatmates/roommates search
        </p>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name" className="block font-semibold text-gray-700">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block font-semibold text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              autoComplete="email"
              required
              className="w-full mt-1 text-black px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block font-semibold text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              autoComplete="new-password"
              required
              className="w-full mt-1 text-black px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="confirm-password"
              className="block font-semibold text-gray-700"
            >
              Confirm Password
            </label>
            <input
              type="password"
              name="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Enter your password again"
              autoComplete="new-password"
              required
              className="w-full mt-1 text-black px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer"
            >
              Create Account
            </button>
          </div>
        </form>
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-indigo-600 hover:text-indigo-500 font-semibold"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
