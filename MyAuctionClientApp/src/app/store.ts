import { configureStore } from "@reduxjs/toolkit";
import vehicleReducer from '../features/vehicles/vehicleSlice';
import accountReducer from '../features/account/accountSlice';
import bidReducer from '../features/bid/bidSlice';
import paymentHistoryReducer from '../features/paymentHistory/paymentHistorySlice';

export const store = configureStore({
    reducer: {
        vehicle: vehicleReducer,
        account: accountReducer,
        bids: bidReducer,
        paymentHistory: paymentHistoryReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;

