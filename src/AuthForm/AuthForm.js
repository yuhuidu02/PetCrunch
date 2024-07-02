import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { login, signup, authenticate, logout } from '../actions/authentication';

function AuthForm({ onLoginSuccess }) {
    const navigation = useNavigation();
    
    const dispatch = useDispatch();
    const [isLogin, setIsLogin] = useState(true);
    const [formValues, setFormValues] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const onSubmit = () => {
        console.log("onSubmit", formValues);
        if (isLogin) {
            dispatch(login(formValues, () => {
                onLoginSuccess();
                navigation.navigate('Home');
            }));
        } else {
            dispatch(signup(formValues, () => {
                onLoginSuccess();
                navigation.navigate('Home');
            }));
        }
    }

    const switchMode = () => {
        setIsLogin(prevIsLogin => !prevIsLogin);   
    }

    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <Text style={styles.title}>{isLogin ? 'Login' : 'Sign Up'}</Text>
                {!isLogin && (
                    <TextInput
                        style={styles.input}
                        placeholder="Username"
                        value={formValues.username}
                        onChangeText={text => setFormValues({ ...formValues, username: text })}
                    />
                )}
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    value={formValues.email}
                    onChangeText={text => setFormValues({ ...formValues, email: text })}
                    keyboardType="email-address"
                    autoCapitalize='none'
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    value={formValues.password}
                    onChangeText={text => setFormValues({ ...formValues, password: text })}
                    secureTextEntry
                />
                {!isLogin && (
                    <TextInput
                        style={styles.input}
                        placeholder="Confirm Password"
                        value={formValues.confirmPassword}
                        onChangeText={text => setFormValues({ ...formValues, confirmPassword: text })}
                        secureTextEntry
                    />
                )}
                <Button title={isLogin ? 'Login' : 'Sign Up'} onPress={onSubmit} />
                <View style={styles.switchContainer}>
                    <Text>{isLogin ? 'Or' : 'Have an account?'}</Text>
                    <TouchableOpacity onPress={switchMode}>
                        <Text style={styles.switchText}>{isLogin ? 'Sign Up' : 'Login'}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f2f5',
    },
    card: {
        backgroundColor: '#fff',
        padding: 40,
        borderRadius: 8,
        width: '90%',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 8,
        elevation: 5,
    },
    title: {
        fontSize: 20,
        textAlign: 'center',
        marginBottom: 10,
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 4,
        paddingLeft: 10,
        marginBottom: 10,
    }, 
    switchContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    switchText: {
        color: '#007bff',
        marginLeft: 5,
    },
});

export default AuthForm;