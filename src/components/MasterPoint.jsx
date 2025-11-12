"use client";

import React, { useState, useEffect } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import TableMaster from "./MasterComponent/TableMaster";
import CardMaster from "./MasterComponent/CardMaster";
import Pagination from "../components/Pagianation";
import InfoBobotPoin from "./MasterComponent/InfoBobotPoin";
import ModalTambahPoin from "./MasterComponent/Tambah";
import ModalEditPoin from "./MasterComponent/Edit";
import { useToast } from "@/components/Toats";
import api from "@/api/axios";
import Cookies from "js-cookie";

// Helper untuk normalisasi data jadi uppercase
function toUpperObj(obj) {
  return {
    ...obj,
    kode: obj.kode.toUpperCase(),
    jenis: obj.jenis.toUpperCase(),
    peran: obj.peran.toUpperCase(),
  };
}

export default function MasterPoint({ role = "mahasiswa" }) {
  const { addToast } = useToast();
  const isAdmin = role === "admin";

  const [kegiatan, setKegiatan] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Token sudah otomatis disertakan oleh axios interceptor
        const res = await api.get("/api/masterpoin");

        const mapped = res.data.map((item) =>
          toUpperObj({
            id: item.id_poin,
            kode: item.kode_keg,
            jenis: item.jenis_kegiatan,
            peran: item.posisi,
            poin: item.bobot_poin,
          })
        );
        setKegiatan(mapped);
      } catch (error) {
        addToast({
          message: error.response?.data?.message || error.message,
          type: "danger",
        });
      }
    };

    fetchData();
  }, [addToast]);

  // Filter & Pagination
  const filteredKegiatan = kegiatan.filter((item) => {
    const search = searchTerm.toLowerCase();
    return (
      (item.jenis?.toLowerCase() || "").includes(search) ||
      (item.peran?.toLowerCase() || "").includes(search) ||
      (item.kode?.toLowerCase() || "").includes(search)
    );
  });

  const totalPages = Math.max(
    1,
    Math.ceil(filteredKegiatan.length / itemsPerPage)
  );
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentItems = filteredKegiatan.slice(indexOfFirst, indexOfLast);

  const changePage = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  const getBadgeClass = (poin) => {
    if (poin >= 30) return "bg-blue-600 text-white";
    if (poin >= 15) return "bg-green-500 text-white";
    if (poin >= 5) return "bg-yellow-400 text-gray-900";
    return "bg-gray-300 text-gray-900";
  };

  // Tambah data (admin only)
  const handleSave = async (newData) => {
    if (!isAdmin) return;

    try {
      const payload = {
        kode_keg: newData.kode_keg,
        jenis_kegiatan: newData.jenis_kegiatan,
        posisi: newData.posisi,
        bobot_poin: parseInt(newData.bobot_poin, 10),
      };

      const res = await api.post("/api/masterpoin", payload);

      setKegiatan((prev) => [
        ...prev,
        toUpperObj({
          id: res.data.data.id_poin,
          kode: res.data.data.kode_keg,
          jenis: res.data.data.jenis_kegiatan,
          peran: res.data.data.posisi,
          poin: res.data.data.bobot_poin,
        }),
      ]);
      addToast({ message: res.data.message, type: "success" });
      setIsModalOpen(false);
    } catch (error) {
      addToast({
        message: error.response?.data?.message || error.message,
        type: "danger",
      });
    }
  };

  // Edit data (admin only)
  const handleEditSave = async (updatedData) => {
    if (!isAdmin) return;

    try {
      const payload = {
        kode_keg: updatedData.kode_keg,
        jenis_kegiatan: updatedData.jenis_kegiatan,
        posisi: updatedData.posisi,
        bobot_poin: parseInt(updatedData.bobot_poin, 10),
      };

      const res = await api.put(`/api/masterpoin/${updatedData.id}`, payload);

      setKegiatan((prev) =>
        prev.map((item) =>
          item.id === updatedData.id
            ? toUpperObj({
                id: res.data.data.id_poin,
                kode: res.data.data.kode_keg,
                jenis: res.data.data.jenis_kegiatan,
                peran: res.data.data.posisi,
                poin: res.data.data.bobot_poin,
              })
            : item
        )
      );
      addToast({ message: res.data.message, type: "success" });
      setIsEditOpen(false);
    } catch (error) {
      addToast({
        message: error.response?.data?.message || error.message,
        type: "danger",
      });
    }
  };

  // Buka modal edit (admin only)
  const handleEditTrigger = (item) => {
    if (!isAdmin) return;

    setEditData({
      id: item.id,
      kode_keg: item.kode,
      jenis_kegiatan: item.jenis,
      posisi: item.peran,
      bobot_poin: item.poin,
    });
    setIsEditOpen(true);
  };

  // Delete data (admin only)
  const handleDelete = (item) => {
    if (!isAdmin) return;

    addToast({
      message: `Hapus kegiatan ${item.jenis} - ${item.peran}?`,
      type: "danger",
      onConfirm: async () => {
        try {
          await api.delete(`/api/masterpoin/${item.id}`);
          setKegiatan((prev) => prev.filter((i) => i.id !== item.id));
          addToast({ message: "Data berhasil dihapus", type: "success" });
        } catch (error) {
          addToast({
            message: error.response?.data?.message || error.message,
            type: "danger",
          });
        }
      },
    });
  };

  return (
    <div className="p-3 space-y-3">
      {/* Search + Action */}
      <div className="flex flex-col sm:flex-row gap-1.5 sm:gap-2 items-start sm:items-center justify-between mb-1.5 text-xs">
        <div className="relative w-full sm:w-56">
          <input
            type="text"
            placeholder="Cari kegiatan..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8 pr-2.5 py-1.5 w-full bg-white border border-gray-300 rounded text-xs focus:ring-1 focus:ring-blue-400 focus:border-blue-400 focus:outline-none transition-all shadow-sm"
          />
          <i className="fas fa-search absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 text-xs"></i>
        </div>

        {isAdmin && (
          <div className="flex gap-1.5 sm:gap-2">
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-green-100 text-green-700 px-2.5 py-1 rounded hover:bg-green-200 text-xs flex items-center justify-center transition-colors shadow-sm"
            >
              <span className="hidden sm:inline">Tambah</span>
              <i className="fas fa-plus sm:hidden text-xs"></i>
            </button>
            <button className="bg-blue-100 text-blue-700 px-2.5 py-1 rounded hover:bg-blue-200 text-xs flex items-center justify-center transition-colors shadow-sm">
              <span className="hidden sm:inline">Export</span>
              <i className="fas fa-download sm:hidden text-xs"></i>
            </button>
          </div>
        )}
      </div>

      {/* Table & Card */}
      <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
        <TableMaster
          currentItems={currentItems}
          isAdmin={isAdmin}
          getBadgeClass={getBadgeClass}
          onEdit={handleEditTrigger}
          onDelete={handleDelete}
        />
        <CardMaster
          currentItems={currentItems}
          isAdmin={isAdmin}
          getBadgeClass={getBadgeClass}
        />
      </div>

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        setCurrentPage={changePage}
        totalPages={totalPages}
        startIndex={indexOfFirst}
        endIndex={indexOfLast}
        filteredCount={filteredKegiatan.length}
      />

      {/* Info Bobot */}
      <InfoBobotPoin />

      {/* Modal Tambah */}
      <ModalTambahPoin
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
      />

      {/* Modal Edit */}
      <ModalEditPoin
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        onSave={handleEditSave}
        initialData={editData}
      />
    </div>
  );
}
