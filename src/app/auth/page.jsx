"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import styles from "./auth.module.css";
import LoadingOverlay from "@/components/LoadingOverlay"; // ✅ import

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ identifier: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        credentials: "include", // penting supaya browser simpan cookie dari response
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message);

      // Data role bisa dipakai untuk redirect
      if (data.role === "admin") router.replace("/admin/dashboard");
      else router.replace("/mahasiswa/dashboard");
    } catch (error) {
      alert(error.message || "Login gagal");
    }
  };


  return (
    <>
      <div className={styles.container}>
        <form className={styles.card} onSubmit={handleSubmit}>
          <h2 className={styles.title}>Login</h2>
          <input
            type="text"
            name="identifier"
            placeholder="NIM / NIP"
            onChange={handleChange}
            className={styles.input}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            className={styles.input}
            required
          />
          <button type="submit" className={styles.button} disabled={loading}>
            {loading ? "Memproses..." : "Login"}
          </button>
        </form>
      </div>

      {/* ✅ overlay muncul pas loading true */}
      <LoadingOverlay show={loading} text="Mengalihkan ke dashboard..." />
    </>
  );
}
