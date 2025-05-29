import React, { useState } from "react";
import { createBidThunk } from "../../features/bid/bidSlice";
import { getUserFromToken } from "../../utils/auth";
import { useAppDispatch } from "../../hooks/reduxHooks";

interface CreateBidProps {
  vehicleId: number;
  onBidCreated: () => void;
}



const CreateBid: React.FC<CreateBidProps> = ({ vehicleId, onBidCreated }) => {
  const dispatch = useAppDispatch();
  const user = getUserFromToken();

  const [bidAmount, setBidAmount] = useState<number>(0);
  const [formattedBid, setFormattedBid] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await dispatch(
        createBidThunk({
          bidAmount,
          vehicleId,
          userId: user?.nameid!,
        })
      ).unwrap();

      setSuccess(true);
      setBidAmount(0);
      setFormattedBid("");
      onBidCreated();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const formatNumberWithDots = (value: number) => {
    return new Intl.NumberFormat("tr-TR").format(value);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\./g, "");
    if (!/^\d*$/.test(raw)) return;

    const numericValue = Number(raw);
    setBidAmount(numericValue);
    setFormattedBid(formatNumberWithDots(numericValue));
  };



  return (
    <div className="bg-gray-50 dark:bg-gray-800 rounded-xl shadow p-6 mt-6">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
        Yeni Teklif Ver
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="bidAmount"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Teklif Tutarı
          </label>
          <input
            id="bidAmount"
            inputMode="numeric"
            value={formattedBid}
            onChange={handleInputChange}
            placeholder="Örn: 50.000"
            className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 dark:text-gray-100"
            required
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full flex justify-center items-center px-4 py-2 text-white font-semibold rounded-md transition-colors ${
            isLoading
              ? "bg-indigo-400 cursor-not-allowed"
              : "bg-indigo-600 hover:bg-indigo-700"
          }`}
        >
          {isLoading ? (
            <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
          ) : (
            "Teklif Ver"
          )}
        </button>
      </form>

      {success && (
        <div className="mt-3 text-sm text-green-600 dark:text-green-400">
          ✅ Teklif başarıyla verildi!
        </div>
      )}
      {error && (
        <div className="mt-3 text-sm text-red-600 dark:text-red-400">
          ❌ {error}
        </div>
      )}
    </div>
  );
};

export default CreateBid;
