"use client";

import React from "react";
import TableKegiatanMhs from "./components/KegiatanMhs";
import "@fortawesome/fontawesome-free/css/all.min.css";

export default function KegiatanPage() {
  return (
    <div className="space-y-2">
      {" "}
      {/* hapus padding luar, jarak antar elemen minimal */}
      {/* Header Halaman */}
      <div className="bg-white rounded-lg shadow-sm p-3 flex flex-col gap-1.5 mt-0">
        <h1 className="text-base font-medium text-gray-800 flex items-center gap-1.5">
          <i className="fas fa-calendar-alt text-blue-600 text-sm"></i>
          Data Klaim Kegiatan
        </h1>
        <p className="text-gray-600 text-xs">
          Halaman ini berisi daftar klaim kegiatan mahasiswa. Gunakan tabel di
          bawah untuk melihat detail klaim kegiatan dan mengelola aksi seperti
          Detail, Edit, atau Hapus.
        </p>
      </div>
      {/* Konten Utama */}
      <div className="mt-0">
        <TableKegiatanMhs />
      </div>
      {/* Catatan tambahan */}
      <div className="text-xs text-gray-500 bg-blue-50 border border-blue-200 rounded-md p-3 mt-0">
        <p className="flex items-start gap-1.5">
          <i className="fas fa-info-circle text-blue-500 text-sm mt-0.5"></i>
          Gunakan tombol Detail untuk melihat informasi lebih lengkap tentang
          klaim kegiatan. Tombol Edit dan Hapus digunakan untuk mengelola data
          klaim mahasiswa.
        </p>
      </div>
    </div>
  );
}
