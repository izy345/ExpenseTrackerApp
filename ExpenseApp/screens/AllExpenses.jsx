import {View, Text, StyleSheet} from 'react-native';
import ExpensesList from '../components/ExpensesList';
import ExpensesOutput from '../components/ExpensesOutput';
import { useSelector } from 'react-redux';


export default function AllExpenses() {

    const expenses = useSelector(state => state.expenses.expenses);

    return (
        <ExpensesOutput
            expensesPeriod={'Total'}
            expenses={expenses}
            fallbackText={'No registered expenses'}
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