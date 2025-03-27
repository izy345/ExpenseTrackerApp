import { View, Text, StyleSheet, TextInput } from 'react-native';
import { GlobalStyles } from '../../constants/styles';

export default function Input({label, style, textInputConfig, isError}){

    const InputStyles = [styles.input];

    if (textInputConfig && textInputConfig.multiline){
        InputStyles.push(styles.inputMultiline);
    }



    return(
        <View style={[styles.inputContainer, style]}>
            <Text style={styles.label}>{label}</Text>
            <TextInput
                style={[InputStyles, isError && styles.inputError]}
                {...textInputConfig}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    inputContainer:{
        marginHorizontal: 4,
        marginVertical: 16,
        
    },
    label:{
        fontSize: 16,
        color: GlobalStyles.colors.primary800,
        marginBottom: 4,
    },
    input:{
        backgroundColor: GlobalStyles.colors.primary100,
        color: GlobalStyles.colors.primary700,
        padding: 6,
        borderRadius: 6,
        fontSize: 18,
    },
    inputError:{
        backgroundColor: GlobalStyles.colors.error50,
    },
    inputMultiline:{
        minHeight: 100,
        textAlignVertical: 'top',
    }

})