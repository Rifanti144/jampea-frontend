import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "../api/axios";

function DestinationDetail() {
  const { id } = useParams();
  const [destination, setDestination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const res = await axios.get(`/destinations/${id}`);
        setDestination(res.data);
      } catch (err) {
        console.error(err);
        setError("Gagal memuat detail destinasi.");
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto px-6 py-10">
        <p className="text-gray-500">Memuat detail...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-5xl mx-auto px-6 py-10">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (!destination) {
    return (
      <div className="max-w-5xl mx-auto px-6 py-10">
        <p className="text-gray-500">Destinasi tidak ditemukan.</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-10 space-y-8">

      {/* Back Button */}
      <Link
        to="/destinations"
        className="text-purple-600 hover:text-purple-800 transition"
      >
        ← Kembali ke Semua Destinasi
      </Link>

      {/* Image */}
      {destination.gambar_utama && (
        <img
          src={`https://jampea-api-production.up.railway.app/images/${destination.gambar_utama}`}
          alt={destination.nama}
          className="w-full h-96 object-cover rounded-t-3xl"
        />
      )}

      {/* Content Card */}
      <div className="bg-white rounded-3xl shadow-lg p-10 -mt-12 relative z-10">

        <h1 className="text-4xl font-bold mb-4">
          {destination.nama}
        </h1>

        <span className="inline-block bg-purple-100 text-purple-700 px-4 py-1 rounded-full text-sm mb-6">
          {destination.kategori}
        </span>

        <p className="text-gray-700 leading-relaxed text-lg">
          {destination.deskripsi}
        </p>

        <div className="space-y-3 text-gray-700 mt-6">

          {destination.lokasi && (
            <p><strong>Lokasi:</strong> {destination.lokasi}</p>
          )}

          {destination.aktivitas && (
            <p><strong>Aktivitas:</strong> {destination.aktivitas}</p>
          )}

          {destination.akses_transportasi && (
            <p><strong>Akses Transportasi:</strong> {destination.akses_transportasi}</p>
          )}

          {destination.fasilitas && (
            <p><strong>Fasilitas:</strong> {destination.fasilitas}</p>
          )}

          {destination.harga_tiket && (
            <p><strong>Harga Tiket:</strong> {destination.harga_tiket}</p>
          )}

          {destination.jam_operasional && (
            <p><strong>Jam Operasional:</strong> {destination.jam_operasional}</p>
          )}

          {destination.tips && (
            <p><strong>Tips:</strong> {destination.tips}</p>
          )}

        </div>
      </div>
    </div>
  );
}

export default DestinationDetail;