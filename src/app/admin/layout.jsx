"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import Sidebar from "../../components/Aside";
import Navbar from "../../components/Navbar";
import { ToastProvider } from "../../components/Toats"; // import ToastProvider

export default function AdminLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const pathname = usePathname();

  // 📝 Menu khusus Admin
  const adminMenuItems = [
    { icon: "fas fa-tachometer-alt", text: "Dashboard", href: "/admin/dashboard" },
    { icon: "fas fa-user-graduate", text: "Mahasiswa", href: "/admin/mahasiswa" },
    { icon: "fas fa-star", text: " Master Poin ", href: "/admin/poin" },
    { icon: "fas fa-calendar-check", text: "Verifikasi Kegiatan", href: "/admin/kegiatan" },
    { icon: "fas fa-arrow-left", text: "Kembali ke Homepage", href: "/", extraClass: "mt-4" },
  ];

  return (
    // 🌟 Bungkus seluruh layout dengan ToastProvider
    <ToastProvider>
      <div className="flex h-screen">
        {/* Sidebar */}
        <Sidebar
          isSidebarOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
          title="SIPAK"
          menuItems={adminMenuItems}
          activePath={pathname}
        />

        {/* Main Content */}
        <div className="flex flex-col flex-1 w-full md:ml-64 min-h-screen bg-gray-50">
          {/* Navbar */}
          <Navbar
            isDropdownOpen={isDropdownOpen}
            toggleDropdown={toggleDropdown}
            toggleSidebar={toggleSidebar}
            role="admin"
            userName="Admin Kemahasiswaan"
          />

          {/* Konten halaman */}
          <main className="p-4 md:p-6 space-y-4 md:space-y-6 overflow-auto bg-gray-50">
            {children}
          </main>
        </div>
      </div>
    </ToastProvider>
  );
}
