import axios from "axios";
import { ApiResponse } from "../../types/ApiResponse";
import { CheckStatusRequest } from "../../types/CheckStatusRequest";
import { PaymentHistory } from "../../types/PaymentHistory";
import { CreatePaymentHistoryDTO } from "../../types/CreatePaymentHistoryDTO";

export const checkPaymentStatus = async (
  data: CheckStatusRequest
): Promise<ApiResponse<PaymentHistory>> => {
  try {
    const response = await axios.post<ApiResponse<PaymentHistory>>(
      'http://localhost:5139/api/PaymentHistory/CheckStatus',
      data
    );
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.data) {
      return error.response.data;
    }

    return {
      isSuccess: false,
      statusCode: 500,
      errorMessages: ['Ödeme durumu kontrol edilirken bir hata oluştu.'],
    };
  }
};

export const createPaymentHistory = async (data: CreatePaymentHistoryDTO) => {
  // camelCase'den PascalCase'e dönüştür
  const pascalCaseData = {
    ClientSecret: data.clientSecret,
    StripePaymentIntentId: data.stripePaymentIntentId,
    UserId: data.userId,
    VehicleId: data.vehicleId,
  };

  const response = await axios.post("http://localhost:5139/api/PaymentHistory/AddHistory", pascalCaseData);
  return response.data;
};