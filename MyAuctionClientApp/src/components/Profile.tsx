import { useEffect, useState } from "react";
import axios from "axios";
import { getUserFromToken } from "../utils/auth";
import { FaCar, FaGavel } from "react-icons/fa";
import { Link } from "react-router-dom";

interface VehicleItem {
  vehicleId: number;
  brandAndModel: string;
  color: string;
  manufacturingYear: number;
  price: number;
  isActive: boolean;
}

interface BidItem {
  bidId: number;
  bidAmount: number;
  bidDate: string;
  bidStatus: string;
  vehicleId: number;
  vehicleBrandAndModel: string;
  isActive: boolean;
}

export default function Profile() {
  const user = getUserFromToken();
  const [activeTab, setActiveTab] = useState<"vehicles" | "bids">("vehicles");
  const [vehicles, setVehicles] = useState<VehicleItem[]>([]);
  const [bids, setBids] = useState<BidItem[]>([]);
  const [highestBidsMap, setHighestBidsMap] = useState<Record<number, number>>({});
  const [selectedVehicleId, setSelectedVehicleId] = useState<number | null>(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  useEffect(() => {
    if (!user) return;

    const fetchData = async () => {
      try {
        const url =
          activeTab === "vehicles"
            ? `http://localhost:5139/Vehicle/GetVehiclesByUserId/${user.nameid}`
            : `http://localhost:5139/api/Bid/GetBidsByUserId/${user.nameid}`;
        const res = await axios.get(url);

        if (res.data.isSuccess) {
          activeTab === "vehicles" ? setVehicles(res.data.result) : setBids(res.data.result);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [activeTab]);

  useEffect(() => {
    const fetchHighestBids = async () => {
      const results: Record<number, number> = {};
      const vehicleIds =
        activeTab === "vehicles"
          ? vehicles.map((v) => v.vehicleId)
          : [...new Set(bids.map((b) => b.vehicleId))];

      await Promise.all(
        vehicleIds.map(async (vehicleId) => {
          try {
            const res = await axios.get(
              `http://localhost:5139/api/Bid/GetHighestBidByVehicleId/${vehicleId}`
            );
            const highestBid = res.data.result;

            if (res.data.isSuccess && highestBid?.amount > 0) {
              results[vehicleId] = highestBid.amount;
            }
          } catch (error) {
            console.error(`Araç ${vehicleId} için teklif alınamadı`, error);
          }
        })
      );

      setHighestBidsMap(results);
    };

    if (
      (activeTab === "vehicles" && vehicles.length > 0) ||
      (activeTab === "bids" && bids.length > 0)
    ) {
      fetchHighestBids();
    }
  }, [vehicles, bids, activeTab]);


  if (!user) return <p className="text-center mt-10">Kullanıcı bilgisi bulunamadı.</p>;

  return (
    <div className="max-w-6xl mx-auto p-6 mt-20 bg-white dark:bg-gray-900 rounded shadow relative">
      {/* Header */}
      <div className="mb-6 border-b pb-4">
        <h1 className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">{user.FullName}</h1>
        <p className="text-gray-600 dark:text-gray-300">{user.email}</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 mb-6">
        {[
          { tab: "vehicles", icon: <FaCar />, label: "Araçlarım" },
          { tab: "bids", icon: <FaGavel />, label: "Tekliflerim" },
        ].map(({ tab, icon, label }) => (
          <button
            key={tab}
            className={`px-4 py-2 rounded font-semibold flex items-center gap-2 ${
              activeTab === tab
                ? "bg-indigo-600 text-white"
                : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
            }`}
            onClick={() => setActiveTab(tab as "vehicles" | "bids")}
          >
            {icon} {label}
          </button>
        ))}
      </div>

      {/* Vehicles Section */}
      {activeTab === "vehicles" && (
        <div>
          {vehicles.length === 0 ? (
            <p className="text-gray-500">Henüz araç eklememişsiniz.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto border border-gray-300 dark:border-gray-700 text-sm">
                <thead className="bg-gray-100 dark:bg-gray-800 text-left text-gray-600 dark:text-gray-300">
                  <tr>
                    <th className="p-3">Araç</th>
                    <th className="p-3">Renk</th>
                    <th className="p-3">Yıl</th>
                    <th className="p-3">Açılış Fiyatı</th>
                    <th className="p-3">En Yüksek Teklif</th>
                    <th className="p-3">Durum</th>
                    <th className="p-3">Detay</th>
                    <th className="p-3">Aracımı Sat</th>
                  </tr>
                </thead>
                <tbody>
                  {vehicles.map((vehicle) => (
                    <tr key={vehicle.vehicleId} className="border-t border-gray-200 dark:border-gray-700">
                      <td className="p-3 font-semibold text-gray-800 dark:text-white">{vehicle.brandAndModel}</td>
                      <td className="p-3 text-gray-700 dark:text-gray-300">{vehicle.color}</td>
                      <td className="p-3 text-gray-700 dark:text-gray-300">{vehicle.manufacturingYear}</td>
                      <td className="p-3 text-gray-700 dark:text-gray-300">
                        {new Intl.NumberFormat("tr-TR").format(vehicle.price)} ₺
                      </td>
                      <td className="p-3 text-gray-700 dark:text-gray-300">
                        {highestBidsMap[vehicle.vehicleId] !== undefined
                          ? `${new Intl.NumberFormat("tr-TR").format(highestBidsMap[vehicle.vehicleId])} ₺`
                          : "Teklif yok"}
                      </td>
                      <td className="p-3 font-medium">
                        <span className={vehicle.isActive ? "text-green-600" : "text-red-600"}>
                          {vehicle.isActive ? "Aktif" : "Pasif"}
                        </span>
                      </td>
                      <td className="p-3">
                        <Link
                          to={`/vehicles/${vehicle.vehicleId}`}
                          className="text-indigo-600 hover:underline dark:text-indigo-400"
                        >
                          Detay
                        </Link>
                      </td>
                      <td className="p-3">
  {vehicle.isActive === false && highestBidsMap[vehicle.vehicleId] !== undefined ? (
    <button
      onClick={() => {
        setSelectedVehicleId(vehicle.vehicleId);
        setShowConfirmModal(true);
      }}
      className="px-3 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
    >
      Aracımı Sat
    </button>
  ) : (
    <span className="text-gray-400 text-sm">Şartlar Uyuşmuyor</span>
  )}
</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Bids Section */}
      {activeTab === "bids" && (
        <div>
          {bids.length === 0 ? (
            <p className="text-gray-500">Henüz teklif vermemişsiniz.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto border border-gray-300 dark:border-gray-700 text-sm">
                <thead className="bg-gray-100 dark:bg-gray-800 text-left text-gray-600 dark:text-gray-300">
                  <tr>
                    <th className="p-3">Araç</th>
                    <th className="p-3">Teklif Tutarınız</th>
                    <th className="p-3">Anlık En Yüksek Teklif</th>
                    <th className="p-3">Teklif Tarihiniz</th>
                    <th className="p-3">Açık Arttırma Durumu</th>
                    <th className="p-3">Detay</th>
                  </tr>
                </thead>
                <tbody>
                  {[...bids]
                    .sort((a, b) => new Date(b.bidDate).getTime() - new Date(a.bidDate).getTime())
                    .map((bid) => (
                      <tr key={bid.bidId} className="border-t border-gray-200 dark:border-gray-700">
                        <td className="p-3 font-semibold text-gray-800 dark:text-white">
                          {bid.vehicleBrandAndModel ?? "Araç Bilgisi Yok"}
                        </td>
                        <td className="p-3 text-gray-700 dark:text-gray-300">
                          {new Intl.NumberFormat("tr-TR").format(bid.bidAmount)} ₺
                        </td>
                        <td className="p-3 text-gray-700 dark:text-gray-300">
                          {highestBidsMap[bid.vehicleId] == null
                            ? "Teklif yok"
                            : `${new Intl.NumberFormat("tr-TR").format(highestBidsMap[bid.vehicleId])} ₺`}
                        </td>
                        <td className="p-3 text-gray-700 dark:text-gray-300">
                          {new Date(bid.bidDate).toLocaleString("tr-TR", {
                            day: "2-digit",
                            month: "long",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </td>
                        <td className="p-3 font-medium">
                          <span className={bid.isActive ? "text-green-600" : "text-red-600"}>
                            {bid.isActive ? "Devam Ediyor" : "Bitti"}
                          </span>
                        </td>
                        <td className="p-3">
                          <Link
                            to={`/vehicles/${bid.vehicleId}`}
                            className="text-indigo-600 hover:underline dark:text-indigo-400"
                          >
                            Detay
                          </Link>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {showConfirmModal && selectedVehicleId !== null && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white dark:bg-gray-800 p-6 rounded shadow max-w-md w-full">
      <h2 className="text-lg font-bold mb-4 text-gray-800 dark:text-gray-100">Satışı Onayla</h2>
      <p className="mb-4 text-gray-700 dark:text-gray-300">
        En yüksek teklif:{" "}
        <strong>
          {new Intl.NumberFormat("tr-TR").format(highestBidsMap[selectedVehicleId])} ₺
        </strong>
      </p>
      <p className="mb-4 text-gray-700 dark:text-gray-300">Bu aracı satmak istediğinizden emin misiniz?</p>
      <div className="flex justify-end gap-3">
        <button
          onClick={() => {
            setShowConfirmModal(false);
            setSelectedVehicleId(null);
          }}
          className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 dark:bg-gray-600 dark:text-white"
        >
          Vazgeç
        </button>
        <button
          onClick={() => {
            setShowConfirmModal(false);
            setShowSuccessModal(true);
            // Burada isteğe bağlı olarak bir "satış işlemi" API isteği yapılabilir
          }}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Evet, Eminim
        </button>
      </div>
    </div>
  </div>
)}

      {showSuccessModal && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white dark:bg-gray-800 p-6 rounded shadow max-w-md w-full text-center">
      <h2 className="text-lg font-bold mb-4 text-green-600 dark:text-green-400">
        Tebrik ederiz!
      </h2>
      <p className="mb-4 text-gray-700 dark:text-gray-300">
        Aracınız başarıyla satış işlemlerine alınmıştır.
        <br />
        Ekibimiz sizinle en kısa sürede iletişime geçecektir.
      </p>
      <button
        onClick={() => {
          setShowSuccessModal(false);
          setSelectedVehicleId(null);
        }}
        className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
      >
        Profilime Dön
      </button>
    </div>
  </div>
)}
    </div>
  );
}
