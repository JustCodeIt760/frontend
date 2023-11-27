import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import AuthForm from './AuthForm';

describe('AuthForm', () => {
  const mockSubmit = jest.fn();

  it('renders correctly', () => {
    const { getByText, getByPlaceholderText } = render(
      <AuthForm isLogin={true} onSubmit={mockSubmit} credentialsInvalid={{}} />
    );

    expect(getByText('Log In')).toBeTruthy();
  });

  it('submits entered credentials', () => {
    const { getByText, getByPlaceholderText } = render(
      <AuthForm isLogin={true} onSubmit={mockSubmit} credentialsInvalid={{}} />
    );

    fireEvent.changeText(getByPlaceholderText('Email'), 'test@example.com');
    fireEvent.changeText(getByPlaceholderText('Password'), 'password123');
    fireEvent.press(getByText('Log In'));

    expect(mockSubmit).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'password123',
      confirmPassword: '',
    });
  });
});