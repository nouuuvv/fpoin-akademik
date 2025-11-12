"use client";

import React, { useState } from "react";

const handleLogout = async () => {
  try {
    await fetch("http://localhost:5000/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });

    // 🔥 Hapus token localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("user");

    // ✅ Redirect ke login
    window.location.href = "/auth";
  } catch (err) {
    console.log(err);
  }
};




export default function Navbar({
  isDropdownOpen,
  toggleDropdown,
  toggleSidebar,
  role = "default", // "admin" | "user" | default
  userName = "Pengguna", // nama user di kanan
  userEmail = "pengguna@example.com", // email user
}) {
  // Tentukan judul berdasarkan role
  const getTitle = () => {
    if (role === "admin") return "Dashboard Admin";
    if (role === "user") return "Dashboard Mahasiswa";
    return "Dashboard";
  };

  return (
    <header className="flex items-center justify-between bg-white border-b px-3 py-2 shadow-sm sticky top-0 z-20">
      <div className="flex items-center space-x-2">
        {/* Tombol toggle sidebar (mobile) */}
        <button
          id="menuBtn"
          className="md:hidden text-blue-700 focus:outline-none"
          onClick={toggleSidebar}
        >
          <i className="fas fa-bars text-xl"></i>
        </button>

        {/* Judul halaman */}
        <h1 className="text-base font-semibold text-blue-800 flex items-center">
          <i className="fas fa-cog mr-1.5 text-blue-600 text-sm"></i>
          <span>{getTitle()}</span>
        </h1>
      </div>

      {/* Profile + dropdown */}
      <div className="flex items-center space-x-2 relative">
        <span className="text-xs text-gray-600 hidden sm:block">
          {userName}
        </span>

        <div className="relative">
          <button
            id="profileBtn"
            className="focus:outline-none flex items-center"
            onClick={toggleDropdown}
          >
            <img
              src="https://img.freepik.com/free-photo/young-adult-man-wearing-hoodie-beanie_23-2149393636.jpg"
              alt="profile"
              className="w-7 h-7 md:w-8 md:h-8 rounded-full border border-blue-500 shadow-sm"
            />
            <i className="fas fa-chevron-down ml-0.5 text-gray-500 text-xs"></i>
          </button>

          {/* Dropdown Profile */}
          {isDropdownOpen && (
            <div className="absolute right-0 mt-1.5 w-56 bg-white border rounded-md shadow-md z-30 overflow-hidden">
              {/* Header dropdown dengan info user */}
              <div className="px-3 py-2 border-b bg-gray-50">
                <p className="text-xs font-medium text-gray-900">{userName}</p>
                <p className="text-xs text-gray-500 truncate">{userEmail}</p>
              </div>

              {/* Menu dropdown */}
              <div className="py-0.5">
                <a
                  href="#"
                  className="flex items-center px-3 py-1.5 text-xs text-gray-700 hover:bg-gray-100"
                >
                  <i className="fas fa-user-circle mr-1.5 text-blue-500 text-xs"></i>
                  Profil Saya
                </a>
                <a
                  href="#"
                  className="flex items-center px-3 py-1.5 text-xs text-gray-700 hover:bg-gray-100"
                >
                  <i className="fas fa-cog mr-1.5 text-blue-500 text-xs"></i>
                  Pengaturan
                </a>
                {role === "admin" && (
                  <a
                    href="#"
                    className="flex items-center px-3 py-1.5 text-xs text-gray-700 hover:bg-gray-100"
                  >
                    <i className="fas fa-users-cog mr-1.5 text-blue-500 text-xs"></i>
                    Admin Panel
                  </a>
                )}
                <a
                  href="#"
                  className="flex items-center px-3 py-1.5 text-xs text-gray-700 hover:bg-gray-100"
                >
                  <i className="fas fa-bell mr-1.5 text-blue-500 text-xs"></i>
                  Notifikasi
                </a>
              </div>

              {/* Footer dropdown dengan tombol logout */}
              <div className="py-0.5 border-t">
                <button
                  onClick={handleLogout}
                  className="w-full text-left flex items-center px-3 py-1.5 text-xs text-red-600 hover:bg-gray-100"
                >
                  <i className="fas fa-sign-out-alt mr-1.5 text-xs"></i>
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
