import axios from 'axios';
import { ApiResponse } from '../../types/ApiResponse';
import { Bid } from '../../types/Bid';
import { CreateBidModel } from '../../types/CreateBidModel';

// Bid tipi ve ApiResponse tipi senin projende tanımlı olmalı


export const fetchBidsByVehicleId = async (vehicleId: string): Promise<Bid[]> => {
  const response = await axios.get<ApiResponse<Bid[]>>(
    `http://localhost:5139/api/Bid/GetBidByVehicleId/${vehicleId}`
  );

  if (response.data.isSuccess) {
    return response.data.result ?? [];
  } else {
    throw new Error(
      'Teklifler alınamadı: ' + (response.data.errorMessages?.join(', ') || 'Bilinmeyen hata')
    );
  }
};


export const createBid = async (bidData: CreateBidModel): Promise<ApiResponse<any>> => {
  const response = await axios.post<ApiResponse<any>>(
    'http://localhost:5139/api/Bid/Create',
    bidData
  );
  return response.data;
};