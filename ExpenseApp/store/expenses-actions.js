// thunk actions 
import { expensesActions } from "./expenses-slice";
import { Alert } from "react-native";
import * as Yup from 'yup';
import request from "../API/Api";

const generateId = () => Math.random().toString(36).substr(2, 9);

const ExpenseActions = {}

const expenseSchema = Yup.object().shape({
    amount: Yup.number()
        .typeError("Amount must be a number")
        .positive("Amount must be greater than zero")
        .required("Amount is required"),
    date: Yup.date()
        .typeError("Date must be a valid date")
        .required("Date is required"),
    description: Yup.string()
        .trim()
        .required("Description is required"),
});

ExpenseActions.ValidateExpenseForm = () => {
    return async (dispatch, getState) => {
        const form = getState().expenses.expenseForm;
        try {
            // Validate the form using Yup.
            await expenseSchema.validate(form, { abortEarly: false });
            // Clear any previous errors.
            dispatch(expensesActions.setExpenseErrors({}));
            return true;
        } catch (err) {
            if (err instanceof Yup.ValidationError) {
                const errors = {};
                err.inner.forEach(error => {
                    errors[error.path] = error.message;
                });
                dispatch(expensesActions.setExpenseErrors(errors));
            }
            Alert.alert("Invalid Form",
                "Please correct the errors in the form.",
                [{ text: "OK" }] 
            );
            return false;
        }
    };
};

//  = = = = = = = = = = = = =  VERSION WHERE WE ONLY USE THE CLIENT = = = = = = = = = = = = = 

ExpenseActions.addExpenseThunk = ({ description, amount, date }) => {
    return async (dispatch, getState) => {
        const newExpense = {
            id: generateId(),
            description,
            amount,
            date,
        };
        const currentExpenses = getState().expenses.expenses;
        const updatedExpenses = [...currentExpenses, newExpense];
        dispatch(expensesActions.setExpenses(updatedExpenses));
    };
};

ExpenseActions.deleteExpenseThunk = (id) => {
    return async (dispatch, getState) => {
        const currentExpenses = getState().expenses.expenses;
        const updatedExpenses = currentExpenses.filter(exp => exp.id !== id);
        dispatch(expensesActions.setExpenses(updatedExpenses));
    };
};

ExpenseActions.updateExpenseThunk = (id, { description, amount, date }) => {
    return async (dispatch, getState) => {
        const currentExpenses = getState().expenses.expenses;
        const updatedExpenses = currentExpenses.map(exp =>
            exp.id === id
                ? { ...exp, description, amount, date }
                : exp
        );
        dispatch(expensesActions.setExpenses(updatedExpenses));
    };
};

//  = = = = = = = = = = = = =  VERSION WHERE WE USE THE API = = = = = = = = = = = = = 

ExpenseActions.storeExpense = () => {
    return async (dispatch, getState) => {
        const form = getState().expenses.expenseForm;
        console.log("form: ", form)
        const response = await request('post','Expenses/create/', form)
        if (response.status !== 200){
            console.error(response.data)
            Alert.alert("Error", "Could not store the expense", [{ text: "OK" }]);
            return
        }
        await dispatch(ExpenseActions.getExpenses())
    };
};

ExpenseActions.getExpenses = () => {
    return async (dispatch, getState) => {
        const response = await request('get','Expenses/get/')
        if (response.status !== 200){
            console.error(response.data)
            Alert.alert("Error", "Could not get the expenses.", [{ text: "OK" }]);
            return
        }
        
        dispatch(expensesActions.setExpenses(response.data));
    };
}

ExpenseActions.updateExpense = () => {
    return async (dispatch, getState) => {
        const form =  getState().expenses.expenseForm
        console.log("form update: ", form)
        const response = await request('put',`Expenses/update/${form.id}`, form)
        if (response.status !== 200){
            //console.error(response.data)
            return
        }
        await dispatch(ExpenseActions.getExpenses())
    };
}

ExpenseActions.deleteExpense = () => {
    return async (dispatch, getState) => {
        const form =  getState().expenses.expenseForm
        const response = await request('delete',`Expenses/delete/${form.id}`)
        if (response.status !== 200){
            //console.error(response.data)
            Alert.alert("Error", "Could not delete the expense", [{ text: "OK" }]);
            return
        }
        await dispatch(ExpenseActions.getExpenses())
    };
}



export default ExpenseActions