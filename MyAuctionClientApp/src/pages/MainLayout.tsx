import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900 text-gray-800 dark:text-white">
      <Navbar />
      <main className="flex-grow">
        <Outlet /> {/* 🔹 Buraya child sayfalar gelecek */}
      </main>
    </div>
  );
}
