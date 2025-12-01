"use client";
import { axiosClient } from "@/lib/axiosClient";
import { setUser } from "@/redux/slices/authSlice";
import { store } from "@/redux/store";
import axios from "axios";
// import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((store: any) => store?.auth?.user);
  console.log("user-", user);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // const result = await axiosClient.post("/auth/login", {
      //   email,
      //   password,
      //   // redirect: false,
      // });

      const result = await axios.post(
        // "http://localhost:5000/api/v1/auth/login",
        // `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login`,
        `/api/v1/auth/login`,
        {
          email,
          password,
          // redirect: false,
        },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

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

    // if (result?.error) {
    //   console.log(result.error);
    // } else {
    //   router.push("/feed");
    // }
  };

  return (
    <div className="min-h-screen bg-gray-800 flex flex-col justify-center items-center py-12 px-2 lg:px-8">
      <div className="bg-white w-full md:w-auto py-8 md:px-8 px-6 shadow rounded-lg">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-2">
          Welcome back to Flatmates
        </h2>
        <p className="text-gray-500 text-center mb-6">
          Login to your account and continue
        </p>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="email"
              className="block font-semibold text-gray-700"
            >
              Email
            </label>
            <input
              type="text"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
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
              type="text"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              autoComplete="current-password"
              required
              className="w-full mt-1 text-black px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer"
            >
              Login
            </button>
          </div>
        </form>
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <Link
              href="/signup"
              className="text-indigo-600 hover:text-indigo-500 font-semibold"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
    // <div>
    //   <h1>Login</h1>
    //   <form onSubmit={handleSubmit}>
    //     <input
    //       type="email"
    //       value={email}
    //       onChange={(e) => setEmail(e.target.value)}
    //     />
    //     <input
    //       type="password"
    //       value={password}
    //       onChange={(e) => setPassword(e.target.value)}
    //     />
    //     <button type="submit">Login</button>
    //   </form>
    //   <div>
    //     Don't have an account ?
    //     <button onClick={() => router.push("/register")}>Register</button>
    //   </div>
    // </div>
  );
};

export default Login;
