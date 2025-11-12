"use client";

import React from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";

export default function Biodata({ mahasiswa }) {
  const biodataItems = [
    { label: "NIM", name: "nim", icon: "hashtag" },
    { label: "Nama", name: "name", icon: "user" },
    { label: "Angkatan", name: "angkatan", icon: "calendar" },
    { label: "Program Studi", name: "prodi", icon: "graduation-cap" },
    { label: "Tanggal Lahir", name: "tanggalLahir", icon: "birthday-cake" },
    { label: "Tempat Lahir", name: "tempatLahir", icon: "map-marker-alt" },
    { label: "Alamat", name: "alamat", icon: "map-marker-alt" },
    { label: "No. Telp", name: "phone", icon: "phone" },
    { label: "Email", name: "email", icon: "envelope" },
  ];

  const formatTanggal = (value) => {
    if (!value) return "-";
    const date = new Date(value);
    if (isNaN(date.getTime())) return value;
    return date.toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="bg-gradient-to-br from-blue-100 via-blue-50 to-indigo-100 rounded-3xl shadow-2xl p-6 transition-all duration-700 border border-blue-200">
      <h2 className="text-base font-semibold text-gray-800 mb-6 flex items-center gap-2">
        <i className="fas fa-id-card text-blue-600 text-sm"></i> Biodata
        Mahasiswa
      </h2>

      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-inner border border-blue-100 p-5">
        <table className="w-full text-sm text-gray-700">
          <tbody>
            {biodataItems.map((item, index) => (
              <tr
                key={index}
                className="border-b border-blue-100 last:border-none hover:bg-blue-50/60 transition-colors duration-200"
              >
                <td className="py-2 pr-4 font-medium flex items-center gap-2 text-gray-700">
                  <i
                    className={`fas fa-${item.icon} text-blue-600 text-xs w-4`}
                  ></i>
                  {item.label}
                </td>
                <td className="py-2 text-gray-800">
                  {item.name === "tanggalLahir"
                    ? formatTanggal(mahasiswa[item.name])
                    : mahasiswa[item.name] || "-"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
