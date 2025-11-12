"use client";
import React, { useState } from "react";
import api from "@/api/axios";

export default function ModalTambahMhs({ isOpen, onClose, onSubmit }) {
  const [form, setForm] = useState({
    nim: "",
    nama_mhs: "",
    prodi: "S1",
    angkatan: "",
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

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "foto") {
      setForm((prev) => ({ ...prev, foto: files[0] }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const fd = new FormData();

      Object.keys(form).forEach((key) => {
        if (key !== "foto") {
          fd.append(key, form[key]);
        }
      });

      if (form.foto) {
        fd.append("foto", form.foto);
      }

      const res = await api.post("/api/mahasiswa", fd, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });

      onSubmit(res.data);

      setForm({
        nim: "",
        nama_mhs: "",
        prodi: "S1",
        angkatan: "",
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

      onClose();
    } catch (err) {
      console.error("Gagal tambah mahasiswa:", err);
      alert(err.response?.data?.message || "Gagal menambahkan mahasiswa");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-3 sm:px-0">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-sm max-h-[80vh] overflow-y-auto pr-2">
        <div className="flex justify-between items-center px-4 py-2 border-b">
          <h2 className="text-base font-medium text-gray-800 flex items-center">
            <i className="fas fa-user-plus mr-1.5 text-blue-600 text-sm"></i>
            Tambah Mahasiswa
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition text-sm"
          >
            <i className="fas fa-times"></i>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-4 py-3 space-y-3">
          {/* NIM */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              NIM
            </label>
            <input
              type="text"
              name="nim"
              value={form.nim}
              onChange={handleChange}
              required
              className="w-full px-2.5 py-1.5 border rounded-md shadow-sm bg-white text-black text-xs focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {/* Nama */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Nama Mahasiswa
            </label>
            <input
              type="text"
              name="nama_mhs"
              value={form.nama_mhs}
              onChange={handleChange}
              required
              className="w-full px-2.5 py-1.5 border rounded-md shadow-sm bg-white text-black text-xs focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {/* Prodi */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Prodi
            </label>
            <select
              name="prodi"
              value={form.prodi}
              onChange={handleChange}
              className="w-full px-2.5 py-1.5 border rounded-md shadow-sm bg-white text-black text-xs focus:ring-1 focus:ring-blue-500"
            >
              <option value="S1">S1</option>
              <option value="D3">D3</option>
            </select>
          </div>

          {/* Angkatan */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Angkatan
            </label>
            <input
              type="text"
              name="angkatan"
              value={form.angkatan}
              onChange={handleChange}
              placeholder="2022"
              className="w-full px-2.5 py-1.5 border rounded-md shadow-sm bg-white text-black text-xs focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {/* ID Jurusan */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              ID Jurusan
            </label>
            <input
              type="text"
              name="id_jur"
              value={form.id_jur}
              onChange={handleChange}
              className="w-full px-2.5 py-1.5 border rounded-md shadow-sm bg-white text-black text-xs focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {/* Tanggal Lahir */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Tanggal Lahir
            </label>
            <input
              type="date"
              name="tgl_lahir"
              value={form.tgl_lahir}
              onChange={handleChange}
              className="w-full px-2.5 py-1.5 border rounded-md shadow-sm bg-white text-black text-xs focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {/* Pekerjaan */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Pekerjaan
            </label>
            <input
              type="text"
              name="pekerjaan"
              value={form.pekerjaan}
              onChange={handleChange}
              className="w-full px-2.5 py-1.5 border rounded-md shadow-sm bg-white text-black text-xs focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {/* Alamat */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Alamat
            </label>
            <textarea
              name="alamat"
              value={form.alamat}
              onChange={handleChange}
              className="w-full px-2.5 py-1.5 border rounded-md shadow-sm bg-white text-black text-xs focus:ring-1 focus:ring-blue-500"
            ></textarea>
          </div>

          {/* Asal Sekolah */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Asal Sekolah
            </label>
            <input
              type="text"
              name="asal_sekolah"
              value={form.asal_sekolah}
              onChange={handleChange}
              className="w-full px-2.5 py-1.5 border rounded-md shadow-sm bg-white text-black text-xs focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {/* Tahun Lulus */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Tahun Lulus
            </label>
            <input
              type="text"
              name="thn_lulus"
              value={form.thn_lulus}
              onChange={handleChange}
              placeholder="2021"
              className="w-full px-2.5 py-1.5 border rounded-md shadow-sm bg-white text-black text-xs focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {/* Telepon Saya */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Telepon Saya
            </label>
            <input
              type="text"
              name="tlp_saya"
              value={form.tlp_saya}
              onChange={handleChange}
              className="w-full px-2.5 py-1.5 border rounded-md shadow-sm bg-white text-black text-xs focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {/* Telepon Rumah */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Telepon Rumah
            </label>
            <input
              type="text"
              name="tlp_rumah"
              value={form.tlp_rumah}
              onChange={handleChange}
              className="w-full px-2.5 py-1.5 border rounded-md shadow-sm bg-white text-black text-xs focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full px-2.5 py-1.5 border rounded-md shadow-sm bg-white text-black text-xs focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {/* Status */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Status
            </label>
            <input
              type="text"
              name="status"
              value={form.status}
              onChange={handleChange}
              className="w-full px-2.5 py-1.5 border rounded-md shadow-sm bg-white text-black text-xs focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {/* Total Poin */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Total Poin
            </label>
            <input
              type="number"
              name="total_poin"
              value={form.total_poin}
              readOnly
              className="w-full px-2.5 py-1.5 border rounded-md shadow-sm bg-gray-100 text-xs cursor-not-allowed"
            />
          </div>

          {/* Foto */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Foto
            </label>
            <input
              type="file"
              name="foto"
              onChange={handleChange}
              className="w-full text-xs"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-1.5 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1.5 rounded-md text-gray-600 hover:bg-gray-100 text-xs transition-colors shadow-sm"
            >
              <i className="fas fa-times mr-1.5"></i>Batal
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-3 py-1.5 rounded-md bg-blue-600 text-white hover:bg-blue-700 text-xs transition-colors shadow-sm disabled:opacity-50"
            >
              {loading ? (
                "Loading..."
              ) : (
                <>
                  {" "}
                  <i className="fas fa-save mr-1.5"></i>Simpan{" "}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
