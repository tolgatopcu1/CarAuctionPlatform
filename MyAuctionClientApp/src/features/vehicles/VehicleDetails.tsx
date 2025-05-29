import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Palette,
  Calendar,
  Fuel,
  DollarSign,
  Gauge,
  BadgePercent,
  Info,
  Clock,
  CircleCheck,
  CircleX,
  Hammer
} from "lucide-react";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { getVehiclesById } from "./vehicleSlice";
import { FaSpinner } from "react-icons/fa";
import AuctionCountdown from "./AuctionCountdown";
import BidDetails from "../bid/BidsDetails";
import { getUserFromToken } from "../../utils/auth";
import axios from "axios";
import { Vehicle } from "../../types/Vehicle";

const DetailItem = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
}) => (
  <div className="flex items-center gap-3 p-2 bg-gray-50 dark:bg-gray-700 rounded-lg shadow-sm">
    <div className="text-indigo-600 dark:text-indigo-400">{icon}</div>
    <div>
      <p className="font-medium text-gray-700 dark:text-white">{label}</p>
      <p className="text-gray-600 dark:text-gray-400">{value}</p>
    </div>
  </div>
);

const checkWinner = async (
  vehicle: Vehicle | null,
  setWinnerStatus: Function
) => {
  if (!vehicle) return;

  const now = new Date();
  const endTime = new Date(vehicle.endTime);
  const auctionHasEnded = now >= endTime;

  if (auctionHasEnded) {
    try {
      console.log("checkWinner çalışıyor, vehicleId:", vehicle.vehicleId);

      const res = await axios.get(
        `http://localhost:5139/api/Bid/GetHighestBidByVehicleId/${vehicle.vehicleId}`
      );

      const result = res.data.result;
      console.log("Bid sonucu:", result);

      if (!result) {
        setWinnerStatus(null);
        return;
      }

      const highestBidderId = result.userId;
      const currentUser = getUserFromToken();
      const currentUserId = currentUser?.nameid;

      console.log("Karşılaştırma:", { highestBidderId, currentUserId });

      if (currentUserId === highestBidderId) {
        setWinnerStatus("won");
      } else {
        setWinnerStatus("lost");
      }
    } catch (error) {
      console.error("Kazanan kontrolü yapılamadı", error);
    }
  }
};

const VehicleDetail = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { selectedVehicle: vehicle, status, error } = useAppSelector(
    (state) => state.vehicle
  );

  const [delayPassed, setDelayPassed] = useState(false);
  const [winnerStatus, setWinnerStatus] = useState<"won" | "lost" | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDelayPassed(true);
    }, 1000);

    if (id) {
      dispatch(getVehiclesById(id));
    }

    return () => clearTimeout(timer);
  }, [id, dispatch]);

  // Auction bittiyse, sadece bir kez kontrol et
  useEffect(() => {
    if (!vehicle) return;

    const now = new Date();
    const endTime = new Date(vehicle.endTime);
    const timeUntilEnd = endTime.getTime() - now.getTime();

    if (timeUntilEnd <= 0) {
      checkWinner(vehicle, setWinnerStatus);
    } else {
      const timeout = setTimeout(() => {
        checkWinner(vehicle, setWinnerStatus);
      }, timeUntilEnd);

      return () => clearTimeout(timeout);
    }
  }, [vehicle]);

  useEffect(() => {
    console.log("WinnerStatus değişti:", winnerStatus);
  }, [winnerStatus]);

  if (status === "loading" || !delayPassed) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] space-y-4">
        <FaSpinner className="animate-spin text-4xl text-indigo-600" />
        <p className="text-gray-600 text-lg">Loading vehicle...</p>
      </div>
    );
  }

  if (status === "failed")
    return <p className="text-center mt-10 text-red-500">{error}</p>;

  if (!vehicle) return <p className="text-center mt-10">Araç bulunamadı.</p>;


  return (
    <>
      {/* Kazanan kullanıcıya popup */}
      {!vehicle.isActive && winnerStatus && (
        <div className="fixed inset-0 bg-black bg-opacity-70 z-[9999] flex items-center justify-center">
          <div className="bg-white dark:bg-gray-800 text-center p-8 rounded-2xl shadow-2xl z-50 max-w-md mx-auto">
            <h2 className="text-2xl font-bold mb-4">
              {winnerStatus === "won" ? "🎉 Tebrikler!" : "😞 Üzgünüz!"}
            </h2>
            <p className="text-gray-700 dark:text-gray-300 text-lg">
              {winnerStatus === "won"
                ? `${vehicle.brandAndModel} marka aracı başarıyla satın aldınız. Ekibimiz en kısa sürede sizinle iletişime geçecektir.`
                : "Açık artırmayı kazanamadınız."}
            </p>
          </div>
        </div>
      )}

      {/* Araç detayları */}
      <div className="max-w-6xl mx-auto my-10 p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl flex flex-col lg:flex-row gap-8">
      <div className="flex-1">
        <div className="w-full aspect-video rounded-xl overflow-hidden shadow-lg">
          <img
            src={`http://localhost:5139${vehicle.image}`}
            alt={vehicle.brandAndModel}
            className="w-full h-full object-cover object-center"
          />
        </div>
      </div>

        <div className="flex-1 space-y-4">
          <h2 className="text-3xl font-bold text-indigo-700 dark:text-indigo-400 flex items-center gap-2">
            {vehicle.brandAndModel}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <DetailItem icon={<Palette />} label="Color" value={vehicle.color} />
            <DetailItem icon={<Calendar />} label="Year" value={vehicle.manufacturingYear} />
            <DetailItem icon={<Fuel />} label="Engine" value={`${vehicle.engineCapacity} cc`} />
            <DetailItem icon={<DollarSign />} label="Price" value={`$${vehicle.price}`} />
            <DetailItem icon={<Gauge />} label="Milage" value={`${vehicle.milage} km`} />
            <DetailItem icon={<BadgePercent />} label="Auction Price" value={`$${vehicle.auctionPrice}`} />
            <DetailItem icon={<Clock />} label="End Time" value={new Date(vehicle.endTime).toLocaleString()} />
            <DetailItem
              icon={vehicle.isActive ? <CircleCheck /> : <CircleX />}
              label="Status"
              value={vehicle.isActive ? "Active" : "Inactive"}
            />
            <DetailItem icon={<Info />} label="Plate" value={vehicle.plateNumber} />
            <DetailItem
              icon={<Clock />}
              label="Auction Countdown"
              value={<AuctionCountdown endTime={vehicle.endTime} />}
            />
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-700 dark:text-white mt-4 mb-1">Additional Info</h3>
            <p className="text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 p-3 rounded-md leading-relaxed">
              {vehicle.additionalInformation}
            </p>
          </div>
        </div>
      </div>

      {/* Teklifler */}
      <div className="w-full max-w-6xl mx-auto mt-10 px-4">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-2xl">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Hammer className="text-indigo-700 dark:text-indigo-400 w-6 h-6" />
            <h3 className="text-2xl font-semibold text-indigo-700 dark:text-indigo-400 text-center">
              {vehicle.brandAndModel} için teklifler
            </h3>
          </div>
            <BidDetails vehicleId={vehicle.vehicleId.toString()} />
        </div>
      </div>
    </>
  );
};

export default VehicleDetail;
