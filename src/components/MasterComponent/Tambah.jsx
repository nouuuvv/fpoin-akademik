"use client";
import React, { useState } from "react";
import { createPortal } from "react-dom";
import api from "../../api/axios";

export default function ModalTambahPoin({ isOpen, onClose, onSave }) {
  const [form, setForm] = useState({
    kode_keg: "",
    jenis_kegiatan: "",
    posisi: "",
    bobot_poin: 0,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]:
        name === "kode_keg"
          ? value.toUpperCase()
          : name === "bobot_poin"
          ? Number(value)
          : value,
    }));
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    if (!/^[A-Z0-9]{4}$/.test(form.kode_keg)) {
      setError("Kode harus 4 karakter, huruf kapital dan angka, contoh: BEM1");
      return;
    }
    if (
      !form.kode_keg ||
      !form.jenis_kegiatan ||
      !form.posisi ||
      !(form.bobot_poin > 0)
    ) {
      alert("Semua field wajib diisi dan poin harus lebih dari 0!");
      return;
    }

    onSave(form);
    setForm({ kode_keg: "", jenis_kegiatan: "", posisi: "", bobot_poin: 0 });
    onClose();
  };


  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      />
      <div className="relative w-full max-w-sm mx-3 bg-white rounded-lg shadow-lg overflow-auto max-h-[85vh] z-50 animate-fadeIn">
        <div className="flex justify-between items-center px-4 py-2 border-b">
          <h2 className="text-sm font-medium text-gray-800 flex items-center">
            <i className="fas fa-plus-circle mr-1.5 text-blue-600 text-xs"></i>
            Tambah Master Poin
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition text-xs"
            disabled={loading}
          >
            <i className="fas fa-times"></i>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-4 py-3 space-y-3">
          {error && (
            <p className="text-xs text-red-600 bg-red-100 p-2 rounded">
              {error}
            </p>
          )}

          {[
            { name: "kode_keg", label: "Kode", type: "text" },
            { name: "jenis_kegiatan", label: "Jenis Kegiatan", type: "text" },
            { name: "posisi", label: "Posisi / Peran", type: "text" },
            { name: "bobot_poin", label: "Poin", type: "number" },
          ].map(({ name, label, type }, idx) => (
            <div key={idx}>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                {label}
              </label>
              <input
                type={type}
                name={name}
                value={form[name]}
                onChange={handleChange}
                placeholder={`Masukkan ${label.toLowerCase()}`}
                min={name === "bobot_poin" ? 1 : undefined}
                className="w-full px-2.5 py-1.5 border border-gray-300 rounded-md shadow-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none text-xs bg-white text-black uppercase"
                required
                disabled={loading}
              />
            </div>
          ))}

          <div className="flex justify-end gap-1.5 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1.5 rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200 transition text-xs"
              disabled={loading}
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-3 py-1.5 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition shadow-sm text-xs"
              disabled={loading}
            >
              {loading ? "Menyimpan..." : "Simpan"}
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
}
