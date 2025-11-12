"use client";
import React from "react";
export default function TableMaster({
  currentItems = [],
  isAdmin = false,
  getBadgeClass = () => {},
  onEdit,
  onDelete,
}) {
  return (
    <>
      <style jsx>{`
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .animate-slide-in {
          animation: slideInLeft 0.5s ease-out forwards;
          opacity: 0;
        }
      `}</style>
      <div className="hidden lg:block overflow-x-auto rounded-xl shadow-lg border border-gray-100">
        <table className="w-full text-xs min-w-[600px]">
          <thead className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white text-xs">
            <tr>
              <th className="px-3 py-2 font-semibold text-left">
                <div className="flex items-center">
                  <i className="fas fa-tag mr-1 text-xs"></i>
                  <span>Kode</span>
                </div>
              </th>
              <th className="px-3 py-2 font-semibold text-left">
                <div className="flex items-center">
                  <i className="fas fa-layer-group mr-1 text-xs"></i>
                  <span>Jenis</span>
                </div>
              </th>
              <th className="px-3 py-2 font-semibold text-left">
                <div className="flex items-center">
                  <i className="fas fa-user-tie mr-1 text-xs"></i>
                  <span>Posisi</span>
                </div>
              </th>
              <th className="px-3 py-2 font-semibold text-center">
                <div className="flex items-center justify-center">
                  <i className="fas fa-star mr-1 text-xs"></i>
                  <span>Poin</span>
                </div>
              </th>
              {isAdmin && (
                <th className="px-3 py-2 font-semibold text-center">
                  <div className="flex items-center justify-center">
                    <i className="fas fa-cogs mr-1 text-xs"></i>
                    <span>Aksi</span>
                  </div>
                </th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {currentItems.length > 0 ? (
              currentItems.map((item, index) => (
                <tr
                  key={index}
                  className="hover:bg-blue-50/60 transition-colors duration-150 animate-slide-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <td className="px-3 py-2 font-mono font-semibold text-gray-900 text-xs">
                    {item.kode}
                  </td>
                  <td className="px-3 py-2 text-gray-700 max-w-[200px] truncate text-xs">
                    <div title={item.jenis}>{item.jenis}</div>
                  </td>
                  <td className="px-3 py-2 text-gray-700 max-w-[150px] truncate text-xs">
                    <div title={item.peran}>{item.peran}</div>
                  </td>
                  <td className="px-3 py-2 text-center">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getBadgeClass(
                        item.poin
                      )}`}
                    >
                      {item.poin}
                    </span>
                  </td>
                  {isAdmin && (
                    <td className="px-3 py-2">
                      <div className="flex justify-center gap-1.5">
                        <button
                          onClick={() => onEdit(item)}
                          className="bg-amber-100 text-amber-700 px-2.5 py-1 rounded-lg text-xs hover:bg-amber-200 flex items-center transition-colors shadow-sm"
                          title="Edit"
                        >
                          <i className="fas fa-edit mr-1 text-xs"></i>
                          <span>Edit</span>
                        </button>
                        <button
                          onClick={() => onDelete(item)}
                          className="bg-red-100 text-red-700 px-2.5 py-1 rounded-lg text-xs hover:bg-red-200 flex items-center transition-colors shadow-sm"
                          title="Hapus"
                        >
                          <i className="fas fa-trash-alt mr-1 text-xs"></i>
                          <span>Hapus</span>
                        </button>
                      </div>
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={isAdmin ? 5 : 4}
                  className="px-3 py-6 text-center text-gray-500"
                >
                  <div className="flex flex-col items-center justify-center">
                    <i className="fas fa-search text-xl text-gray-300 mb-2"></i>
                    <p className="text-xs">Tidak ada data yang ditemukan</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
