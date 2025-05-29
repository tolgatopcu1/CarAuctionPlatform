import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { checkPaymentStatus, createPaymentHistory } from "./PaymentHistoryAPI";
import { getUserFromToken } from "../../utils/auth";
import { PaymentHistory } from "../../types/PaymentHistory";
import { CreatePaymentHistoryDTO } from "../../types/CreatePaymentHistoryDTO";

interface PaymentHistoryState {
  checkStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
  checkError: string | null;
  isPaymentDone: boolean; // <-- Ödeme yapıldı mı bilgisi
  history: PaymentHistory | null;

  postStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
  postError: string | null;
  createdHistory: PaymentHistory | null;
}

const initialState: PaymentHistoryState = {
  checkStatus: 'idle',
  checkError: null,
  isPaymentDone: false,
  history: null,

  postStatus: 'idle',
  postError: null,
  createdHistory: null,
};

// Ödeme kontrolü
export const checkPaymentHistory = createAsyncThunk(
  'paymentHistory/check',
  async (vehicleId: number, { rejectWithValue }) => {
    const user = getUserFromToken();

    if (!user || !user.nameid) {
      return rejectWithValue('Kullanıcı tokeni geçersiz veya bulunamadı.');
    }

    const response = await checkPaymentStatus({
      vehicleId,
      userId: user.nameid,
    });

    if (response.isSuccess && response.result) {
      return response.result;
    } else {
      return rejectWithValue(response.errorMessages?.join(', ') ?? 'Bilinmeyen hata.');
    }
  }
);

// Ödeme oluşturma
export const postPaymentHistory = createAsyncThunk(
  "paymentHistory/post",
  async (data: CreatePaymentHistoryDTO, { rejectWithValue }) => {
    try {
      const response = await createPaymentHistory(data);
      return response.result;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Hata oluştu.");
    }
  }
);

// Slice
const paymentHistorySlice = createSlice({
  name: "paymentHistory",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // ✅ Check Payment
      .addCase(checkPaymentHistory.pending, (state) => {
        state.checkStatus = "loading";
        state.checkError = null;
        state.isPaymentDone = false;
        state.history = null;
      })
      .addCase(checkPaymentHistory.fulfilled, (state, action) => {
        state.checkStatus = "succeeded";
        state.history = action.payload;
        state.isPaymentDone = true;
      })
      .addCase(checkPaymentHistory.rejected, (state, action) => {
        state.checkStatus = "failed";
        state.checkError = action.payload as string;
        state.history = null;
        state.isPaymentDone = false;
      })

      // ✅ Post Payment
      .addCase(postPaymentHistory.pending, (state) => {
        state.postStatus = "loading";
        state.postError = null;
      })
      .addCase(postPaymentHistory.fulfilled, (state, action) => {
        state.postStatus = "succeeded";
        state.createdHistory = action.payload;
        state.isPaymentDone = true; // <-- burada da ödeme yapılmış say
      })
      .addCase(postPaymentHistory.rejected, (state, action) => {
        state.postStatus = "failed";
        state.postError = action.payload as string;
        state.createdHistory = null;
      });
  },
});

export default paymentHistorySlice.reducer;
