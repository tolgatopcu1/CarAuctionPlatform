import { Elements } from "@stripe/react-stripe-js";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { fetchVehicleById } from "../vehicles/vehicleAPI";
import { Vehicle } from "../../types/Vehicle";
import { getUserFromToken } from "../../utils/auth";
import axios from "axios";
import CheckoutPage from "./CheckoutForm";

const stripePromise = loadStripe(
  "pk_test_51RJgwx2fN94IAOI43ZK47DVHMCt7jtprcoik1Xd51VeDhmY0S2WsL5agAtnKWpv3ZWRmDVAGTB4tZbNdcduksA7B00p3WKGJK1"
);

export default function CheckoutWrapper() {
  const { vehicleId } = useParams();
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Reset state on vehicleId change
    setClientSecret(null);
    setVehicle(null);
    setError(null);
    setLoading(true);

    const initPayment = async () => {
      if (!vehicleId) {
        setError("Araç ID bulunamadı");
        setLoading(false);
        return;
      }

      try {
        const v = await fetchVehicleById(vehicleId);
        setVehicle(v);

        const user = getUserFromToken();
        if (!user) throw new Error("Kullanıcı doğrulanamadı");

        const response = await axios.post(
          `http://localhost:5139/api/Payment/Pay?userId=${user.nameid}&vehicleId=${vehicleId}`
        );

        if (response.data.isSuccess && response.data.result?.clientSecret) {
          setClientSecret(response.data.result.clientSecret);
        } else {
          throw new Error("Ödeme başlatılamadı");
        }
      } catch (err: any) {
        console.error(err);
        setError(err.message || "Bilinmeyen bir hata oluştu");
      } finally {
        setLoading(false);
      }
    };

    initPayment();
  }, [vehicleId]);

  if (loading) {
    return <div>Yükleniyor...</div>;
  }

  if (error) {
    return <div style={{ color: "red" }}>Hata: {error}</div>;
  }

  if (!clientSecret || !vehicle) {
    // Buraya genelde loading koymak mantıklı, ama zaten loading false ise ve yoksa hata demektir.
    return <div>Ödeme bilgileri bulunamadı.</div>;
  }

  return (
    <Elements stripe={stripePromise} options={{ clientSecret }}>
      <CheckoutPage vehicle={vehicle} clientSecret={clientSecret} />
    </Elements>
  );
}
