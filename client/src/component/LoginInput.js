import React from "react";
import { TextInput, View, StyleSheet, Dimensions } from "react-native";

const LoginInput = ({value, setValue, placeholder, secureTextEntry}) =>{
    return(
        <View style={styles.container}>
        <TextInput value={value}
                   onChangeText={setValue}
                   placeholder={placeholder}
                   secureTextEntry={secureTextEntry}
                   autoCapitalize='none'>

        </TextInput>
        </View>
    );
}
const windowWidth = Dimensions.get("window").width;
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderColor: '#e8e8e8',
    borderWidth: 1,
    borderRadius: 16,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',

    width: '100%',

    padding: 15,
    marginVertical: 5,

    alignItems: 'center',
  }
});

export default LoginInput;