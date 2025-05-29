import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Unauthorized() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="text-center"
      >
        <h1 className="text-5xl font-bold text-red-600 dark:text-red-400">403</h1>
        <p className="mt-4 text-2xl font-semibold text-gray-800 dark:text-gray-100">
          Yetkisiz Erişim
        </p>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Bu sayfaya erişim izniniz bulunmamaktadır.
        </p>

        <Link
          to="/"
          className="inline-block mt-6 px-6 py-3 bg-indigo-600 text-white text-sm font-medium rounded-full shadow hover:bg-indigo-700 transition"
        >
          Ana Sayfaya Dön
        </Link>
      </motion.div>
    </div>
  );
}
