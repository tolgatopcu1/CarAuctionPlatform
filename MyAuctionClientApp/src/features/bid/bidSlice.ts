import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createBid, fetchBidsByVehicleId } from './BidAPI';
import { CreateBidModel } from '../../types/CreateBidModel';
import { ApiResponse } from '../../types/ApiResponse';
import axios from 'axios';

export interface Bid {
  bidAmount: number;
  bidDate: string;
  userId: string;
  vehicleId: number;
}

interface BidState {
  bids: Bid[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: BidState = {
  bids: [],
  status: 'idle',
  error: null
};

// ✅ Async thunk: belirli bir araca ait teklifleri getir
export const getBidsByVehicleId = createAsyncThunk(
  'bid/fetchBidsByVehicleId',
  async (vehicleId: string) => {
    return await fetchBidsByVehicleId(vehicleId);
  }
);


export const createBidThunk = createAsyncThunk(
  'bid/createBid',
  async (bidData: CreateBidModel, { rejectWithValue }) => {
    try {
      const response = await axios.post<ApiResponse<any>>(
        'http://localhost:5139/api/Bid/Create',
        bidData
      );

      if (!response.data.isSuccess) {
        return rejectWithValue(response.data.errorMessages?.join("\n") || "Teklif oluşturulamadı.");
      }

      return response.data;
    } catch (error: any) {
      const message = error.response?.data?.errorMessages?.join("\n") || error.message || "Sunucu hatası";
      return rejectWithValue(message);
    }
  }
);


// ✅ Slice
const bidSlice = createSlice({
  name: 'bids',
  initialState,
  reducers: {
     addBidRealtime: (state, action ) => {
    const exists = state.bids.some(
      (bid) =>
        bid.vehicleId === action.payload.vehicleId &&
        bid.userId === action.payload.userId &&
        bid.bidAmount === action.payload.bidAmount &&
        bid.bidDate === action.payload.bidDate
    );
    if (!exists) {
      state.bids.push(action.payload);
      state.bids.sort((a, b) => b.bidAmount - a.bidAmount);
    }
   },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBidsByVehicleId.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getBidsByVehicleId.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.bids = action.payload;
      })
      .addCase(getBidsByVehicleId.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Teklifler getirilemedi';
      })

      
      .addCase(createBidThunk.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createBidThunk.fulfilled, (state, action) => {
        state.status = 'succeeded';

        if (action.payload.isSuccess && action.payload.result) {
          const bid = {
            ...action.payload.result,
            bidDate: new Date().toISOString(),
          };
          state.bids.push(bid);
        }
      })
      .addCase(createBidThunk.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload as string ?? 'Teklif oluşturulamadı';
    });
      }
});

export const { addBidRealtime } = bidSlice.actions;
export default bidSlice.reducer;
