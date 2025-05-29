import axios from "axios";
import { Vehicle } from "../../types/Vehicle";
import { ApiResponse } from "../../types/ApiResponse";

export const fetchVehicles = async (): Promise<Vehicle[]> => {
    const response = await axios.get<ApiResponse<Vehicle[]>>('http://localhost:5139/Vehicle/GetVehicles');
    
    if (response.data.isSuccess) {
      return response.data.result!;
    }
    else {
      throw new Error('Veri alınamadı');
    }
  };


export const fetchVehicleById = async (id:string): Promise<Vehicle> => {
  const response = await axios.get<ApiResponse<Vehicle>>('http://localhost:5139/Vehicle/' + id);

  if (response.data.isSuccess) {
    return response.data.result!;
  }
  else {
    throw new Error('Veri alınamadı');
  }
}