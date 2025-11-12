"use client";
import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";

export default function ModalEditPoin({
  isOpen,
  onClose,
  onSave,
  initialData,
}) {
  const [form, setForm] = useState({
    id_poin: null,
    kode_keg: "",
    jenis_kegiatan: "",
    posisi: "",
    bobot_poin: 0,
  });

  useEffect(() => {
    if (initialData) {
      setForm({
        id_poin: initialData.id_poin || null,
        kode_keg: initialData.kode_keg || "",
        jenis_kegiatan: initialData.jenis_kegiatan || "",
        posisi: initialData.posisi || "",
        bobot_poin: initialData.bobot_poin || 0,
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "kode_keg" ? value.toUpperCase() : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!/^[A-Z0-9]{4}$/.test(form.kode_keg)) {
      alert(
        "Kode Kegiatan harus 4 karakter (huruf kapital dan angka). Contoh: BEM1"
      );
      return;
    }

    if (
      !form.kode_keg ||
      !form.jenis_kegiatan ||
      !form.posisi ||
      !form.bobot_poin ||
      form.bobot_poin < 1
    ) {
      alert("Semua field wajib diisi dan bobot poin minimal 1!");
      return;
    }

    onSave(form); // kirim lengkap termasuk id_poin
    onClose();
  };

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-sm mx-3 bg-white rounded-lg shadow-lg overflow-auto max-h-[85vh] z-50 animate-fadeIn">
        {/* Header */}
        <div className="flex justify-between items-center px-4 py-2 border-b">
          <h2 className="text-sm font-medium text-gray-800 flex items-center">
            <i className="fas fa-edit mr-1.5 text-orange-500 text-xs"></i>
            Edit Master Poin
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition text-xs"
          >
            <i className="fas fa-times"></i>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-4 py-3 space-y-3">
          {[
            { key: "kode_keg", label: "Kode Kegiatan" },
            { key: "jenis_kegiatan", label: "Jenis Kegiatan" },
            { key: "posisi", label: "Posisi / Peran" },
            { key: "bobot_poin", label: "Bobot Poin" },
          ].map(({ key, label }, idx) => {
            const type = key === "bobot_poin" ? "number" : "text";
            return (
              <div key={idx}>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  {label}
                </label>
                <input
                  type={type}
                  name={key}
                  value={form[key]}
                  onChange={handleChange}
                  placeholder={`Masukkan ${label.toLowerCase()}`}
                  min={key === "bobot_poin" ? 1 : undefined}
                  className="w-full px-2.5 py-1.5 border border-gray-300 rounded-md shadow-sm focus:ring-1 focus:ring-orange-400 focus:border-orange-400 outline-none text-xs bg-white text-black uppercase"
                  required
                />
              </div>
            );
          })}

          {/* Buttons */}
          <div className="flex justify-end gap-1.5 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1.5 rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200 transition text-xs"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-3 py-1.5 rounded-md bg-orange-500 text-white hover:bg-orange-600 transition shadow-sm text-xs"
            >
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
}
