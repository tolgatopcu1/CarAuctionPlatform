import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaSpinner } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { getVehiclesById } from "../vehicles/vehicleSlice";

export default function DeleteVehicle() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { selectedVehicle: vehicle, status } = useAppSelector((state) => state.vehicle);
  const [delayPassed, setDelayPassed] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (id) {
      dispatch(getVehiclesById(id));
    }

    const timer = setTimeout(() => setDelayPassed(true), 1000);
    return () => clearTimeout(timer);
  }, [id, dispatch]);

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await axios.delete(`http://localhost:5139/Vehicle/Remove/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      navigate("/admin/vehicle-list");
    } catch (err) {
      setError("Araç silinirken bir hata oluştu.");
      console.error(err);
    } finally {
      setDeleting(false);
    }
  };

  if (status === "loading" || !delayPassed) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] space-y-4">
        <FaSpinner className="animate-spin text-4xl text-indigo-600" />
        <p className="text-gray-600 text-lg">Yükleniyor...</p>
      </div>
    );
  }

  if (!vehicle) {
    return (
      <div className="text-center mt-20 text-red-600 dark:text-red-400 text-lg">
        Araç bulunamadı.
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-6">
      <div className="bg-white dark:bg-gray-800 shadow-xl rounded-xl p-8 max-w-md text-center">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">
          Aracı Sil
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-6">
          <span className="font-semibold text-indigo-600 dark:text-indigo-400">
            {vehicle.brandAndModel}
          </span>{" "}
          isimli aracı silmek istediğinizden emin misiniz?
        </p>
        {error && (
          <p className="text-sm text-red-500 mb-4">{error}</p>
        )}
        <div className="flex justify-center gap-4">
          <button
            onClick={() => navigate("/admin/vehicle-list")}
            className="px-4 py-2 bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded-md hover:bg-gray-400 transition"
          >
            Vazgeç
          </button>
          <button
            onClick={handleDelete}
            disabled={deleting}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition disabled:opacity-50"
          >
            {deleting ? "Siliniyor..." : "Sil"}
          </button>
        </div>
      </div>
    </div>
  );
}
