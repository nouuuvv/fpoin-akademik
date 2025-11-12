"use client";
import React from "react";

export default function TableToolbar({
  search,
  setSearch,
  filterPoin,
  setFilterPoin,
  onAdd,
}) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 p-3 bg-white border-b border-gray-200 rounded-t-lg flex-wrap">
      {/* Judul */}
      <h3 className="text-sm font-medium flex items-center text-gray-800 w-full sm:w-auto">
        <i className="fas fa-list-alt mr-1.5 text-blue-600 text-xs"></i>
        <span className="bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent">
          Daftar Mahasiswa
        </span>
      </h3>

      {/* Search + Filter + Aksi */}
      <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto flex-wrap">
        {/* Search */}
        <div className="relative w-full sm:w-48 flex-shrink-0">
          <input
            type="text"
            placeholder="Cari NIM / Nama..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-8 pr-2.5 py-1.5 border border-gray-300 rounded text-xs w-full focus:ring-1 focus:ring-blue-400 focus:border-blue-400 focus:outline-none bg-white text-gray-800 shadow-sm transition-all"
          />
          <i className="fas fa-search absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400 text-xs"></i>
        </div>

        {/* Filter poin */}
        <select
          value={filterPoin}
          onChange={(e) => setFilterPoin(e.target.value)}
          className="border border-gray-300 px-2.5 py-1.5 rounded text-xs focus:ring-1 focus:ring-blue-400 focus:outline-none bg-blue-50 text-blue-800 font-medium shadow-sm transition-all w-full sm:w-auto flex-shrink-0"
        >
          <option value="all">Semua Poin</option>
          <option value="nol">Poin Nol</option>
          <option value="<5">Poin &lt; 5</option>
          <option value=">=5">Poin ≥ 5</option>
        </select>

        {/* Tombol aksi */}
        <div className="flex flex-wrap gap-1 w-full sm:w-auto">
          <button
            className="bg-green-100 text-green-700 px-2.5 py-1.5 rounded text-xs hover:bg-green-200 flex items-center justify-center w-full sm:w-auto transition-colors shadow-sm font-medium"
            onClick={onAdd}
          >
            <i className="fas fa-user-plus mr-1 text-xs"></i>
            <span className="hidden sm:inline">Tambah</span>
          </button>

          <button className="bg-blue-100 text-blue-700 px-2.5 py-1.5 rounded text-xs hover:bg-blue-200 flex items-center justify-center w-full sm:w-auto transition-colors shadow-sm font-medium">
            <i className="fas fa-file-import mr-1 text-xs"></i>
            <span className="hidden sm:inline">Import</span>
          </button>

          <button className="bg-indigo-100 text-indigo-700 px-2.5 py-1.5 rounded text-xs hover:bg-indigo-200 flex items-center justify-center w-full sm:w-auto transition-colors shadow-sm font-medium">
            <i className="fas fa-file-pdf mr-1 text-xs"></i>
            <span className="hidden sm:inline">Raport</span>
          </button>
        </div>
      </div>
    </div>
  );
}
