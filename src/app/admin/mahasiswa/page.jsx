"use client";

import React from "react";
import TableMhs from "./components/TableMhs";

export default function MahasiswaPage() {
  return (
    <div className="p-4 space-y-4 bg-gray-50 min-h-screen">
      {/* Header halaman */}
      <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
        <h1 className="text-xl font-semibold text-gray-800 flex items-center gap-1.5 mb-1">
          <i className="fas fa-user-graduate text-blue-600 text-lg"></i>
          Data Mahasiswa
        </h1>
        <p className="text-gray-600 text-xs leading-relaxed text-justify sm:text-left">
          Kelola data mahasiswa dan informasi total poin yang telah mereka
          kumpulkan dalam kegiatan akademik maupun non-akademik.
        </p>
      </div>

      {/* Table mahasiswa */}
      <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
        <TableMhs />
      </div>

      {/* Info tambahan */}
      <div className="text-xs text-gray-600 bg-blue-50 border border-blue-200 rounded-md p-3 leading-relaxed text-justify sm:text-left">
        <div className="flex items-start sm:items-center gap-2">
          <i className="fas fa-info-circle text-blue-500 text-sm mt-0.5 sm:mt-0"></i>
          <div>
            <p className="font-medium text-blue-800 mb-1">
              Informasi Status Mahasiswa
            </p>
            <div className="flex flex-wrap gap-2 text-xs">
              <span className="inline-flex items-center">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1.5"></span>
                Terverifikasi
              </span>
              <span className="inline-flex items-center">
                <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full mr-1.5"></span>
                Belum Terverifikasi
              </span>
              <span className="inline-flex items-center">
                <span className="w-1.5 h-1.5 bg-red-500 rounded-full mr-1.5"></span>
                Perlu Revisi
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
