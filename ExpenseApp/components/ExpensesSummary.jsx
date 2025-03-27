import { StyleSheet, View, Text } from 'react-native';
import { GlobalStyles } from '../constants/styles';


export default function ExpensesSummary({expenses, periodName}) {

    const expensesSum = expenses 
        ? expenses.reduce((sum, expense) => sum + parseFloat(expense.amount), 0)
        : 0.00;

    return (
        <View style={styles.container}>
            <Text style={styles.period}>{periodName}</Text>
            <Text style={styles.sum}>${expensesSum.toFixed(2)}</Text>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        padding: 8,
        backgroundColor: GlobalStyles.colors.primary50,
        borderRadius: 6,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    period:{
        fontSize: 12,
        color: GlobalStyles.colors.primary400,
    },
    sum:{
        fontSize: 16,
        fontWeight: 'bold',
        color: GlobalStyles.colors.primary500
    },
});