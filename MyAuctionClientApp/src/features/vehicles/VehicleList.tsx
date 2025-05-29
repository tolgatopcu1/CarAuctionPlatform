import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { getVehicles } from "./vehicleSlice";
import VehicleCard from "./VehicleCard";
import { FaSpinner } from "react-icons/fa";
import { Vehicle } from "../../types/Vehicle";
import { FiSearch } from "react-icons/fi";
import { FaArrowUp, FaArrowDown, FaSort } from "react-icons/fa6"; // İkonlar

type SortOrder = "default" | "asc" | "desc";

const VehicleList = () => {
  const dispatch = useAppDispatch();
  const { vehicles, status, error } = useAppSelector((state) => state.vehicle);

  const [delayPassed, setDelayPassed] = useState(false);
  const [sortOrder, setSortOrder] = useState<SortOrder>("default");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredVehicles, setFilteredVehicles] = useState<Vehicle[]>([]);

  useEffect(() => {
    dispatch(getVehicles());

    const timer = setTimeout(() => {
      setDelayPassed(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, [dispatch]);

  const getAuctionValue = (vehicle: Vehicle): number => {
    return Array.isArray(vehicle.bids) && vehicle.bids.length > 0
      ? Math.max(...vehicle.bids.map((b) => Number(b.bidAmount)))
      : vehicle.price;
  };

  useEffect(() => {
    if (status !== "succeeded") return;

    let result = vehicles.filter((vehicle) =>
      vehicle.brandAndModel?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (sortOrder === "asc") {
      result.sort((a, b) => getAuctionValue(a) - getAuctionValue(b));
    } else if (sortOrder === "desc") {
      result.sort((a, b) => getAuctionValue(b) - getAuctionValue(a));
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

  if (status === "loading" || !delayPassed) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] space-y-4">
        <FaSpinner className="animate-spin text-4xl text-indigo-600" />
        <p className="text-gray-600 text-lg">Loading vehicles...</p>
      </div>
    );
  }

  if (status === "failed") {
    return <p className="text-red-600 text-center mt-10">Error: {error}</p>;
  }

  return (
    <div className="container mt-16 mx-auto px-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-4">
        <div className="mb-6 sm:mb-0">
        <div className="flex items-center bg-zinc-800 text-white rounded-xl px-4 py-2 shadow-inner w-72 sm:w-80">
          <input
            type="text"
            placeholder="Araç adı yaz..."
            className="w-full bg-transparent outline-none text-white placeholder-gray-400"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <FiSearch className="text-indigo-400 text-xl" />
        </div>
      </div>

        <button
          onClick={handleSortClick}
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition flex items-center"
        >
          {sortOrder === "default"
            ? "Fiyata Göre (Varsayılan)"
            : sortOrder === "asc"
            ? "Fiyata Göre (Önce En Düşük)"
            : "Fiyata Göre (Önce En Yüksek)"}
          {renderSortIcon()}
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredVehicles
        .filter((vehicle) => vehicle.isActive) // sadece aktif olanlar
        .map((vehicle, index) => (
          <VehicleCard key={vehicle.vehicleId} vehicle={vehicle} index={index} />
        ))}
      </div>
    </div>
  );
};

export default VehicleList;
