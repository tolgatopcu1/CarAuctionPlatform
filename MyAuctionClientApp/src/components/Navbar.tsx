import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { FaCar, FaBars, FaTimes, FaUser, FaSignOutAlt, FaChevronDown } from "react-icons/fa";
import { getUserFromToken } from "../utils/auth";

const getNavItems = (user: ReturnType<typeof getUserFromToken> | null) => {
  const items = [
    { label: "Ana Sayfa", path: "/" },
    { label: "Araçlar", path: "/vehicles" },
  ];
  if (user) {
    items.push({ label: "Aracımı Satmak İstiyorum", path: "/Sell" });
  }
  if (user?.role === "Administrator") {
    items.push({ label: "Vehicle List", path: "/admin/vehicle-list" });
  }
  return items;
};

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [user, setUser] = useState<ReturnType<typeof getUserFromToken> | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = getUserFromToken();
    setUser(userData);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  return (
    <nav className="w-full bg-white dark:bg-gray-900 shadow-md fixed z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link
          to="/"
          className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 text-2xl font-bold"
        >
          <FaCar />
          AutoMarket
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex gap-6 items-center relative">
          {getNavItems(user).map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="text-gray-800 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors font-medium"
            >
              {item.label}
            </Link>
          ))}

          {user ? (
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(prev => !prev)}
                className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold hover:text-indigo-700 dark:hover:text-indigo-300"
              >
                <FaUser />
                {user.FullName}
                <FaChevronDown className={`transition-transform ${userMenuOpen ? "rotate-180" : ""}`} />
              </button>

              <AnimatePresence>
                {userMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded shadow-lg overflow-hidden z-50"
                  >
                    <Link
                      to="/profile"
                      onClick={() => setUserMenuOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <FaUser /> Profil
                    </Link>
                    <button
                      onClick={() => {
                        handleLogout();
                        setUserMenuOpen(false);
                      }}
                      className="w-full text-left flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900 dark:text-red-400"
                    >
                      <FaSignOutAlt /> Çıkış Yap
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <Link
              to="/login"
              className="ml-4 px-4 py-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded"
            >
              Giriş Yap
            </Link>
          )}
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            className="text-gray-800 dark:text-gray-200 text-xl focus:outline-none"
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white dark:bg-gray-900 overflow-hidden px-4 pb-4"
          >
            {getNavItems(user).map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMenuOpen(false)}
                className="block py-2 text-gray-800 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium"
              >
                {item.label}
              </Link>
            ))}

            {user ? (
              <>
                <div className="flex items-center gap-2 mt-3 text-indigo-600 dark:text-indigo-400 text-lg font-bold">
                  <FaUser /> {user.FullName}
                </div>
                <Link
                  to="/profile"
                  onClick={() => setMenuOpen(false)}
                  className="block mt-2 px-4 py-1 text-left text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                >
                  <FaUser className="inline mr-2" /> Profil
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setMenuOpen(false);
                  }}
                  className="mt-2 w-full text-left px-4 py-1 text-red-600 hover:bg-red-50 dark:hover:bg-red-900 dark:text-red-400 rounded"
                >
                  <FaSignOutAlt className="inline mr-2" /> Çıkış Yap
                </button>
              </>
            ) : (
              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="mt-2 block px-4 py-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded text-center"
              >
                Giriş Yap
              </Link>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
