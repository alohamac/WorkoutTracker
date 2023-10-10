import React from 'react';
import { View as SafeAreaView, Text, Image, StyleSheet, useWindowDimensions } from "react-native";
import { useState } from 'react';
import LoginInput from '../../component/LoginInput';
import Logo from "../../../assets/images/garfield.png";
import CustomButton from '../../component/CustomButton';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    
    const {height} = useWindowDimensions();
    const navigation = useNavigation();    
    const onSignInPressed = async () => {
        const baseUrl = Platform.OS === 'android' ? '10.0.2.2' : 'localhost';

        const test = await fetch(`http://${baseUrl}:8080/users/logInUser/${username}/${password}`)
            .then(res=>res.json())
            .then(async (result)=>{
                await AsyncStorage.setItem('user', JSON.stringify(result));
                await AsyncStorage.setItem('username', JSON.stringify(result.username));
                await AsyncStorage.setItem('userid', JSON.stringify(result.token));
                navigation.navigate('Home')             
            }).catch((error)=>{
                console.log(error)
            })
        //navigation.navigate('Home');
    };
    return (
        <SafeAreaView style={styles.root}>
            <Image source={Logo} 
                   resizeMode='contain' 
                   style = {[styles.logo, {height: height * .3}]}/>

            <LoginInput placeholder="Username"
                        value={username}
                        setValue={setUsername}>
            </LoginInput >
            <LoginInput placeholder="Password"
                        value={password}
                        setValue={setPassword}
                        secureTextEntry={true}>
            </LoginInput>
            <CustomButton text="Log In" onPress={onSignInPressed}/>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    root: {
        alignItems: 'center',
        padding: 20,
        paddingTop: Platform.OS === 'ios' ? 40 : 0, // Add extra padding for iOS devices with notche
    },
    logo: {
        width: '70%',
        maxWidth: 300, 
        maxHeight: 200,
    },
});

export default LoginScreen; 