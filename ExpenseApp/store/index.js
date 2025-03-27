import { configureStore } from '@reduxjs/toolkit';
import expensesSliceReducer from './expenses-slice';

export const store = configureStore({
    reducer: {
        expenses: expensesSliceReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});