import {View, ActivityIndicator, StyleSheet} from 'react-native';
import { GlobalStyles } from '../constants/styles';

export default function LoadingOverlay() {
    return (
        <View style={styles.overlay}>
            <ActivityIndicator size="large" color={GlobalStyles.colors.primary800} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
    },
})