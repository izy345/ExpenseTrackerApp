import { useLayoutEffect } from 'react';
import {View, Text, StyleSheet} from 'react-native';
import IconButton from '../UI/IconButton';
import { GlobalStyles } from '../constants/styles';
import Button from '../UI/Button';
import { useDispatch } from 'react-redux';
import ExpenseActions from '../store/expenses-actions';
import ExpenseForm from '../components/ManageExpense/ExpenseForm';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import LoadingOverlay from '../UI/LoadingOverlay';


export default function ManageExpense({route, navigation}) {

    const[ loading, setLoading ] = useState(false)

    const dispatch = useDispatch()

    const form = useSelector(state => state.expenses.expenseForm)


    const editedExpenseId = route.params?.expenseId

    const isEditing = !!editedExpenseId // !! converts to boolean

    useLayoutEffect(() => {
        navigation.setOptions({
            title: isEditing ? 'Edit Expense' : 'Add Expense',
        })
        
    }, [navigation, isEditing])

    const deleteExpenseHandler = async () => {
        setLoading(true)
        // v v IDE does not recognize promise. However, it is indeed awaiting. 
        //await dispatch(ExpenseActions.deleteExpenseThunk(editedExpenseId))
        await dispatch(ExpenseActions.deleteExpense())
        setLoading(false)
        navigation.goBack()
    }

    const cancelHandler = () => {
        navigation.goBack()
    }

    const confirmHandler = async () => {
        setLoading(true)
        // note: commented out code is the client version of saving, editing, deleting, etc.
        if (!await dispatch(ExpenseActions.ValidateExpenseForm())) { setLoading(false); return }
        // since this is a thunk, we don't actually need to send these vars since they are redux states..
        // But we can use params to make the code more readable.
        //const description = form.description
        //const amount = parseInt(form.amount)
        //const date = new Date(form.date)
        if (isEditing) {
            /*await dispatch(ExpenseActions.updateExpenseThunk(
                editedExpenseId,
                {description, amount, date}
            ))*/
            console.log('[ManageExpense]', form)
            await dispatch(ExpenseActions.updateExpense())
            setLoading(false)
            navigation.goBack()
            return
        }
        /*await dispatch(ExpenseActions.addExpenseThunk({
            description,
            amount,
            date,
        }))*/
        await dispatch(ExpenseActions.storeExpense())
        setLoading(false)
        navigation.goBack()
    }


    return (
        <>
            { loading && <LoadingOverlay/> }
            <View style={styles.container}>
                <ExpenseForm />
                <View style={styles.buttons}>
                    <Button
                        style={styles.buttonItem}
                        mode='flat'
                        onPress={ () => cancelHandler() }
                    >
                        Cancel
                    </Button>
                    <Button
                        style={styles.buttonItem}
                        onPress={ () => confirmHandler() }
                    >
                        { isEditing ? 'Update' : 'Add' }
                    </Button>
                </View>
                { isEditing && 
                <View style={styles.deleteContainer}>
                        <IconButton
                        icon='trash'
                        size={36}
                        color={GlobalStyles.colors.error500}
                        onPress={ () => deleteExpenseHandler() }
                        /> 
                    
                </View>
                }
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,

    },
    buttons:{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonItem:{
        minWidth: 100,
        marginHorizontal: 8,
    },
    deleteContainer:{
        marginTop: 16,
        paddingTop: 8,
        borderTopWidth: 2,
        borderTopColor: GlobalStyles.colors.error500,
        alignItems: 'center', // center horizontally
    }
});