import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import axios from "../api/axios";

function Destinations() {
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search") || "";

  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await axios.get("/destinations", {
          params: { 
            search,
            page: currentPage
          }
        });

        setDestinations(res.data.data);
        setLastPage(res.data.last_page);

      } catch (err) {
        console.error(err);
        setError("Gagal memuat destinasi.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [search, currentPage]);

  // Reset ke page 1 kalau search berubah
  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  if (loading) {
    return (
      <div className="p-10 text-center">
        <p className="text-gray-500 animate-pulse">
          Memuat destinasi...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-10 text-center text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-12 p-10">
      <h1 className="text-4xl font-bold">Semua Destinasi</h1>

      {destinations.length === 0 ? (
        <p className="text-gray-500">
          Tidak ada destinasi ditemukan.
        </p>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {destinations.map((item) => (
              <Link
                key={item.id}
                to={`/destinations/${item.id}`}
                className="group"
              >
                <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden">

                  {item.gambar_url ? (
                    <img
                      src={item.gambar_url}
                      alt={item.nama}
                      className="h-56 w-full object-cover group-hover:scale-105 transition duration-300"
                    />
                  ) : (
                    <div className="h-56 bg-gray-200 flex items-center justify-center text-gray-400">
                      No Image
                    </div>
                  )}

                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-purple-600 transition">
                      {item.nama}
                    </h3>

                    <p className="text-gray-600 text-sm line-clamp-3">
                      {item.deskripsi}
                    </p>
                  </div>

                </div>
              </Link>
            ))}
          </div>

          {/* 🔥 Pagination Controls */}
          <div className="flex justify-center items-center gap-4 mt-10">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(prev => prev - 1)}
              className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
            >
              Previous
            </button>

            <span className="px-4 py-2">
              Page {currentPage} of {lastPage}
            </span>

            <button
              disabled={currentPage === lastPage}
              onClick={() => setCurrentPage(prev => prev + 1)}
              className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Destinations;