"use client";

import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

export default function BarChartAngkatan() {
  // Data dummy jumlah mahasiswa per angkatan
  const data = [
    { angkatan: "2021", jumlah: 120 },
    { angkatan: "2022", jumlah: 150 },
    { angkatan: "2023", jumlah: 180 },
    { angkatan: "2024", jumlah: 140 },
    { angkatan: "2025", jumlah: 100 },
  ];

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm bar-chart-container">
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes barGrow {
          from {
            transform: scaleY(0);
          }
          to {
            transform: scaleY(1);
          }
        }

        @keyframes pulse {
          0% {
            box-shadow: 0 0 0 0 rgba(37, 99, 235, 0.4);
          }
          70% {
            box-shadow: 0 0 0 8px rgba(37, 99, 235, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(37, 99, 235, 0);
          }
        }

        @keyframes lineExpand {
          to {
            width: 100%;
          }
        }

        .bar-chart-container {
          animation: fadeInUp 0.6s ease-out;
        }

        .chart-title {
          position: relative;
          display: inline-block;
        }

        .chart-title::after {
          content: "";
          position: absolute;
          bottom: -3px;
          left: 0;
          width: 0;
          height: 2px;
          background: linear-gradient(90deg, #2563eb, #3b82f6);
          border-radius: 1px;
          animation: lineExpand 0.8s ease forwards;
          animation-delay: 0.3s;
        }

        .custom-bar {
          animation: barGrow 1s ease-out;
          transform-origin: bottom;
        }

        .pulse-circle {
          display: inline-block;
          width: 8px;
          height: 8px;
          background-color: #2563eb;
          border-radius: 50%;
          margin-right: 6px;
          animation: pulse 1.5s infinite;
        }
      `}</style>

      <h2 className="text-base font-medium text-gray-700 mb-3 flex items-center gap-2 chart-title">
        <span className="pulse-circle"></span>
        <i className="fas fa-chart-bar text-blue-600 text-sm"></i>
        Grafik Mahasiswa per Angkatan
      </h2>

      <div className="w-full h-56 sm:h-64 md:h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 15, right: 20, left: 0, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="2 2" className="stroke-gray-200" />
            <XAxis
              dataKey="angkatan"
              fontSize="0.75rem"
              tick={{ fill: "#4b5563" }}
            />
            <YAxis fontSize="0.75rem" tick={{ fill: "#4b5563" }} />
            <Tooltip
              cursor={{ fill: "#f3f4f6" }}
              contentStyle={{
                borderRadius: "6px",
                boxShadow:
                  "0 2px 4px -1px rgba(0,0,0,0.1), 0 1px 2px -1px rgba(0,0,0,0.06)",
                border: "none",
                fontSize: "0.8rem",
              }}
            />
            <Legend
              wrapperStyle={{
                paddingTop: 8,
                fontSize: "0.75rem",
                color: "#374151",
              }}
            />
            <Bar
              dataKey="jumlah"
              fill="#2563eb"
              radius={[4, 4, 0, 0]}
              className="custom-bar"
              animationDuration={1200}
              animationEasing="ease-out"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
