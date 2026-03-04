import { Link } from "react-router-dom";

function HeroSection() {
  return (
    <section className="relative w-full h-screen overflow-hidden">

      {/* Background Image */}
      <img
        src="http://localhost:8000/images/pantai_bonesialla.jpg"
        alt="Pulau Jampea"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Content */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <div className="max-w-4xl px-8 text-white text-center">

          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight drop-shadow-lg">
            Selamat Datang di Pulau Jampea
          </h1>

          <p className="text-lg text-gray-200 mb-8">
            Surga tersembunyi dengan pantai eksotis dan pengalaman wisata
            yang tak terlupakan.
          </p>

          <div className="flex justify-center gap-4">
            <Link
              to="/destinations"
              className="bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-full font-medium transition"
            >
              Jelajahi Destinasi
            </Link>

            <button
              onClick={() => window.dispatchEvent(new Event("openChatbot"))}
              className="bg-white/20 hover:bg-white/30 px-6 py-3 rounded-full backdrop-blur-md transition"
            >
              Tanya AI Jampea
            </button>
          </div>

        </div>
      </div>

    </section>
  );
}

export default HeroSection;