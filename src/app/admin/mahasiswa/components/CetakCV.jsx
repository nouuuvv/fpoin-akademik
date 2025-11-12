"use client";
import React from "react";
import "../styles/style.css";

const CetakCV = ({ mahasiswa }) => {
  const prodiMap = {
    S1: "S1 Teknik Informatika",
    D3: "D3 Manajemen Informatika",
  };

  const topActivities = mahasiswa?.activities
    ?.filter((a) => a.status === "Terverifikasi")
    .slice(0, 3);

  const topCompetitions = mahasiswa?.competitions
    ?.filter((c) => c.status === "Terverifikasi")
    .slice(0, 3);

  const ttl =
    mahasiswa?.tempatLahir && mahasiswa?.tanggalLahir
      ? `${mahasiswa.tempatLahir}, ${new Date(
          mahasiswa.tanggalLahir
        ).toLocaleDateString("id-ID", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })}`
      : "Surabaya, 15 Januari 2003";

  // Tanggal hari ini untuk TTD
  const today = new Date().toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="page">
      <div className="content">
        {/* === HEADER === */}
        <div className="w-full header-bg text-white flex items-center gap-6 p-6 relative z-10">
          <div className="w-28 h-28 rounded-full overflow-hidden profile-photo">
            <img
              src={mahasiswa?.foto || "/images/3x4.jpg"}
              alt="Foto Profil"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold flex items-center gap-2 mb-1">
              <i className="fas fa-user text-2xl"></i>
              {mahasiswa?.name || "Nama Mahasiswa"}
            </h1>
            <p className="text-lg font-medium text-blue-100 mb-1">
              {prodiMap[mahasiswa?.prodi] ||
                mahasiswa?.prodi ||
                "Program Studi"}
            </p>
            <p className="text-blue-200 font-medium">STIKOM BANYUWANGI</p>
            <div className="contact-info mt-3 text-xs">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1">
                  <i className="fas fa-envelope text-xs"></i>
                  {mahasiswa?.email || "example@example.com"}
                </span>
                <span className="flex items-center gap-1">
                  <i className="fas fa-phone text-xs"></i>
                  {mahasiswa?.phone || "0812-3456-7890"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* === BIODATA === */}
        <div className="p-6 pb-4 relative z-10">
          <h2 className="section-title pb-1 mb-4">
            <i className="fas fa-id-card"></i> Biodata
          </h2>
          <div className="grid grid-cols-2 gap-y-1 gap-x-6 text-gray-800 biodata-grid">
            <div>
              <strong className="text-blue-700">NIM:</strong>{" "}
              <span className="ml-2">{mahasiswa?.nim || "-"}</span>
            </div>
            <div>
              <strong className="text-blue-700">IPK:</strong>{" "}
              <span className="ml-2">{mahasiswa?.ipk || "-"}</span>
            </div>
            <div>
              <strong className="text-blue-700">Alamat:</strong>{" "}
              <span className="ml-2">{mahasiswa?.alamat || "-"}</span>
            </div>
            <div>
              <strong className="text-blue-700">TTL:</strong>{" "}
              <span className="ml-2">{ttl}</span>
            </div>
            <div>
              <strong className="text-blue-700">Instagram:</strong>{" "}
              <span className="ml-2">{mahasiswa?.instagram || "-"}</span>
            </div>
          </div>
        </div>

        {/* === ORGANISASI === */}
        <div className="px-6 pb-4 relative z-10">
          <h2 className="section-title pb-1 mb-4">
            <i className="fas fa-users"></i> Pengalaman Organisasi
          </h2>
          <div className="space-y-2">
            {topActivities && topActivities.length > 0 ? (
              topActivities.map((org) => (
                <div key={org.id} className="organization-item">
                  <div className="font-semibold text-gray-800">
                    {org.namaKegiatan}
                  </div>
                  <div className="text-blue-600 text-xs font-medium">
                    {new Date(org.tanggal).toLocaleDateString("id-ID", {
                      year: "numeric",
                      month: "long",
                    })}
                  </div>
                </div>
              ))
            ) : (
              <div className="organization-item placeholder-item text-gray-500 italic">
                Belum ada pengalaman organisasi
              </div>
            )}
          </div>
        </div>

        {/* === PRESTASI === */}
        <div className="px-6 pb-4 relative z-10">
          <h2 className="section-title pb-1 mb-4">
            <i className="fas fa-trophy"></i> Prestasi
          </h2>
          <div className="space-y-2">
            {topCompetitions && topCompetitions.length > 0 ? (
              topCompetitions.map((comp) => (
                <div key={comp.id} className="achievement-item">
                  <div className="font-semibold text-gray-800 flex items-center gap-2">
                    <i className="fas fa-medal text-yellow-500"></i>
                    {comp.namaKegiatan}
                  </div>
                  <div className="text-blue-600 text-xs font-medium">
                    {comp.tingkat} ({new Date(comp.tanggal).getFullYear()})
                  </div>
                </div>
              ))
            ) : (
              <div className="achievement-item placeholder-item text-gray-500 italic">
                Belum ada prestasi
              </div>
            )}
          </div>
        </div>
      </div>

      {/* === TTD === */}
      <div className="signature-section-wrapper">
        <div className="signature-section">
          <div className="text-right mb-4">
            <span className="date-location">Banyuwangi, {today}</span>
          </div>
          <div className="grid grid-cols-3 text-center gap-4">
            {/* Ketua */}
            <div className="signature-column">
              <p className="mb-6 font-medium text-gray-700">Ketua STIKOM</p>
              <div className="signature-wrapper">
                <img src="/images/stamp.png" alt="Stamp" className="stamp" />
                <img
                  src="/images/ttd-ketua.png"
                  alt="Tanda Tangan Ketua"
                  className="ttd"
                />
              </div>
              <div className="mt-6">
                <div className="border-t border-gray-300 pt-1">
                  <p className="font-semibold text-gray-800">
                    Rachman Yulianto, M.kom
                  </p>
                </div>
              </div>
            </div>

            {/* Kabag */}
            <div className="signature-column">
              <p className="mb-6 font-medium text-gray-700">
                Kabag Kemahasiswaan
              </p>
              <div className="signature-wrapper"></div>
              <div className="mt-6">
                <div className="border-t border-gray-300 pt-1">
                  <p className="font-semibold text-gray-800">
                    Abdul Haris, M.Kom
                  </p>
                </div>
              </div>
            </div>

            {/* Mahasiswa */}
            <div className="signature-column">
              <p className="mb-6 font-medium text-gray-700">Mahasiswa</p>
              <div className="signature-wrapper"></div>
              <div className="mt-6">
                <div className="border-t border-gray-300 pt-1">
                  <p className="font-semibold text-gray-800">
                    {mahasiswa?.name || "Nama Mahasiswa"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CetakCV;
