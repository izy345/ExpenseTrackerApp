import {View, Text, StyleSheet} from 'react-native';
import ExpensesSummary from './ExpensesSummary';
import ExpensesList from './ExpensesList';
import { GlobalStyles } from '../constants/styles';

export default function ExpensesOutput({expenses, expensesPeriod, fallbackText}) {

    return (
        <View style={styles.container}>
            <ExpensesSummary expenses={expenses} periodName={expensesPeriod} />
            { expenses.length > 0 ?
                <ExpensesList expenses={expenses} />
                :
                <Text style={styles.infoText}>{fallbackText}</Text>
            }
        </View> 
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 24,
        paddingHorizontal: 24,
    },
    infoText:{
        color:'black',
        fontSize: 16,
        textAlign: 'center',
        marginTop: 32,
    }
});
