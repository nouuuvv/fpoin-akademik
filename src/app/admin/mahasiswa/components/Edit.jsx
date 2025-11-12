"use client";
import React, { useState, useEffect } from "react";

export default function ModalEditMhs({ isOpen, onClose, student, onSubmit }) {
  const [form, setForm] = useState({
    nim: "",
    nama_mhs: "",
    prodi: "",
    angkatan: "",
    target_poin: 50,
    total_poin: 0,
    id_jur: "",
    tgl_lahir: "",
    pekerjaan: "",
    alamat: "",
    asal_sekolah: "",
    thn_lulus: "",
    tlp_saya: "",
    tlp_rumah: "",
    email: "",
    status: "",
    foto: null,
  });

  const [preview, setPreview] = useState(null);

  // Pas modal dibuka → isi data
  useEffect(() => {
    if (student) {
      setForm({
        id_mhs: student.id_mhs || "",
        nim: student.nim || "",
        nama_mhs: student.nama_mhs || "",
        prodi: student.prodi || "",
        angkatan: student.angkatan || "",
        target_poin: student.target_poin || 50,
        total_poin: student.total_poin || 0,
        id_jur: student.id_jur || "",
        tgl_lahir: student.tgl_lahir || "",
        pekerjaan: student.pekerjaan || "",
        alamat: student.alamat || "",
        asal_sekolah: student.asal_sekolah || "",
        thn_lulus: student.thn_lulus || "",
        tlp_saya: student.tlp_saya || "",
        tlp_rumah: student.tlp_rumah || "",
        email: student.email || "",
        status: student.status || "",
        foto: null,
      });

      // Bikin preview dari foto lama (kalau ada)
      setPreview(
        student.foto
          ? `${process.env.NEXT_PUBLIC_API_URL}${student.foto}`
          : `https://ui-avatars.com/api/?name=${encodeURIComponent(
              student.nama_mhs
            )}`
      );
    }
  }, [student]);

  // Input teks
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Upload foto baru
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setForm((prev) => ({ ...prev, foto: file }));
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  // Submit data
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-3 sm:px-0">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md overflow-y-auto max-h-[90vh]">
        {/* Header */}
        <div className="flex justify-between items-center px-4 py-2 border-b">
          <h2 className="text-base font-medium text-gray-800 flex items-center">
            <i className="fas fa-edit mr-1.5 text-amber-600 text-sm"></i>
            Edit Mahasiswa
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition text-sm"
          >
            <i className="fas fa-times"></i>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-4 py-3 space-y-3 text-xs">
          {/* Foto Preview */}
          <div className="flex flex-col items-center">
            <img
              src={preview}
              alt="Preview"
              className="w-20 h-20 rounded-full object-cover border mb-2"
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="text-xs"
            />
          </div>

          {/* Input Fields */}
          {[
            "nim",
            "nama_mhs",
            "prodi",
            "angkatan",
            "id_jur",
            "tgl_lahir",
            "pekerjaan",
            "alamat",
            "asal_sekolah",
            "thn_lulus",
            "tlp_saya",
            "tlp_rumah",
            "email",
            "status",
          ].map((field) => (
            <div key={field}>
              <label className="block font-medium text-gray-700 mb-1 capitalize">
                {field.replace("_", " ")}
              </label>
              <input
                type={field === "tgl_lahir" ? "date" : "text"}
                name={field}
                value={form[field] || ""}
                onChange={handleChange}
                className="w-full px-2.5 py-1.5 border rounded-md shadow-sm bg-white text-black focus:ring-1 focus:ring-blue-500 focus:outline-none text-xs"
              />
            </div>
          ))}

          {/* Target & Total Poin */}
          {/* <div>
            <label className="block font-medium text-gray-700 mb-1">
              Target Poin
            </label>
            <input
              type="number"
              name="target_poin"
              value={form.target_poin}
              onChange={handleChange}
              min="0"
              className="w-full px-2.5 py-1.5 border rounded-md shadow-sm text-xs"
            />
          </div> */}

          <div>
            <label className="block font-medium text-gray-700 mb-1">
              Total Poin
            </label>
            <input
              type="number"
              name="total_poin"
              value={form.total_poin}
              onChange={handleChange}
              min="0"
              className="w-full px-2.5 py-1.5 border rounded-md shadow-sm text-xs"
              disabled
            />
          </div>

          {/* Tombol */}
          <div className="flex justify-end gap-1.5 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1.5 rounded-md text-gray-600 hover:bg-gray-100 text-xs transition-colors shadow-sm w-full sm:w-auto"
            >
              <i className="fas fa-times mr-1.5"></i>Batal
            </button>

            <button
              type="submit"
              className="px-3 py-1.5 rounded-md bg-amber-600 text-white hover:bg-amber-700 text-xs transition-colors shadow-sm w-full sm:w-auto"
            >
              <i className="fas fa-save mr-1.5"></i>Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
