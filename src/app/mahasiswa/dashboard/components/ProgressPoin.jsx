"use client";

import React from "react";

export default function ProgressPoin({ mahasiswa, maksimalPoin = 50 }) {
  // Hitung progress: 1 poin = 1%
  const progress = Math.min(mahasiswa.poin, 100); // maksimal 100%
  const gradient = "from-blue-400 via-blue-500 to-indigo-600";

  return (
    <div className="bg-white rounded-2xl shadow-lg p-4 transition-all duration-700">
      {/* Judul */}
      <h2 className="text-base font-semibold text-gray-800 mb-3 flex items-center gap-1.5">
        <i className="fas fa-chart-line text-blue-600 text-sm"></i>
        <span>Progress Poin</span>
      </h2>

      <div className="relative">
        {/* Header Info */}
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs font-medium py-0.5 px-1.5 uppercase rounded text-blue-600 bg-blue-100">
            Poin Terkumpul
          </span>
          {/* Persentase + poin */}
          <span className="text-xs font-semibold text-blue-600">
            {progress}% ({mahasiswa.poin} Poin)
          </span>
        </div>

        {/* Progress Bar */}
        <div className="relative w-full h-3 rounded-full bg-gray-100 overflow-hidden">
          <div
            className={`h-3 bg-gradient-to-r ${gradient} transition-all duration-1000 ease-out relative`}
            style={{ width: `${progress}%` }}
          >
            <div className="absolute inset-0 bg-stripes animate-stripes opacity-30"></div>
          </div>

          {/* Badge poin */}
          <div
            className="absolute -top-5 transform -translate-x-1/2 flex flex-col items-center"
            style={{ left: `${Math.min(progress, 100)}%` }}
          >
            <div className="bg-blue-600 text-white text-xs font-semibold px-1.5 py-0.5 rounded shadow">
              {mahasiswa.poin} 
            </div>
            <div className="w-0.5 h-2 bg-blue-600 rounded-b"></div>
          </div>
        </div>

        {/* Footer Info */}
        <div className="flex justify-end text-xs text-gray-700 mt-1.5">
          <span>Maksimal Poin: {maksimalPoin}</span>
        </div>
      </div>

      {/* CSS tambahan */}
      <style jsx>{`
        .bg-stripes {
          background-image: linear-gradient(
            45deg,
            rgba(255, 255, 255, 0.3) 25%,
            transparent 25%,
            transparent 50%,
            rgba(255, 255, 255, 0.3) 50%,
            rgba(255, 255, 255, 0.3) 75%,
            transparent 75%,
            transparent
          );
          background-size: 0.4rem 0.4rem;
        }
        @keyframes stripes {
          from {
            background-position: 0 0;
          }
          to {
            background-position: 0.8rem 0;
          }
        }
        .animate-stripes {
          animation: stripes 2s linear infinite;
        }
      `}</style>
    </div>
  );
}
