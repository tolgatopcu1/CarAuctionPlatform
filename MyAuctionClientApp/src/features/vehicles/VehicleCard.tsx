import React from "react";
import { Vehicle } from "../../types/Vehicle";
import { motion } from "framer-motion";
import { FaCarSide } from "react-icons/fa";
import { MdColorLens } from "react-icons/md";
import { BsSpeedometer2 } from "react-icons/bs";
import AuctionCountdown from "./AuctionCountdown";
import { useNavigate } from "react-router-dom";
import { Bid } from "../../types/Bid";

interface Props {
  vehicle: Vehicle;
  onDetailsClick?: (vehicle: Vehicle) => void;
  index: number;
}

const VehicleCard: React.FC<Props> = ({ vehicle , index }) => {
  const navigate = useNavigate();
  
  return (
    <motion.div
      className="relative z-0 bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transform transition-all duration-300 cursor-pointer hover:scale-105 hover:z-10"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <img
        src={`http://localhost:5139${vehicle.image}`}
        alt={vehicle.brandAndModel || "Vehicle Image"}
        className="h-72 w-full object-cover"
      />
      <div className="p-4 space-y-3">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
          {vehicle.brandAndModel || "No Brand/Model"}
        </h2>

        <div className="flex items-center gap-2 text-gray-500 dark:text-gray-300 text-sm">
          <FaCarSide className="text-indigo-500" />
          <span>{vehicle.manufacturingYear}</span>
        </div>

        <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
          <span className="flex items-center gap-1">
            <MdColorLens className="text-indigo-400" />
            {vehicle.color}
          </span>
          <span className="flex items-center gap-1">
            <BsSpeedometer2 className="text-indigo-400" />
            {vehicle.milage} km
          </span>
        </div>

        <div className="flex justify-between items-center mt-4">
          <span className="text-lg font-bold text-indigo-600 dark:text-indigo-400">
          Current Bid: ₺
          {Array.isArray(vehicle.bids) && vehicle.bids.length > 0
            ? vehicle.bids
                .map((b: Bid) => Number(b.bidAmount))
                .sort((a, b) => b - a)[0]
                .toLocaleString("en-US")
            : vehicle.price.toLocaleString("en-US")}
        </span>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Plate: {vehicle.plateNumber || "N/A"}
          </span>
        </div>

        <div className="mt-2 flex justify-between items-center">
        <AuctionCountdown endTime={vehicle.endTime} />
        <button
          onClick={() => navigate(`/vehicles/${vehicle.vehicleId}`)}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full text-sm transition-colors"
        >
          Details
        </button>
      </div>
      </div>
    </motion.div>
  );
};

export default VehicleCard;
