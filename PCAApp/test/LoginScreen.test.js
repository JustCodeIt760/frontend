import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import LoginScreen from '../screens/LoginScreen';
import { NavigationContext } from '@react-navigation/native';

describe('LoginScreen', () => {
  it('navigates to ForgotPassword screen on button press', () => {
    const navigate = jest.fn();
    const navigation = { navigate };

    const { getByText } = render(
      <NavigationContext.Provider value={navigation}>
        <LoginScreen />
      </NavigationContext.Provider>
    );

    const forgotPasswordButton = getByText('Forgot Password?');
    fireEvent.press(forgotPasswordButton);

    expect(navigate).toHaveBeenCalledWith('ForgotPassword');
  });
});
