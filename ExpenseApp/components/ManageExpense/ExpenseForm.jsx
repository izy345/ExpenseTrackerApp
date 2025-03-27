import { View, Text, StyleSheet } from 'react-native';
import Input from './Input';
import { useSelector } from 'react-redux';
import { expensesActions } from '../../store/expenses-slice';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { GlobalStyles } from '../../constants/styles';

export default function ExpenseForm(){

    const dispatch = useDispatch();

    const form = useSelector(state => state.expenses.expenseForm);

    const Errors = useSelector(state => state.expenses.expenseErrors);

    
    const handleInputChange = (field, value) => {
        dispatch(expensesActions.setExpenseForm({
            ...form,
            [field]: value
        }))
    }

    useEffect(() => {
        return () => {
            dispatch(expensesActions.setExpenseForm({}))
            dispatch(expensesActions.setExpenseErrors({}))
        }
    }, [])

    return(
        <View style={styles.form}>
            <Text style={styles.title}>Your Expense</Text>
            <View style={styles.amountDateContainer}>
                <Input
                    label="Amount"
                    style={styles.rowInput}
                    isError={Errors.amount}
                    textInputConfig={{
                        keyboardType: 'decimal-pad',
                        value: form.amount ?? '' ,
                        onChangeText: (value) => handleInputChange('amount', value),
                    }}
                />
                <Input
                    label="Date"
                    style={styles.rowInput}
                    isError={Errors.date}
                    textInputConfig={{
                        placeholder: 'YYYY-MM-DD',
                        maxLength: 10,
                        value: form.date ?? '' ,
                        onChangeText: (value) => handleInputChange('date', value)
                    }}
                />
            </View>
            <Input
                label="Description"
                isError={Errors.description}
                textInputConfig={{
                    multiline: true,
                    //autocCorrect: false,
                    // autoCapitalize: 'none',
                    // v android specific
                    numberOfLines: 4,
                    value: form.description ?? '' ,
                    onChangeText: (value) => handleInputChange('description', value)
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    form:{

        marginTop: 10,
    },
    title:{
        fontSize: 24,
        fontWeight: 'bold',
    },
    amountDateContainer:{
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    rowInput:{
        flex: 1,
    },

})