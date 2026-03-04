import { motion } from "framer-motion";
import { useEffect, useState } from "react";

import lautImg from "../../Assets/Laut_Jernih.jpg";
import alamImg from "../../Assets/Alam_Asri.jpg";
import snorkelImg from "../../Assets/Surga_Snorkeling.jpg";

/* =========================
   Counter Component
========================= */
function Counter({ target, label }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 1500;
    const step = target / (duration / 16);

    const interval = setInterval(() => {
      start += step;

      if (start >= target) {
        setCount(target);
        clearInterval(interval);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(interval);
  }, [target]);

  return (
    <div className="text-center">
      <h3 className="text-4xl font-bold text-purple-600">
        {count}+
      </h3>
      <p className="text-gray-500 dark:text-gray-400 mt-2">
        {label}
      </p>
    </div>
  );
}

/* =========================
   Main Component
========================= */
export default function WhyJampea() {
  const features = [
    {
      title: "Laut Jernih",
      image: lautImg,
      desc: "Air sebening kristal dengan terumbu karang alami."
    },
    {
      title: "Alam Asri",
      image: alamImg,
      desc: "Lanskap tropis alami yang belum tersentuh urbanisasi."
    },
    {
      title: "Surga Snorkeling",
      image: snorkelImg,
      desc: "Spot snorkeling dengan keanekaragaman hayati luar biasa."
    }
  ];

  return (
    <section className="relative py-10 overflow-hidden">
      
      {/* Decorative Background Blur */}
      <div className="absolute -top-20 left-1/2 w-[600px] h-[600px] 
                      bg-purple-500/20 blur-3xl rounded-full 
                      -translate-x-1/2 -z-10">
      </div>

      {/* Section Title */}
      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-4xl font-bold text-center mb-10"
      >
        Kenapa Harus ke Jampea?
      </motion.h2>

      {/* Feature Cards */}
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto px-6 mb-12">
        {features.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            viewport={{ once: true }}
            className="group relative h-80 rounded-2xl overflow-hidden shadow-xl"
          >
            <img
              src={item.image}
              alt={item.title}
              className="absolute inset-0 w-full h-full object-cover
                         transition duration-700 group-hover:scale-110"
            />

            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition"></div>

            <div className="relative z-10 p-6 h-full flex flex-col justify-end text-white">
              <h3 className="text-2xl font-semibold mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-gray-200">
                {item.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Stats Section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-3 max-w-4xl mx-auto gap-10"
      >
        <Counter target={10} label="Destinasi Eksotis" />
        <Counter target={100} label="Spot Snorkeling" />
        <Counter target={500} label="Pengunjung Bahagia" />
      </motion.div>

    </section>
  );
}