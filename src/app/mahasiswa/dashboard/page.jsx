"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import mahasiswaData from "@/data/mahasiswa.json";
import Header from "./components/Header";
import Biodata from "./components/Biodata";
import ProgressPoin from "./components/ProgressPoin";
import Pencapaian from "./components/Pencaipan";

export default function MahasiswaPage() {
  const mahasiswaInitial = mahasiswaData.find((m) => m.id === 2);
  const [mahasiswa, setMahasiswa] = useState(mahasiswaInitial);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 700);
    return () => clearTimeout(timer);
  }, []);

  const handleUpdateBiodata = (updatedData) => {
    setMahasiswa((prev) => ({
      ...prev,
      ...updatedData,
    }));
  };

  return (
    <AnimatePresence mode="wait">
      {loading ? (
        <motion.div
          key="loading"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="flex justify-center items-center h-screen text-lg font-medium text-gray-600"
        >
          Memuat dashboard mahasiswa...
        </motion.div>
      ) : (
        <motion.div
          key="dashboard"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-4 md:p-6 space-y-6"
        >
          <Header mahasiswa={mahasiswa} />
          <Biodata mahasiswa={mahasiswa} onUpdate={handleUpdateBiodata} />
          <ProgressPoin mahasiswa={mahasiswa} targetPoin={100} />
          <Pencapaian mahasiswa={mahasiswa} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
