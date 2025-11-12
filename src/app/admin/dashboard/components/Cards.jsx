"use client";

import React from "react";
import Card from "./Card";

export default function Cards({ role = "admin" }) {
  // 🔹 Data untuk Admin
  const adminCards = [
    {
      title: "Total Mahasiswa",
      value: "1,254",
      change: "Jumlah total mahasiswa aktif",
      changeColor: "text-gray-600",
      changeIcon: "fas fa-users",
      iconBg: "bg-blue-100",
      icon: "fas fa-users text-blue-600",
      border: "border-l-4 border-blue-500",
    },
    
    {
      title: "Kegiatan Terdaftar",
      value: "42",
      change: "5 menunggu verifikasi",
      changeColor: "text-yellow-600",
      changeIcon: "fas fa-calendar-check",
      iconBg: "bg-yellow-100",
      icon: "fas fa-calendar-check text-yellow-600",
      border: "border-l-4 border-yellow-500",
    },

  ];
  

  const cardsData = role === "admin" ? adminCards : userCards;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
      {cardsData.map((card, idx) => (
        <Card key={idx} {...card} />
      ))}
    </div>
  );
}
