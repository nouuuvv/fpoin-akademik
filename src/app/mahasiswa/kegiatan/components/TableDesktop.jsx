"use client";
import React from "react";

export default function TableDesktop({
  currentClaims,
  startIndex,
  statusColors,
  openDetailModalDesktop,
}) {
  const handleDetailClick = (claim) => {
    openDetailModalDesktop(claim);
  };

  return (
    <div className="hidden lg:block overflow-x-auto rounded-xl shadow-lg border border-gray-100">
      <table className="w-full text-left text-sm md:text-xs">
        <thead className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white text-xs md:text-[11px]">
          <tr>
            <th className="px-3 py-2 font-medium">No</th>
            <th className="px-3 py-2 font-medium">Tgl Pengajuan</th>
            <th className="px-3 py-2 font-medium">Jenis Kegiatan</th>
            <th className="px-3 py-2 font-medium">Tgl Pelaksanaan</th>
            <th className="px-3 py-2 font-medium text-center">Status BEM</th>
            <th className="px-3 py-2 font-medium text-center">
              Status Kemahasiswaan
            </th>
            <th className="px-3 py-2 font-medium text-center">Bukti</th>
            <th className="px-3 py-2 font-medium text-center">Poin</th>
            <th className="px-3 py-2 font-medium text-center">Aksi</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 text-xs md:text-[11px]">
          {currentClaims && currentClaims.length > 0 ? (
            currentClaims.map((claim, idx) => (
              <tr
                key={idx}
                className="hover:bg-blue-50/60 transition-colors duration-150"
              >
                <td className="px-3 py-2 font-medium text-gray-700">
                  {startIndex + idx + 1}
                </td>
                <td className="px-3 py-2 text-gray-700">
                  {claim.informasi_kegiatan?.tanggal_pengajuan || "-"}
                </td>
                <td className="px-3 py-2 text-gray-700">
                  {claim.informasi_kegiatan?.jenis_kegiatan || "-"}
                </td>
                <td className="px-3 py-2 text-gray-700">
                  {claim.informasi_kegiatan?.tanggal_pelaksanaan || "-"}
                </td>
                <td className="px-3 py-2 text-center">
                  <span
                    className={`inline-flex items-center px-2 py-1 rounded-full text-[12px] font-medium ${
                      statusColors[claim.informasi_kegiatan?.status_bem] ||
                      "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {claim.informasi_kegiatan?.status_bem || "-"}
                  </span>
                </td>
                <td className="px-3 py-2 text-center">
                  <span
                    className={`inline-flex items-center px-2 py-1 rounded-full text-[12px] font-medium ${
                      statusColors[
                        claim.informasi_kegiatan?.status_kemahasiswaan
                      ] || "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {claim.informasi_kegiatan?.status_kemahasiswaan || "-"}
                  </span>
                </td>
                <td className="px-3 py-2 text-center text-blue-600">
                  {claim.informasi_kegiatan?.bukti ? "Tersedia" : "-"}
                </td>
                <td className="px-3 py-2 text-center text-gray-700">
                  {claim.informasi_kegiatan?.poin || "-"}
                </td>
                <td className="px-3 py-2 text-center">
                  <button
                    type="button"
                    className="bg-blue-100 text-blue-700 px-2 py-1 rounded-lg text-[12px] hover:bg-blue-200 flex items-center justify-center transition-colors shadow-sm"
                    onClick={() => handleDetailClick(claim)}
                  >
                    <i className="fas fa-info-circle mr-1"></i> Detail
                  </button>
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
  );
}
