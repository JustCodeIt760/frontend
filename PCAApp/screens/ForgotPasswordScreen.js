import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import axios from '../util/api';
import { API_ENDPOINT } from '../constants/constants';

export default function ForgotPasswordScreen() {
    const [email, setEmail] = useState('');

    const sendResetLink = async () => {
        try {
            // Correctly concatenate API_ENDPOINT with the endpoint path
            const response = await axios.post(`${API_ENDPOINT}/api/user/password-reset/`, { email });
            console.log("Password reset response:", response.data);
        } catch (error) {
            // Make sure to handle the case where error.response is undefined
            console.error("Error during password reset:", error.response ? error.response.data : error);
        }
    };


    return (
        <View>
            <Text>Enter your email address:</Text>
            <TextInput value={email} onChangeText={setEmail} />
            <Button title="Send Reset Link" onPress={sendResetLink} />
        </View>
    );
}
