import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useState } from "react";
import { Vehicle } from "../../types/Vehicle";
import { getUserFromToken } from "../../utils/auth"; // Kullanıcının bilgilerini alıyoruz
import { useAppDispatch } from "../../hooks/reduxHooks";
import { CreatePaymentHistoryDTO } from "../../types/CreatePaymentHistoryDTO";
import { checkPaymentHistory, postPaymentHistory } from "./paymentHistorySlice";

interface CheckoutPageProps {
  vehicle: Vehicle;
  clientSecret: string;
}

export default function CheckoutPage({ vehicle, clientSecret }: CheckoutPageProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const user = getUserFromToken();

const dispatch = useAppDispatch();

const handleSubmit = async (event: React.FormEvent) => {
  event.preventDefault();
  setPaymentError(null);

  if (!stripe || !elements) return;

  const cardElement = elements.getElement(CardElement);
  if (!cardElement) return;

  setPaymentProcessing(true);

  const result = await stripe.confirmCardPayment(clientSecret, {
    payment_method: {
      card: cardElement,
      billing_details: {
        name: user?.FullName || "Bilinmeyen Kullanıcı",
        email: user?.email || undefined,
      },
    },
  });

  if (result.error) {
    setPaymentError(result.error.message ?? "Bilinmeyen hata");
    setPaymentProcessing(false);
  } else {
    if (result.paymentIntent?.status === "succeeded") {
      setPaymentSuccess(true);

      const dto: CreatePaymentHistoryDTO = {
        vehicleId: vehicle!.vehicleId,
        userId: user!.nameid,
        stripePaymentIntentId: result.paymentIntent.id,
        clientSecret: clientSecret, // Eğer varsa, yoksa null ya da undefined bırakabilirsin
      };

      // PascalCase'e dönüştür
      

      try {
        await dispatch(postPaymentHistory(dto)).unwrap();
        await dispatch(checkPaymentHistory(vehicle!.vehicleId));
      } catch (error) {
        console.error("Ödeme kaydı oluşturulurken hata:", error);
      }
    }
    setPaymentProcessing(false);
  }
};

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2 text-center">
          Ödeme yapılıyor: {vehicle.brandAndModel}
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 text-center mb-6">
          Açık Arttırmaya Katılmak İçin Hizmet Bedeli:{" "}
          <span className="font-medium text-indigo-600 dark:text-indigo-400">
            ${vehicle.auctionPrice}
          </span>
        </p>

        {/* Kullanıcı Bilgileri */}
        {user && (
          <div className="mb-4 text-sm text-gray-700 dark:text-gray-300 text-center">
            <p><span className="font-medium">Ad Soyad:</span> {user.FullName}</p>
            <p><span className="font-medium">Email:</span> {user.email}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700">
            <CardElement
              options={{
                style: {
                  base: {
                    fontSize: "16px",
                    color: "#ffffff",
                    "::placeholder": {
                      color: "#aab7c4",
                    },
                  },
                  invalid: {
                    color: "#ff6b6b",
                  },
                },
              }}
            />
          </div>

          <button
            type="submit"
            disabled={!stripe || paymentProcessing}
            className={`w-full py-2 px-4 rounded-full text-white text-sm font-medium transition-colors ${
              paymentProcessing
                ? "bg-indigo-400 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700"
            }`}
          >
            {paymentProcessing ? "Ödeme işleniyor..." : "Ödeme Yap"}
          </button>
        </form>

        {paymentError && (
          <div className="text-red-500 text-sm mt-4 text-center">{paymentError}</div>
        )}
        {paymentSuccess && (
          <div className="text-green-500 text-sm mt-4 text-center">
            Ödeme başarılı!
          </div>
        )}
      </div>
    </div>
  );
}
