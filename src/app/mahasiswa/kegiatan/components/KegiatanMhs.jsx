"use client";
import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";

// Components
import TableDesktop from "./TableDesktop";
import TableMobile from "./TableMobile";
import TablePagination from "@/components/Pagianation";
import ModalDetail from "./ModalDetail";
import ModalPoin from "./ModalPoin";

// Dummy data
const claimsData = [
  {
    id: 1,
    informasi_kegiatan: {
      tanggal_pengajuan: "2025-01-02",
      tanggal_pelaksanaan: "2025-01-15",
      jenis_kegiatan: "Seminar / Workshop",
      status_bem: "Terverifikasi",
      status_kemahasiswaan: "Terverifikasi",
      bukti: "/dumy.pdf",
      poin: 20,
    },
  },
  {
    id: 2,
    informasi_kegiatan: {
      tanggal_pengajuan: "2025-02-05",
      tanggal_pelaksanaan: "2025-02-18",
      jenis_kegiatan: "Lomba",
      status_bem: "Belum Terverifikasi",
      status_kemahasiswaan: "Belum Terverifikasi",
      bukti: "/dumy.pdf",
      poin: 30,
    },
  },
  {
    id: 3,
    informasi_kegiatan: {
      tanggal_pengajuan: "2025-03-01",
      tanggal_pelaksanaan: "2025-03-10",
      jenis_kegiatan: "Pengabdian Masyarakat",
      status_bem: "Revisi",
      status_kemahasiswaan: "Revisi",
      bukti: "/dumy.pdf",
      poin: 25,
    },
  },
  {
    id: 4,
    informasi_kegiatan: {
      tanggal_pengajuan: "2025-04-07",
      tanggal_pelaksanaan: "2025-04-15",
      jenis_kegiatan: "Organisasi",
      status_bem: "Terverifikasi",
      status_kemahasiswaan: "Belum Terverifikasi",
      bukti: "/dumy.pdf",
      poin: 15,
    },
  },
  {
    id: 5,
    informasi_kegiatan: {
      tanggal_pengajuan: "2025-05-12",
      tanggal_pelaksanaan: "2025-05-25",
      jenis_kegiatan: "Seminar / Workshop",
      status_bem: "Revisi",
      status_kemahasiswaan: "Terverifikasi",
      bukti: "/dumy.pdf",
      poin: 18,
    },
  },
];

export default function KegiatanMhs() {
  const [currentPage, setCurrentPage] = useState(1);
  const [claimsPerPage] = useState(3);
  const [currentClaims, setCurrentClaims] = useState([]);
  const [selectedClaim, setSelectedClaim] = useState(null);

  // Modal states
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isPoinOpen, setIsPoinOpen] = useState(false);

  const [mounted, setMounted] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Status warna
  const statusColors = {
    Terverifikasi: "bg-green-100 text-green-700",
    "Belum Terverifikasi": "bg-red-100 text-red-700",
    Revisi: "bg-yellow-100 text-yellow-700",
    "-": "bg-gray-100 text-gray-700",
  };

  // Filter + Pagination
  const filteredClaims = claimsData.filter((item) =>
    item.informasi_kegiatan.jenis_kegiatan
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const indexOfLast = currentPage * claimsPerPage;
  const indexOfFirst = indexOfLast - claimsPerPage;

  useEffect(() => {
    setCurrentClaims(filteredClaims.slice(indexOfFirst, indexOfLast));
  }, [currentPage, searchTerm]);

  // Modal Detail
  const openDetailModal = (claim) => {
    setSelectedClaim(claim);
    setIsDetailOpen(true);
  };
  const closeDetailModal = () => {
    setSelectedClaim(null);
    setIsDetailOpen(false);
  };

  // Modal Poin
  const openPoinModal = () => setIsPoinOpen(true);
  const closePoinModal = () => setIsPoinOpen(false);

  // Render hanya di client
  useEffect(() => setMounted(true), []);

  return (
    <div className="p-2 md:p-3">
      {/* Card utama */}
      <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
        {/* Toolbar */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 md:gap-3 p-3 border-b">
          <h3 className="text-sm md:text-base font-semibold flex items-center text-gray-800">
            <i className="fas fa-star mr-2 text-blue-600"></i>
            Klaim Poin Mahasiswa
          </h3>

          {/* Toolbar */}
          <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-3 p-3 border-b">
            {/* Search Bar */}
            <div className="flex-1 min-w-0 md:mr-4">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Cari jenis kegiatan..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="pl-8 pr-3 py-2 border rounded-lg text-sm w-full
          focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none
          bg-white text-gray-800 placeholder-gray-400"
                />
                <i className="fas fa-search absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 text-xs"></i>
              </div>
            </div>

            {/* Tombol Klaim Poin */}
            <div className="mt-2 md:mt-0 w-full md:w-auto">
              <button
                onClick={openPoinModal}
                className="bg-green-600 text-white px-6 py-2 rounded-md shadow hover:bg-green-700 transition w-full md:min-w-[220px] flex items-center justify-center"
              >
                <i className="fas fa-star mr-2"></i>
                Klaim Poin
              </button>
            </div>
          </div>
        </div>

        {/* Table Desktop */}
        <div className="overflow-x-auto">
          <TableDesktop
            currentClaims={currentClaims}
            startIndex={indexOfFirst}
            statusColors={statusColors}
            openDetailModalDesktop={openDetailModal}
          />
        </div>

        {/* Table Mobile */}
        <TableMobile
          currentClaims={currentClaims}
          statusColors={statusColors}
          openDetailModal={openDetailModal} // <-- Sama seperti desktop
        />
      </div>

      {/* Pagination */}
      <div className="mt-3 md:mt-4">
        <TablePagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          filteredCount={filteredClaims.length}
          itemsPerPage={claimsPerPage}
        />
      </div>

      {/* Modal Portal */}
      {mounted &&
        isDetailOpen &&
        selectedClaim &&
        createPortal(
          <ModalDetail
            isOpen={isDetailOpen}
            onClose={closeDetailModal}
            data={selectedClaim}
          />,
          document.body
        )}

      {mounted &&
        isPoinOpen &&
        createPortal(
          <ModalPoin isOpen={isPoinOpen} onClose={closePoinModal} />,
          document.body
        )}
    </div>
  );
}
