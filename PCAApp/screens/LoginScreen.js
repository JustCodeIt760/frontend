import React, { useContext, useState } from 'react';
import { Alert, View } from 'react-native';
import Navbar from '../Navbar'; // Import Navbar
import AuthContent from '../components/Auth/AuthContent';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import { AuthContext } from '../store/auth-context';
import { login } from '../util/auth';

function LoginScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const authCtx = useContext(AuthContext);

  async function loginHandler({ email, password }) { // Changed 'username' to 'email'
    setIsAuthenticating(true);
    try {
        const token = await login(email, password); // Changed 'username' to 'email'
        authCtx.setAuthenticationToken(token);
    } catch (error) {
      Alert.alert('Authentication failed!', error.message || 'Could not log you in. Please check your credentials or try again later!');
      setIsAuthenticating(false);
    }
  }

  if (isAuthenticating) {
    return <LoadingOverlay message="Logging you in..." />;
  }

  return (
    <View>
      <Navbar showLogout={false}/>
      <AuthContent isLogin onAuthenticate={loginHandler} />
    </View>
  );
}

export default LoginScreen;
