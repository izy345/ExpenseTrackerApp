import { View, Text, Pressable, StyleSheet} from 'react-native';
import { GlobalStyles } from '../constants/styles';
import { getFormattedDate } from '../util/date';
import { useNavigation } from '@react-navigation/native';
import { expensesActions } from '../store/expenses-slice';
import { useDispatch } from 'react-redux';

export default function ExpenseItem({id, description, amount, date}) {

    const dispatch = useDispatch();

    const navigation = useNavigation();

    const expensePressHandler = () => {
        const formattedDate = getFormattedDate(date);
        console.log("amount: ", amount);
        dispatch(expensesActions.setExpenseForm({
            id: id,
            description,
            amount: amount,
            date: formattedDate
        }
        ))
        navigation.navigate('ManageExpense', {
            expenseId: id,
        });
    }

    return (
        <Pressable
            style={ ({pressed}) => pressed && styles.pressed }
            android_ripple={{color: 'white'}}
            onPress={ () => expensePressHandler() }
        >
        <View style={styles.item}>
            <View>
                <Text style={[styles.textBase, styles.description]}>{description}</Text>
                <Text style={styles.textBase}>{getFormattedDate(date)}</Text>
            </View>
            <View style={styles.amountContainer}>
                <Text style={styles.amount}>{amount}</Text>
            </View>
        </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    pressed:{

        opacity: 0.75,
    },
    item:{
        padding: 12,
        marginVertical: 8,
        backgroundColor: GlobalStyles.colors.primary500,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderRadius: 6,
        // android shadow
        elevation: 3,
        // ios shadow
        shadowColor: GlobalStyles.colors.primary500,
        shadowOffset: {width: 1, height: 1},
        shadowOpacity: 0.4,
    },
    textBase:{
        color: 'white',
    },
    description:{
        fontSize: 16,
        fontWeight: 'bold',
        maerginBottom: 4,
    },
    amountContainer:{
        paddingHorizontal: 12,
        paddingVertical: 4,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        minWidth: 80,
    },
    amount:{
        colors: GlobalStyles.colors.primary500,
        fontWeight: 'bold',
    }
});