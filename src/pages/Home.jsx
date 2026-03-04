import { useEffect, useState } from "react";
import axios from "../api/axios";
import { Link } from "react-router-dom";
import HeroSection from "../components/home/HeroSection";
import WhyJampea from "../components/home/WhyJampea";

function Home() {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await axios.get("/destinations");
        const featured = res.data.data.slice(0, 3);

        setDestinations(featured);
      } catch (err) {
        console.error(err);
        setError("Gagal memuat destinasi.");
      } finally {
        setLoading(false);
      }
    };

    fetchDestinations();
  }, []);

  return (
    <div className="space-y-2">

      <HeroSection />

      <div className="max-w-6xl mx-auto px-6 space-y-6">

        <WhyJampea />

        {/* DESTINASI UNGGULAN */}
        <section className="space-y-4">

          <div className="flex justify-between items-center">
            <h2 className="text-3xl font-bold">
              Destinasi Unggulan
            </h2>

            <Link
              to="/destinations"
              className="text-purple-600 font-medium hover:underline"
            >
              Lihat Semua →
            </Link>
          </div>

          {loading && (
            <p className="text-gray-500">Memuat destinasi...</p>
          )}

          {error && (
            <p className="text-red-500">{error}</p>
          )}

          {!loading && !error && (
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
                        className="h-48 w-full object-cover group-hover:scale-105 transition duration-300"
                      />
                    ) : (
                      <div className="h-48 bg-gray-200 flex items-center justify-center text-gray-400">
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
          )}

        </section>

      </div>
    </div>
  );
}

export default Home;