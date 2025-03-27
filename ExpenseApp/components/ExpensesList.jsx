import { StyleSheet, Text, View, FlatList } from 'react-native';
import ExpenseItem from './ExpenseItem';

export default function ExpensesList({expenses}) {

    return (
        <FlatList
            data={expenses}
            keyExtractor={item => item.id}
            renderItem={ ({item}) => {
                return(
                    <ExpenseItem {...item} />
                )

            }}
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