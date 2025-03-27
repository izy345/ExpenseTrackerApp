import {View, Text, StyleSheet} from 'react-native';
import ExpensesOutput from '../components/ExpensesOutput';
import { useSelector } from 'react-redux';
import { getDateMinusDays } from '../util/date';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import ExpenseActions from '../store/expenses-actions';
import { useState } from 'react';
import LoadingOverlay from '../UI/LoadingOverlay';
// import { useFocusEffect } from '@react-navigation/native';

export default function RecentExpenses() {

    const [loading, setLoading] = useState(true)

    const dispatch = useDispatch()

    const expenses = useSelector(state => state.expenses.expenses)
    

    useEffect(() => {
        const getExpenses = async () => {
            await dispatch(ExpenseActions.getExpenses())
            setLoading(false)
        }
        getExpenses()
    },[])


    const recentExpenses = expenses.filter(expense => {
        const today = new Date();
        const dateObj = new Date  (expense.date)
        const date7DaysAgo = getDateMinusDays(today, 7);
        return dateObj >= date7DaysAgo;
    }
    );

    if (loading) { return <LoadingOverlay/> }

    return (
        <ExpensesOutput
            expensesPeriod={'Last 7 Days'}
            expenses={recentExpenses}
            fallbackText={'No expenses in the last 7 days'}
        />
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});