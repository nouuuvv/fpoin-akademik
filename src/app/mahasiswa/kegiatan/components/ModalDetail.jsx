"use client";

import React, { useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ModalDetail({ isOpen, onClose, data }) {
  const modalRef = useRef(null);

  if (!isOpen || !data) return null;

  const statusColors = {
    Terverifikasi: "bg-green-100 text-green-700 border border-green-200",
    Revisi: "bg-yellow-100 text-yellow-700 border border-yellow-200",
    "Belum Terverifikasi": "bg-red-100 text-red-700 border border-red-200",
  };

  const kegiatan = data.informasi_kegiatan;

  // Klik di luar modal
  const handleBackdropClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
          onClick={handleBackdropClick} // <-- klik backdrop
        >
          <motion.div
            ref={modalRef}
            className="bg-white rounded-2xl shadow-xl w-full max-w-2xl mx-2 flex flex-col max-h-[90vh] overflow-auto"
            initial={{ y: 40, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 40, opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-2 border-b bg-white rounded-t-2xl">
              <h2 className="text-sm md:text-base font-semibold text-gray-800 flex items-center gap-2">
                <i className="fas fa-clipboard-list text-blue-600"></i>
                Detail Kegiatan Mahasiswa
              </h2>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700 transition"
              >
                <i className="fas fa-times text-base md:text-lg"></i>
              </button>
            </div>

            {/* Konten */}
            <div className="px-4 py-3 space-y-4 text-sm text-gray-700">
              {/* Info Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <p>
                    <span className="font-semibold">
                      <i className="fas fa-calendar-alt text-blue-600 mr-1.5"></i>
                      Tanggal Pengajuan:
                    </span>{" "}
                    {kegiatan.tanggal_pengajuan || "-"}
                  </p>
                  <p>
                    <span className="font-semibold">
                      <i className="fas fa-calendar-check text-blue-600 mr-1.5"></i>
                      Tanggal Pelaksanaan:
                    </span>{" "}
                    {kegiatan.tanggal_pelaksanaan || "-"}
                  </p>
                  <p>
                    <span className="font-semibold">
                      <i className="fas fa-tag text-blue-600 mr-1.5"></i>
                      Jenis Kegiatan:
                    </span>{" "}
                    {kegiatan.jenis_kegiatan || "-"}
                  </p>
                </div>

                <div className="space-y-1">
                  <p>
                    <span className="font-semibold">
                      <i className="fas fa-university text-blue-600 mr-1.5"></i>
                      Status BEM:
                    </span>{" "}
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${
                        statusColors[kegiatan.status_bem] ||
                        "bg-gray-100 text-gray-700"
                      }`}
                    >
                      <i className="fas fa-circle text-[6px]"></i>
                      {kegiatan.status_bem || "-"}
                    </span>
                  </p>
                  <p>
                    <span className="font-semibold">
                      <i className="fas fa-user-graduate text-blue-600 mr-1.5"></i>
                      Status Kemahasiswaan:
                    </span>{" "}
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${
                        statusColors[kegiatan.status_kemahasiswaan] ||
                        "bg-gray-100 text-gray-700"
                      }`}
                    >
                      <i className="fas fa-circle text-[6px]"></i>
                      {kegiatan.status_kemahasiswaan || "-"}
                    </span>
                  </p>
                </div>
              </div>

              {/* Poin */}
              <div className="flex items-center gap-2 bg-blue-50 rounded-lg px-2 py-1.5 shadow-inner text-sm">
                <i className="fas fa-star text-blue-600 text-base"></i>
                <p className="font-semibold">Poin Diperoleh:</p>
                <span className="font-bold text-gray-800">
                  {kegiatan.poin || 0}
                </span>
              </div>

              {/* Bukti PDF */}
              {kegiatan.bukti && (
                <div className="bg-gray-50 p-2 rounded-lg shadow-sm">
                  <h4 className="font-semibold text-gray-800 mb-1.5 flex items-center gap-2 text-sm">
                    <i className="fas fa-file-pdf text-red-600"></i>
                    Bukti Kegiatan
                  </h4>

                  {/* Desktop */}
                  <div className="hidden md:block w-full h-[50vh] border rounded-lg shadow-sm overflow-hidden">
                    <iframe
                      src={`${kegiatan.bukti}#view=FitH&scrollbar=1`}
                      title="Bukti Kegiatan"
                      className="w-full h-full"
                    />
                  </div>

                  {/* Mobile */}
                  <div className="block md:hidden">
                    <a
                      href={kegiatan.bukti}
                      download
                      className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition text-sm"
                    >
                      <i className="fas fa-download"></i>
                      Download Bukti
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="flex justify-end px-4 py-2 border-t bg-white rounded-b-2xl">
              <button
                className="px-3 py-1.5 bg-gray-200 rounded-lg hover:bg-gray-300 transition text-sm"
                onClick={onClose}
              >
                Tutup
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
