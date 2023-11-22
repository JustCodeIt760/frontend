import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext({
  token: '',
  isAuthenticated: false,
  setAuthenticationToken: (token) => {},
  logout: () => {},
});

function AuthContextProvider({ children }) {
  const [authToken, setAuthToken] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const tryLogin = async () => {
        const storedToken = await AsyncStorage.getItem('token');
        if (!storedToken) {
            setIsLoading(false);
            return;
        }
        setAuthToken(storedToken);
        setIsLoading(false);
    };

    tryLogin();
  }, []);

  async function setAuthenticationToken(token) {
    setAuthToken(token);
    try {
        await AsyncStorage.setItem('token', token);
    } catch (error) {
        console.error('Error saving token to AsyncStorage:', error);
    }
  }

  async function logout() {
    setAuthToken(null);
    try {
        await AsyncStorage.removeItem('token');
    } catch (error) {
        console.error('Error removing token from AsyncStorage:', error);
    }
  }

  const value = {
    token: authToken,
    isAuthenticated: !!authToken,
    setAuthenticationToken: setAuthenticationToken,
    logout: logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;
