import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Vehicle } from "../../types/Vehicle";
import { fetchVehicleById, fetchVehicles } from "./vehicleAPI";

interface VehicleState {
    vehicles: Vehicle[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null; 
    selectedVehicle: Vehicle | null
}

const initialState: VehicleState = {
    vehicles: [],
    status: 'idle',
    error: null,
    selectedVehicle: null
}

export const getVehicles = createAsyncThunk('vehicle/fetchVehicles', async () =>{
        return await fetchVehicles();
    }
)

export const getVehiclesById = createAsyncThunk('vehicle/fetchVehicleById', async (id:string)=>{
        return await fetchVehicleById(id);
    }
)

const vehicleSlice = createSlice({
    name: 'vehicles',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
          .addCase(getVehicles.pending, (state: VehicleState) => {
            state.status = 'loading';
          })
          .addCase(getVehicles.fulfilled, (state: VehicleState, action) => {
            state.status = 'succeeded';
            state.vehicles = action.payload;
          })
          .addCase(getVehicles.rejected, (state: VehicleState, action) => {
            state.status = 'failed';
            state.error = action.error.message ?? 'Failed to fetch vehicles';
          })
      
          .addCase(getVehiclesById.pending, (state: VehicleState) => {
            state.status = 'loading';
          })
          .addCase(getVehiclesById.fulfilled, (state: VehicleState, action) => {
            state.status = 'succeeded';
            state.selectedVehicle = action.payload;
          })
          .addCase(getVehiclesById.rejected, (state: VehicleState, action) => {
            state.status = 'failed';
            state.error = action.error.message ?? 'Failed to fetch vehicle';
          });
      }
      
})

export default vehicleSlice.reducer;