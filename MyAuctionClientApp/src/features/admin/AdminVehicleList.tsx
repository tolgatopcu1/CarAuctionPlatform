import { useEffect, useState } from "react";
import { FaArrowDown, FaArrowUp, FaSort, FaCarSide, FaTimesCircle, FaCheckCircle, FaEdit, FaTrash } from "react-icons/fa";
import { motion } from "framer-motion";
import { RootState } from "../../app/store";
import { Vehicle } from "../../types/Vehicle";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { getVehicles } from "../vehicles/vehicleSlice";
import { Link } from "react-router-dom";

type SortOrder = "default" | "asc" | "desc";

export default function AdminVehicleList() {
  const dispatch = useAppDispatch();
  const { vehicles, status } = useAppSelector((state:RootState) => state.vehicle);

  const [delayPassed, setDelayPassed] = useState(false);
  const [sortOrder, setSortOrder] = useState<SortOrder>("default");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredVehicles, setFilteredVehicles] = useState<typeof vehicles>([]);

  useEffect(() => {
    dispatch(getVehicles());

    const timer = setTimeout(() => {
      setDelayPassed(true);
    }, 1500);

    return () => clearTimeout(timer);
  }, [dispatch]);

  const getAuctionValue = (vehicle: any): number => {
    return Array.isArray(vehicle.bids) && vehicle.bids.length > 0
      ? Math.max(...vehicle.bids.map((b: any) => Number(b.bidAmount)))
      : vehicle.price;
  };

  useEffect(() => {
    if (status !== "succeeded") return;

    let result = vehicles.filter((vehicle:Vehicle) =>
      vehicle.brandAndModel?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (sortOrder === "asc") {
      result.sort((a:any, b:any) => getAuctionValue(a) - getAuctionValue(b));
    } else if (sortOrder === "desc") {
      result.sort((a:any, b:any) => getAuctionValue(b) - getAuctionValue(a));
    }

    setFilteredVehicles(result);
  }, [vehicles, searchQuery, sortOrder, status]);

  const handleSortClick = () => {
    setSortOrder((prev) =>
      prev === "default" ? "asc" : prev === "asc" ? "desc" : "default"
    );
  };

  const renderSortIcon = () => {
    if (sortOrder === "asc") return <FaArrowUp className="ml-2" />;
    if (sortOrder === "desc") return <FaArrowDown className="ml-2" />;
    return <FaSort className="ml-2" />;
  };
  const handleToggleActive = async (vehicleId: number) => {
  try {
    const response = await fetch(`http://localhost:5139/Vehicle/toggle-activity/${vehicleId}`, {
      method: "PATCH"
    });

    if (response.ok) {
      dispatch(getVehicles()); // Listeyi yeniden yükle
    } else {
      console.error("Aktiflik güncelleme başarısız");
    }
  } catch (error) {
    console.error("Sunucu hatası:", error);
  }
};

  if (status === "loading" || !delayPassed) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] space-y-4">
        <FaCarSide className="animate-pulse text-5xl text-indigo-600 dark:text-indigo-400" />
        <p className="text-gray-600 dark:text-gray-300 text-lg">Araçlar yükleniyor...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 px-6 py-10 mt-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-6xl mx-auto"
      >
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6">
          Admin - Araç Listesi
        </h1>

        {/* Search and Sort */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Marka veya model ara..."
            className="w-full md:w-1/3 px-4 py-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <button
            onClick={handleSortClick}
            className="flex items-center justify-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded shadow transition"
          >
            Fiyat Sırala {renderSortIcon()}
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded shadow">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-100 dark:bg-gray-800">
                <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Marka & Model
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Üretim Yılı
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Fiyat
                    <button onClick={handleSortClick} className="ml-2 text-indigo-600 dark:text-indigo-400">
                    {renderSortIcon()}
                    </button>
                </th>

                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Durum
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    İşlemler
                </th>
                </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
  {filteredVehicles.map((vehicle) => (
    <tr key={vehicle.vehicleId}>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
        {vehicle.brandAndModel}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
        {vehicle.manufacturingYear}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
        ₺{getAuctionValue(vehicle).toLocaleString("tr-TR")}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold">
        {vehicle.isActive ? (
          <span className="text-green-600 dark:text-green-400">✔️ Aktif</span>
        ) : (
          <span className="text-red-600 dark:text-red-400">❌ Aktif Değil</span>
        )}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm">
        <div className="flex gap-2">
          <button
        onClick={() => handleToggleActive(vehicle.vehicleId)}
        className={`px-3 py-1 ${
          vehicle.isActive ? "bg-yellow-600 hover:bg-yellow-700" : "bg-green-600 hover:bg-green-700"
        } text-white rounded-md flex items-center gap-1`}
      >
        {vehicle.isActive ? <FaTimesCircle /> : <FaCheckCircle />}
        {vehicle.isActive ? "Pasifleştir" : "Aktifleştir"}
      </button>
          <Link
            to={`/admin/delete-vehicle/${vehicle.vehicleId}`}
            className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded-md flex items-center gap-1"
          >
            <FaTrash /> Sil
          </Link>
        </div>
      </td>
    </tr>
  ))}
</tbody>
            </table>

        </div>
      </motion.div>
    </div>
  );
}
