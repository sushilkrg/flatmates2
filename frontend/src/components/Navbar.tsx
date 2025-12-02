"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react"; // nice hamburger icons
import { useDispatch, useSelector } from "react-redux";
import { RootState, store } from "@/redux/store";
import axios from "axios";
import { clearUser } from "@/redux/slices/authSlice";

export default function Navbar() {
  const dispatch = useDispatch();
  const user = useSelector((store: RootState) => store.auth.user?.email);
  console.log("user - ", user);

  const [menuOpen, setMenuOpen] = useState(false);

  async function handleLogout() {
    const res = await axios.post(
      // "http://localhost:5000/api/v1/auth/logout",
      // `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/logout`,
      `/api/v1/auth/logout`,
      {},
      {
        withCredentials: true,
      }
    );
    dispatch(clearUser());
    console.log("logout data-", res);
    // () => {
    setMenuOpen(false);
    //   signOut();
    // };
  }

  return (
    <nav className="p-4 shadow-lg sticky top-0 z-50 bg-white text-gray-800">
      <div className="container mx-auto px-4 md:px-16 flex justify-between items-center">
        <div>
          <Link
            href={user ? "/search" : "/"}
            className="text-3xl font-bold text-teal-900 hover:text-teal-800"
          >
            Flatmates
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6 md:gap-12">
          {user ? (
            <>
              <Link
                href="/dashboard"
                className="text-xl font-semibold text-teal-900 hover:text-teal-800"
              >
                Dashboard
              </Link>
              <Link
                href="/add"
                className="text-xl font-semibold text-teal-900 hover:text-teal-800"
              >
                Add
              </Link>
              <div className="text-md font-semibold text-teal-900 hover:text-teal-800">
                {user?.split("@")[0]}
                {/* {user} */}
              </div>
              <button
                onClick={() => handleLogout()}
                className="border border-teal-950 bg-blue-900 text-white rounded-3xl px-4 py-2 font-bold cursor-pointer"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/search"
                className="text-2xl font-bold text-teal-900 hover:text-teal-800"
              >
                Search
              </Link>
              <Link href="/login">
                <button className="border border-teal-950 bg-teal-900 text-white rounded-3xl px-4 py-2 font-bold cursor-pointer">
                  Sign in
                </button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Hamburger Button */}
        <button
          className="md:hidden text-teal-900"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="md:hidden flex flex-col items-center gap-4 py-4 bg-white shadow-lg">
          {user ? (
            <>
              <Link href="/dashboard" onClick={() => setMenuOpen(false)}>
                Dashboard
              </Link>
              <Link href="/add" onClick={() => setMenuOpen(false)}>
                Add
              </Link>
              <button onClick={() => setMenuOpen(false)}>
                {/* {user?.email?.split("@")[0]} */}
                {user}
              </button>
              <button
                onClick={handleLogout}
                className="border border-teal-950 bg-blue-900 text-white rounded-3xl px-4 py-2 font-bold cursor-pointer"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/search" onClick={() => setMenuOpen(false)}>
                Search
              </Link>
              <Link href="/login" onClick={() => setMenuOpen(false)}>
                <button className="border border-teal-950 bg-teal-900 text-white rounded-3xl px-4 py-2 font-bold cursor-pointer">
                  Sign in
                </button>
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
