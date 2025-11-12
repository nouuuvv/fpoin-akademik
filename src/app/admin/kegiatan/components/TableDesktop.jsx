"use client";
import React from "react";

export default function TableDesktop({
  currentClaims,
  startIndex,
  statusColors,
  openDetailModal,
  handleDelete,
}) {
  const handleDetailClick = (claim) => {
    openDetailModal(claim);
  };

  return (
    <>
      <style jsx>{`
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .animate-slide-in {
          animation: slideInLeft 0.5s ease-out forwards;
          opacity: 0;
        }
      `}</style>

      <div className="hidden lg:block overflow-x-auto rounded-xl shadow-lg border border-gray-100">
        <table className="w-full text-left text-xs">
          {/* Header */}
          <thead className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white text-xs">
            <tr>
              <th className="px-3 py-2 font-medium">
                <i className="fas fa-hashtag mr-1.5 text-xs"></i>No
              </th>
              <th className="px-3 py-2 font-medium">
                <i className="fas fa-id-card mr-1.5 text-xs"></i>NIM
              </th>
              <th className="px-3 py-2 font-medium">
                <i className="fas fa-user mr-1.5 text-xs"></i>Nama
              </th>
              <th className="px-3 py-2 font-medium">
                <i className="fas fa-graduation-cap mr-1.5 text-xs"></i>Prodi
              </th>
              <th className="px-3 py-2 font-medium">
                <i className="fas fa-calendar-alt mr-1.5 text-xs"></i>
                Pengajuan
              </th>
              <th className="px-3 py-2 font-medium">
                <i className="fas fa-calendar-check mr-1.5 text-xs"></i>
                Pelaksanaan
              </th>
              <th className="px-3 py-2 font-medium">
                <i className="fas fa-list-alt mr-1.5 text-xs"></i>Kegiatan
              </th>
              <th className="px-3 py-2 font-medium text-center">
                <i className="fas fa-clipboard-list mr-1.5 text-xs"></i>Status
              </th>
              <th className="px-3 py-2 font-medium text-center">
                <i className="fas fa-cogs mr-1.5 text-xs"></i>Aksi
              </th>
            </tr>
          </thead>

          {/* Body */}
          <tbody className="divide-y divide-gray-200 text-xs">
            {currentClaims && currentClaims.length > 0 ? (
              currentClaims.map((claim, idx) => (
                <tr
                  key={idx}
                  className="hover:bg-blue-50/60 transition-colors duration-150 animate-slide-in"
                  style={{
                    animationDelay: `${idx * 0.1}s`,
                  }}
                >
                  <td className="px-3 py-2 font-medium text-gray-700 text-xs">
                    {startIndex + idx + 1}
                  </td>
                  <td className="px-3 py-2 font-mono text-gray-900 text-xs">
                    {claim.identitas_mahasiswa?.nim || "-"}
                  </td>
                  <td className="px-3 py-2 font-medium text-gray-900 text-xs">
                    {claim.identitas_mahasiswa?.nama || "-"}
                  </td>
                  <td className="px-3 py-2 text-gray-700 text-xs">
                    {claim.identitas_mahasiswa?.program_studi || "-"}
                  </td>
                  <td className="px-3 py-2 text-gray-700 text-xs">
                    {claim.informasi_kegiatan?.tanggal_pengajuan || "-"}
                  </td>
                  <td className="px-3 py-2 text-gray-700 text-xs">
                    {claim.informasi_kegiatan?.tanggal_pelaksanaan || "-"}
                  </td>
                  <td className="px-3 py-2 text-gray-700 text-xs">
                    {claim.informasi_kegiatan?.kode_kegiatan || "-"}
                  </td>

                  {/* Status */}
                  <td className="px-3 py-2 text-center">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                        statusColors[claim.informasi_kegiatan?.status] ||
                        "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {claim.informasi_kegiatan?.status || "-"}
                    </span>
                  </td>

                  {/* Aksi */}
                  <td className="px-3 py-2">
                    <div className="flex gap-1 justify-center">
                      <button
                        type="button"
                        className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs hover:bg-blue-200 flex items-center transition-colors shadow-sm"
                        onClick={() => handleDetailClick(claim)}
                      >
                        <i className="fas fa-info-circle mr-1 text-xs"></i>Detail
                      </button>
                      <button
                        type="button"
                        className="bg-amber-100 text-amber-700 px-2 py-1 rounded text-xs hover:bg-amber-200 flex items-center transition-colors shadow-sm"
                      >
                        <i className="fas fa-edit mr-1 text-xs"></i>Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(claim)}
                        className="bg-red-100 text-red-700 px-2 py-1 rounded text-xs hover:bg-red-200 flex items-center transition-colors shadow-sm"
                      >
                        <i className="fas fa-trash-alt mr-1 text-xs"></i>Hapus
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="9"
                  className="text-center text-gray-500 py-4 italic text-xs"
                >
                  Tidak ada data ditemukan.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}