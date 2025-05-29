import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RegisterUser } from "../../types/RegisterUser";
import { fetchLoginUser, fetchRegisterUser } from "./accountApi";


interface AccountState {
    registerStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
    registerError: string | null;
    isRegistered: boolean;
}

const initialState: AccountState = {
    registerStatus: 'idle',
    registerError: null,
    isRegistered: false,
};

export const registerUser = createAsyncThunk('user/fetchRegisterUser', async (userData: RegisterUser, { rejectWithValue }) => {
    const response = await fetchRegisterUser(userData);
    if (response.isSuccess) {
      return response;
    } else {
      return rejectWithValue(response.errorMessages?.join(', ') ?? 'Unknown error');
    }
  }
)


export const loginUser = createAsyncThunk('user/fetchLoginUser', async (userData: RegisterUser, { rejectWithValue }) => {
    const response = await fetchLoginUser(userData);
    if (response.isSuccess) {
      return response;
    } else {
      return rejectWithValue(response.errorMessages?.join(', ') ?? 'Unknown error');
    }
  }
)

const accountSlice = createSlice({
    name: 'accounts',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.registerStatus = 'loading';
                state.registerError = null;
                state.isRegistered = false;
            })
            .addCase(registerUser.fulfilled, (state) => {
                state.registerStatus = 'succeeded';
                state.isRegistered = true;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.registerStatus = 'failed';
                state.registerError = action.payload as string;
                state.isRegistered = false;
            })

            .addCase(loginUser.pending, (state) => {
                state.registerStatus = 'loading';
                state.registerError = null;
                state.isRegistered = false;
            })
            .addCase(loginUser.fulfilled, (state) => {
                state.registerStatus = 'succeeded';
                state.isRegistered = true;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.registerStatus = 'failed';
                state.registerError = action.payload as string;
                state.isRegistered = false;
            });
    },
})

export default accountSlice.reducer;