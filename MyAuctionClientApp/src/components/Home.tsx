import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaCarSide } from "react-icons/fa";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center text-white">
      <div
        className="absolute inset-0 bg-cover bg-center brightness-50"
        style={{
          backgroundImage: `url('https://www.motortrend.com/uploads/sites/11/2018/08/2019-Acura-NSX-07.jpg')`,
        }}
      />

      <div className="relative z-10 text-center max-w-2xl px-6">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-4xl md:text-6xl font-extrabold mb-6 drop-shadow-xl"
        >
          Açık Artırma ile Hayalinizdeki Araca Ulaşın
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-lg md:text-xl mb-10 text-gray-200 drop-shadow"
        >
          En yeni fırsatlarla dolu araç açık artırmalarını hemen keşfedin.
        </motion.p>

        <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        >
        <Link
            to="/vehicles"
            className="inline-flex items-center gap-3 px-6 py-3 text-lg font-medium rounded-full shadow-xl"
        >
            <motion.div
            className="relative inline-flex items-center gap-3 rounded-full px-4 py-3"
            animate={{ backgroundPosition: "400% 0%" }}
            transition={{
                duration: 6,
                ease: "linear",
                repeat: Infinity,
            }}
            style={{
                backgroundImage:
                "linear-gradient(270deg, #7C3AED, #4F46E5, #9333EA, #6366F1, #7C3AED)",
                backgroundSize: "800% 800%",
            }}
            >
            <FaCarSide className="text-xl text-white" />
            <span className="ml-2 text-white">Aktif Araçları Gör</span>
            </motion.div>
        </Link>
        </motion.div>

      </div>
    </section>
  );
}
