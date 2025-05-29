import React, { useEffect, useState, useRef } from "react"; // useRef eklendi
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { addBidRealtime, Bid, getBidsByVehicleId } from "./bidSlice";
import { checkPaymentHistory } from "../paymentHistory/paymentHistorySlice";
import { getUserFromToken } from "../../utils/auth";
import { useNavigate } from "react-router-dom";
import CreateBid from "./CreateBid";
import * as signalR from "@microsoft/signalr";
import { getVehiclesById } from "../vehicles/vehicleSlice";

interface BidDetailsProps {
  vehicleId: string;
}

interface BidDTO {
  vehicleId: number;
  bidAmount: number;
  userId: string;
  bidDate: string;
  bidStatus: string;
}

const BidDetails: React.FC<BidDetailsProps> = ({ vehicleId }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { bids, status, error } = useAppSelector((state) => state.bids);
  const { history, checkStatus } = useAppSelector((state) => state.paymentHistory);
  const user = getUserFromToken();

  const connectionRef = useRef<signalR.HubConnection | null>(null);

  const { selectedVehicle: vehicle, status: vehicleStatus } = useAppSelector(
    (state) => state.vehicle
  );

  const isVehicleOwner = vehicle?.sellerId === user?.nameid;

  useEffect(() => {
    dispatch(getBidsByVehicleId(vehicleId));
    console.log("getBidsByVehicleId useEffect çalıştı. Mevcut bids state:", bids);
    console.log("Mevcut bids status:", status);
  }, [dispatch, vehicleId]);

  useEffect(() => {
    if (vehicleId) {
      dispatch(checkPaymentHistory(Number(vehicleId)));
    }
  }, [dispatch, vehicleId]);

  useEffect(() => {
    if (vehicleId && (vehicleStatus === "idle" || vehicleStatus === "failed")) {
      dispatch(getVehiclesById(vehicleId));
    }
  }, [dispatch, vehicleId, vehicleStatus]);

  useEffect(() => {
    if (connectionRef.current) {
      return;
    }

    const newConnection = new signalR.HubConnectionBuilder()
      .withUrl("http://localhost:5139/BidUpdate/Hub", {
        accessTokenFactory: () => localStorage.getItem("token") || "",
      })
      .withAutomaticReconnect()
      .build();

    connectionRef.current = newConnection;

    newConnection.start()
      .then(() => {
        console.log("SignalR Connected.");
        newConnection.invoke("JoinVehicleGroup", vehicleId).catch((err) => console.error("Error joining group:", err));
      })
      .catch((err) => console.error("SignalR Connection Error: ", err));

    newConnection.on("ReceiveBid", (bid: BidDTO) => {
      if (Number(bid.vehicleId) === Number(vehicleId)) {
        dispatch(addBidRealtime({ ...bid, bidDate: new Date(bid.bidDate).toISOString() }));
      }
    });

    return () => {
      if (connectionRef.current) {
        connectionRef.current.stop().catch((err) => console.error("SignalR Disconnection Error: ", err));
        connectionRef.current = null;
      }
    };
  }, [dispatch, vehicleId]);

  useEffect(() => {
    console.log("Bids state güncellendi:", bids);
    console.log("Bids status güncellendi:", status);
    console.log("Bids error güncellendi:", error);
  }, [bids, status, error]);

  const isPaymentDone = !!history;

  return (
    <div className="w-full max-w-4xl mx-auto mt-4 px-4">
      {/* Teklif oluşturma alanı */}
      <div className="mb-6">
        {!user ? (
          <div className="text-center text-red-500 font-medium">
            Açık artırmaya katılmak için giriş yapmalısınız.
          </div>
        ) : vehicleStatus === "loading" ? ( // Araç detayları yüklenirken
          <div className="text-center text-gray-600">Araç detayları yükleniyor...</div>
        ) : isVehicleOwner ? ( // Araç sahibi ise
          <div className="text-center text-red-600 font-medium">
            Siz bu aracın sahibi olduğunuz için teklif veremezsiniz.
          </div>
        ) : checkStatus === "loading" ? ( // Ödeme durumu kontrol edilirken
          <div className="text-center text-gray-600">Ödeme durumu kontrol ediliyor...</div>
        ) : !isPaymentDone ? ( // Ödeme yapılmadıysa
          <div className="text-center text-yellow-600 font-medium">
            Açık artırmaya katılmak için ödeme yapmalısınız.
            <button
              onClick={() => navigate(`/payment/${vehicleId}`)}
              className="mt-2 bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded"
            >
              Ödeme Yap
            </button>
          </div>
        ) : (
          <CreateBid
            vehicleId={Number(vehicleId)}
            onBidCreated={() => dispatch(getBidsByVehicleId(vehicleId))}
          />
        )}
      </div>

      {/* Teklif listesi */}
      {status === "loading" ? (
        <div className="flex justify-center items-center h-[20vh]">
          <div className="animate-spin rounded-full h-8 w-8 border-4 border-indigo-600 border-t-transparent"></div>
        </div>
      ) : status === "failed" ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : bids.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-400">Henüz teklif yok.</p>
      ) : (
        <div className="bg-gray-50 dark:bg-gray-800 rounded-xl shadow divide-y divide-gray-300 dark:divide-gray-700 overflow-hidden">
          {[...bids]
            .sort((a, b) => b.bidAmount - a.bidAmount)
            .map((bid: Bid) => (
              <div
                key={bid.bidDate + bid.userId}
                className="p-4 flex flex-col sm:flex-row sm:justify-between sm:items-center"
              >
                <div>
                  <h4 className="text-lg font-semibold text-indigo-700 dark:text-indigo-400">
                    ₺{bid.bidAmount.toLocaleString("en-US")}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {new Date(bid.bidDate).toLocaleString()}
                  </p>
                </div>
                <div className="mt-2 sm:mt-0 text-sm text-gray-600 dark:text-gray-400">
                  Kullanıcı ID: <span className="font-medium">{bid.userId}</span>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default BidDetails;