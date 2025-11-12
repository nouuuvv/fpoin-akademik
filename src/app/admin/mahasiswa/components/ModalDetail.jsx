"use client";
import React from "react";
import PropTypes from "prop-types";

export default function DetailModal({ isOpen, onClose, student }) {
  if (!isOpen || !student) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-2 bg-black/40">
      <div className="relative bg-white rounded-lg shadow-lg w-full max-w-3xl border border-gray-200 max-h-[85vh] flex flex-col animate-fadeIn text-xs">
        {/* Header */}
        <div className="flex items-center justify-between p-3 border-b border-gray-200 bg-gradient-to-r from-blue-600 to-blue-500 rounded-t-lg">
          <h3 className="text-sm font-medium text-white flex items-center gap-1.5">
            <i className="fas fa-user-graduate text-xs"></i>
            Detail Mahasiswa
          </h3>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white transition-colors p-1.5 rounded hover:bg-white/20"
          >
            <i className="fas fa-times text-xs"></i>
          </button>
        </div>

        {/* Content */}
        <div className="p-3 space-y-3 overflow-y-auto flex-grow bg-gradient-to-b from-white to-blue-50">
          {/* Biodata */}
          <div className="bg-blue-50 p-3 rounded-lg border border-blue-100 shadow-sm">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-3">
              <div className="flex-shrink-0">
                <img
                  src={
                    student.foto
                      ? `${process.env.NEXT_PUBLIC_API_URL}${student.foto}`
                      : "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face"
                  }
                  alt={student.nama_mhs}
                  className="w-20 h-20 rounded-full object-cover border-3 border-white shadow-sm"
                />
              </div>

              <div className="flex-1 w-full">
                <h4 className="font-medium text-blue-700 mb-2 flex items-center gap-1.5 text-xs">
                  <i className="fas fa-id-card text-blue-600 text-xs"></i>
                  Biodata Mahasiswa
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-1.5 text-xs">
                  <div>
                    <span className="text-xs text-gray-500">Nama</span>
                    <p className="text-gray-800 font-medium">
                      {student.nama_mhs}
                    </p>
                  </div>
                  <div>
                    <span className="text-xs text-gray-500">Angkatan</span>
                    <p className="text-gray-800">{student.angkatan || "-"}</p>
                  </div>
                  <div>
                    <span className="text-xs text-gray-500">Program Studi</span>
                    <p className="text-gray-800">{student.prodi || "-"}</p>
                  </div>
                  <div>
                    <span className="text-xs text-gray-500">Tanggal Lahir</span>
                    <p className="text-gray-800">
                      {student.tgl_lahir || "-"}
                    </p>
                  </div>
                  <div className="md:col-span-2">
                    <span className="text-xs text-gray-500">Alamat</span>
                    <p className="text-gray-800 text-justify sm:text-left">
                      {student.alamat || "-"}
                    </p>
                  </div>
                  <div>
                    <span className="text-xs text-gray-500">Telepon</span>
                    <p className="text-gray-800">{student.tlp_saya || "-"}</p>
                  </div>
                  <div>
                    <span className="text-xs text-gray-500">Email</span>
                    <p className="text-gray-800 break-all">
                      {student.email || "-"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Daftar Kegiatan */}
          <div className="bg-white p-3 rounded-lg border border-blue-100 shadow-sm">
            <h4 className="font-medium text-blue-700 mb-2 flex items-center gap-1.5 text-xs">
              <i className="fas fa-list-check text-blue-600 text-xs"></i>
              Daftar Kegiatan Semester Ini
            </h4>
            {student.activities && student.activities.length > 0 ? (
              <div className="space-y-2">
                {student.activities.map((act, idx) => (
                  <div
                    key={act.id || idx}
                    className="p-2.5 bg-blue-50/60 rounded border border-blue-100 shadow-sm hover:shadow transition-shadow"
                  >
                    <div className="flex justify-between items-start mb-1">
                      <span className="text-xs text-gray-500">
                        {act.tanggal}
                      </span>
                      <span
                        className={`px-1.5 py-0.5 rounded-full text-xs font-medium ${
                          act.status === "Terverifikasi"
                            ? "bg-green-100 text-green-700"
                            : act.status === "Revisi"
                            ? "bg-amber-100 text-amber-700"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {act.status}
                      </span>
                    </div>
                    <h3 className="text-xs font-medium text-gray-900 mb-1">
                      {act.namaKegiatan}
                    </h3>
                    <div className="flex items-center gap-1.5 text-xs text-gray-600">
                      <span className="inline-flex items-center">
                        <i className="fas fa-star text-yellow-500 mr-1 text-xs"></i>
                        {act.poin} Poin
                      </span>
                      {act.kategori && (
                        <span className="inline-flex items-center">
                          <i className="fas fa-tag text-blue-500 mr-1 text-xs"></i>
                          {act.kategori}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-4 bg-blue-50 rounded border border-blue-100">
                <i className="fas fa-inbox text-gray-300 text-base mb-1"></i>
                <p className="text-xs text-gray-500">
                  Belum ada kegiatan tercatat semester ini
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end p-3 border-t border-gray-200 bg-white rounded-b-lg">
          <button
            onClick={onClose}
            className="px-3 py-1.5 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-xs font-medium shadow-sm"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
}

DetailModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  student: PropTypes.object,
};
