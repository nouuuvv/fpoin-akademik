"use client";

import React, { useState } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";

// Import pecahan
import TableToolbar from "./TableToolbar";
import TableDesktop from "./TableDesktop";
import TableMobile from "./TableMobile";
import TablePagination from "@/components/Pagianation";
import DetailKlaimModal from "./ModalKlaim"; // modal detail

import klaimData from "@/data/klaim.json";

// Toast
import { useToast } from "@/components/Toats";

export default function TableKlaim() {
  const { addToast } = useToast(); // 🎯 Hook Toast

  const claims = klaimData;

  // State search
  const [search, setSearch] = useState("");

  // State modal
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedClaim, setSelectedClaim] = useState(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Warna status
  const statusColors = {
    Terverifikasi: "bg-green-100 text-green-700",
    "Belum Terverifikasi": "bg-red-100 text-red-700",
    Revisi: "bg-yellow-100 text-yellow-700",
  };

  // Filter data berdasarkan search
  const filteredClaims = claims.filter(
    (c) =>
      c.identitas_mahasiswa?.nama
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||
      c.identitas_mahasiswa?.nim?.includes(search)
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredClaims.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentClaims = filteredClaims.slice(startIndex, endIndex);

  // Buka modal detail
  const openDetailModal = (claim) => {
    setSelectedClaim(claim);
    setIsDetailModalOpen(true);
  };

  // Tutup modal
  const closeDetailModal = () => {
    setSelectedClaim(null);
    setIsDetailModalOpen(false);
  };

  // 🎯 Hapus dengan konfirmasi toast
  const handleDelete = (claim) => {
    addToast({
      message: `Hapus klaim milik ${claim.identitas_mahasiswa?.nama}?`,
      type: "danger", // merah
      onConfirm: () => {
        // Dummy delete (sesuaikan dengan API / state nyata)
        addToast({
          message: `Klaim milik ${claim.identitas_mahasiswa?.nama} berhasil dihapus`,
          type: "success",
        });
      },
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden p-4">
      {/* Toolbar + Search */}
      <TableToolbar
        search={search}
        setSearch={setSearch}
        setCurrentPage={setCurrentPage}
      />

      {/* Table Desktop */}
      <TableDesktop
        currentClaims={currentClaims}
        startIndex={startIndex}
        statusColors={statusColors}
        openDetailModal={openDetailModal}
        handleDelete={handleDelete} // 🎯 toast konfirmasi
      />

      {/* Table Mobile */}
      <TableMobile
        currentClaims={currentClaims}
        openDetailModal={openDetailModal}
      />

      {/* Pagination */}
      <TablePagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
        startIndex={startIndex}
        endIndex={endIndex}
        filteredCount={filteredClaims.length}
      />

      {/* Modal detail klaim */}
      <DetailKlaimModal
        isOpen={isDetailModalOpen}
        onClose={closeDetailModal}
        claim={selectedClaim}
      />
    </div>
  );
}
