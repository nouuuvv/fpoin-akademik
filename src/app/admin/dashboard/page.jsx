"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Cards from "./components/Cards";
import BarChartAngkatan from "./components/GrafikBar";
import PieChartKegiatan from "./components/GrafikChart";

export default function AdminPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 700);
    return () => clearTimeout(timer);
  }, []);

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
          Memuat data dashboard...
        </motion.div>
      ) : (
        <motion.div
          key="dashboard"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="space-y-6"
        >
          <Cards />
          <BarChartAngkatan />
          <PieChartKegiatan />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
