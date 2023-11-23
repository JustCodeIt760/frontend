import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import axios from '../util/api';
import { API_ENDPOINT } from '../constants/constants';

export default function ResetPasswordScreen({ route }) {
    const { uid, token } = route.params;
    const [newPassword, setNewPassword] = useState('');

    const resetPassword = async () => {
        try {
            await axios.post(`${API_ENDPOINT}/api/user/reset-password-confirm/`, { uid, token, newPassword });
            Alert.alert('Success', 'Your password has been reset.');
        } catch (error) {
            Alert.alert('Error', 'Failed to reset password.');
        }
    };

    return (
        <View>
            <Text>Enter your new password:</Text>
            <TextInput value={newPassword} onChangeText={setNewPassword} secureTextEntry />
            <Button title="Reset Password" onPress={resetPassword} />
        </View>
    );
}
