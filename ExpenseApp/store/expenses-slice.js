import { createSlice } from "@reduxjs/toolkit";

const DUMMY_EXPENSES = [
    {id: 'e1', description: 'New Shoes', amount: 69.99, date: new Date(2021, 7, 14)},
    {id: 'e2', description: 'Groceries', amount: 16.53, date: new Date(2021, 7, 15)},
    {id: 'e3', description: 'New Shirt', amount: 69.99, date: new Date(2021, 7, 16)},
    {id: 'e4', description: 'Video Game', amount: 78.53, date: new Date(2021, 7, 17)},
    {id: 'e5', description: 'New Shoes', amount: 69.99, date: new Date(2021, 7, 18)},
    {id: 'e6', description: 'Fast Food', amount: 16.53, date: new Date(2021, 7, 19)},
    {id: 'e7', description: 'Gift', amount: 69.99, date: new Date(2021, 7, 20)},
    {id: 'e8', description: 'Park', amount: 78.53, date: new Date(2021, 7, 21)},
    {id: 'e9', description: 'Donation', amount: 10.00, date: new Date(2021, 7, 22)},
]

const expensesSlice = createSlice({
    name: 'expensesSlice',
    initialState: {
        expenses: DUMMY_EXPENSES, // defaults
        expenseForm: {},
        expenseErrors: {}
    },
    reducers: {
        setExpenses(state, action) {
            state.expenses = action.payload;
        },
        setExpenseForm(state, action) {
            state.expenseForm = action.payload;
        },
        setExpenseErrors(state, action) {
            state.expenseErrors = action.payload;
        }
    },
});

export const expensesActions = expensesSlice.actions;
export default expensesSlice.reducer;
