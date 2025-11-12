"use client";
import React from "react";

export default function TableMobile({
  currentClaims = [],
  openDetailModal = () => {},
  statusColors = {},
}) {
  return (
    <div className="block lg:hidden p-2 space-y-3">
      {currentClaims.length > 0 ? (
        currentClaims.map((claim, idx) => {
          const kegiatan = claim.informasi_kegiatan;
          const statusBEM = kegiatan?.status_bem || "-";
          const statusKemahasiswaan = kegiatan?.status_kemahasiswaan || "-";
          const statusBEMClass =
            statusColors?.[statusBEM] ?? "bg-gray-100 text-gray-700";
          const statusKemahasiswaanClass =
            statusColors?.[statusKemahasiswaan] ?? "bg-gray-100 text-gray-700";

          return (
            <div
              key={idx}
              className="border rounded-xl p-3 shadow-sm hover:shadow-md transition-all bg-white"
            >
              {/* No */}
              <p className="text-[11px] text-gray-500 mb-1">
                <i className="fas fa-hashtag mr-1"></i>
                No: <span className="font-medium">{idx + 1}</span>
              </p>

              {/* Informasi kegiatan */}
              <div className="space-y-1 text-[12px] text-gray-700">
                <p>
                  <i className="fas fa-calendar-alt mr-1"></i>
                  Pengajuan:{" "}
                  <span className="font-medium">
                    {kegiatan?.tanggal_pengajuan || "-"}
                  </span>
                </p>
                <p>
                  <i className="fas fa-calendar-check mr-1"></i>
                  Pelaksanaan:{" "}
                  <span className="font-medium">
                    {kegiatan?.tanggal_pelaksanaan || "-"}
                  </span>
                </p>
                <p>
                  <i className="fas fa-list-alt mr-1"></i>
                  Kegiatan:{" "}
                  <span className="font-medium">
                    {kegiatan?.jenis_kegiatan || "-"}
                  </span>
                </p>
                <p>
                  <i className="fas fa-star mr-1 text-yellow-500"></i>
                  Poin:{" "}
                  <span className="font-semibold">{kegiatan?.poin ?? 0}</span>
                </p>
              </div>

              {/* Status */}
              <div className="mt-2 flex flex-wrap gap-1">
                <span
                  className={`inline-block px-2 py-1 rounded-full text-[10px] font-medium ${statusBEMClass}`}
                >
                  BEM: {statusBEM}
                </span>
                <span
                  className={`inline-block px-2 py-1 rounded-full text-[10px] font-medium ${statusKemahasiswaanClass}`}
                >
                  Kemahasiswaan: {statusKemahasiswaan}
                </span>
              </div>

              {/* Tombol Detail */}
              <div className="mt-2">
                <button
                  type="button"
                  onClick={() => openDetailModal(claim)}
                  className="w-full bg-blue-100 text-blue-700 px-2 py-1.5 rounded-lg text-[11px] hover:bg-blue-200 flex items-center justify-center shadow-sm"
                >
                  <i className="fas fa-info-circle mr-1"></i> Detail
                </button>
              </div>
            </div>
          );
        })
      ) : (
        <div className="text-center text-gray-500 py-4 italic text-[12px]">
          Tidak ada data ditemukan.
        </div>
      )}
    </div>
  );
}
