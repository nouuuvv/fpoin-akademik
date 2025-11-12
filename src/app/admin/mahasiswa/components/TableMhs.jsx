"use client";
import React, { useState, useRef, useEffect } from "react";
import api from "@/api/axios";
import { useReactToPrint } from "react-to-print";

import TableToolbar from "./TableToolbar";
import TableDesktop from "./TableDesktop";
import TableMobile from "./TableMobile";
import TablePagination from "@/components/Pagianation";
import CetakCV from "./CetakCV";

import DetailModal from "./ModalDetail";
import ModalTambahMhs from "./Tambah";
import ModalEdit from "./Edit";

import { useToast } from "@/components/Toats";

export default function TableMhs() {
  const { addToast } = useToast();

  const [studentsData, setStudentsData] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTambahOpen, setIsTambahOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const [search, setSearch] = useState("");
  const [filterPoin, setFilterPoin] = useState("all");

  const [printRequested, setPrintRequested] = useState(false);

  const prodiMap = {
    S1: "S1_Teknik_Informatika",
    D3: "D3_Manajemen_Informatika",
  };

  const componentRef = useRef(null);

  // ========== FETCH DATA ==========
  useEffect(() => {
    fetchMahasiswa();
  }, []);

  const fetchMahasiswa = async () => {
    try {
      const res = await api.get("/api/mahasiswa");
      setStudentsData(res.data);
    } catch (error) {
      console.error(error);
      addToast({ message: "Gagal memuat data mahasiswa", type: "error" });
    }
  };

  // ========== CETAK CV ==========
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: selectedStudent
      ? `${(selectedStudent.nama_mhs || "").replace(/\s+/g, "_")}_${
          prodiMap[selectedStudent?.prodi] || selectedStudent?.prodi
        }`
      : "CV_Mahasiswa",

    onAfterPrint: () => {
      setSelectedStudent(null);
    },
  });

  const openCetak = (student) => {
    if (!student) {
      addToast({ message: "Data mahasiswa tidak valid", type: "error" });
      return;
    }
    setSelectedStudent(student);
    setPrintRequested(true);
  };

  useEffect(() => {
    if (!printRequested || !selectedStudent) return;

    let cancelled = false;
    let tries = 0;
    const maxTries = 30;
    const interval = 100;

    const attemptPrint = () => {
      if (cancelled) return;
      tries += 1;

      const container = componentRef.current;
      const printableElement =
        container &&
        container.querySelector &&
        container.querySelector(".page");

      if (printableElement) {
        try {
          handlePrint(() => container);
        } catch (err) {
          try {
            handlePrint();
          } catch (err2) {
            console.error("Print failed:", err2);
            addToast({
              message: `Gagal mencetak: ${err2?.message || "Unknown error"}`,
              type: "error",
            });
          }
        } finally {
          setPrintRequested(false);
        }
      } else if (tries < maxTries) {
        setTimeout(attemptPrint, interval);
      } else {
        setPrintRequested(false);
        console.error("Timeout: printable content not found");
        addToast({
          message:
            "Gagal memuat CV untuk dicetak. Silakan reload halaman lalu coba lagi.",
          type: "error",
        });
      }
    };

    setTimeout(attemptPrint, 50);
    return () => {
      cancelled = true;
    };
  }, [printRequested, selectedStudent, handlePrint, addToast]);

  // ========== MODALS ==========
  const openTambah = () => setIsTambahOpen(true);
  const closeTambah = () => setIsTambahOpen(false);

  const openEdit = (student) => {
    setSelectedStudent(student);
    setIsEditOpen(true);
  };
  const closeEdit = () => setIsEditOpen(false);

  const openDetail = (student) => {
    setSelectedStudent(student);
    setIsModalOpen(true);
  };
  const closeModal = () => setIsModalOpen(false);

  // ========== CRUD HANDLER ==========

  // CREATE
  const handleTambah = async (newStudent) => {
    try {
      // newStudent ini sudah berupa data dari backend (hasil POST dari modal)
      setStudentsData((prev) => [newStudent, ...prev]);

      addToast({ message: "Mahasiswa berhasil ditambahkan", type: "success" });

      closeTambah();

      setCurrentPage(1);
      fetchMahasiswa(); // optional, biar sync DB
    } catch (error) {
      console.error(error);
      addToast({ message: "Gagal menambah mahasiswa", type: "error" });
    }
  };


  // UPDATE
  const handleUpdate = async (updatedStudent) => {
    try {
      const formData = new FormData();

      // Loop semua field
      for (const key in updatedStudent) {
        const val = updatedStudent[key];
        // Skip field foto kalau null atau undefined
        if (key === "foto" && (val === null || val === undefined)) continue;

        // Skip undefined atau null field selain foto juga bisa (optional)
        if (val === undefined) continue;

        formData.append(key, val);
      }

      // Kirim ke backend
      const res = await api.put(
        `/api/mahasiswa/${updatedStudent.id_mhs}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Update state pakai data dari backend (res.data) supaya akurat dan fresh
      setStudentsData((prev) =>
        prev.map((s) => (s.id_mhs === updatedStudent.id_mhs ? res.data : s))
      );

      addToast({
        message: "Data mahasiswa berhasil diperbarui",
        type: "success",
      });
      closeEdit();
    } catch (error) {
      console.error(error);
      addToast({ message: "Gagal memperbarui data", type: "error" });
    }
  };




  // DELETE
  const handleDelete = async (student) => {
    if (!window.confirm(`Hapus mahasiswa "${student.nama_mhs}"?`)) return;
    try {
      await api.delete(`/api/mahasiswa/${student.id_mhs}`);
      setStudentsData((prev) =>
        prev.filter((s) => s.id_mhs !== student.id_mhs)
      );
      addToast({ message: "Mahasiswa berhasil dihapus", type: "success" });
    } catch (error) {
      console.error(error);
      addToast({ message: "Gagal menghapus mahasiswa", type: "error" });
    }
  };

  // ========== FILTER & PAGINATION ==========
  const filteredStudents = studentsData.filter((s) => {
    const matchSearch =
      s.nama_mhs?.toLowerCase().includes(search.toLowerCase()) ||
      s.nim?.includes(search);
    let matchPoin = true;
    if (filterPoin === "nol") matchPoin = s.poin === 0;
    if (filterPoin === "<5") matchPoin = s.poin > 0 && s.poin < 5;
    if (filterPoin === ">=5") matchPoin = s.poin >= 5;
    return matchSearch && matchPoin;
  });

  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.max(
    1,
    Math.ceil(filteredStudents.length / itemsPerPage)
  );
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredStudents.slice(startIndex, endIndex);

  // ========== RENDER ==========
  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
      {/* Toolbar */}
      <TableToolbar
        search={search}
        setSearch={setSearch}
        filterPoin={filterPoin}
        setFilterPoin={setFilterPoin}
        onAdd={openTambah}
      />

      {/* Table */}
      <TableDesktop
        students={currentItems}
        openDetail={openDetail}
        openCetak={openCetak}
        onEdit={openEdit}
        onDelete={handleDelete}
      />
      <TableMobile
        students={currentItems}
        openDetail={openDetail}
        openCetak={openCetak}
        onEdit={openEdit}
        onDelete={handleDelete}
      />

      {/* Pagination */}
      <TablePagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
        startIndex={startIndex}
        endIndex={endIndex}
        filteredCount={filteredStudents.length}
      />

      {/* Modals */}
      <ModalTambahMhs
        isOpen={isTambahOpen}
        onClose={closeTambah}
        onSubmit={handleTambah}
      />
      <DetailModal
        isOpen={isModalOpen}
        onClose={closeModal}
        student={selectedStudent}
      />
      <ModalEdit
        isOpen={isEditOpen}
        onClose={closeEdit}
        student={selectedStudent}
        onSubmit={handleUpdate}
      />

      {/* Hidden CV area */}
      <div style={{ visibility: "hidden", height: 0, overflow: "hidden" }}>
        <div ref={componentRef}>
          {selectedStudent ? <CetakCV mahasiswa={selectedStudent} /> : null}
        </div>
      </div>
    </div>
  );
}
