import React, { useContext, useState } from 'react';
import { Alert, View, Text, TouchableOpacity } from 'react-native';
import Navbar from '../Navbar'; // Import Navbar
import AuthContent from '../components/Auth/AuthContent';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import { AuthContext } from '../store/auth-context';
import { login } from '../util/auth';

function LoginScreen({ navigation }) {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const authCtx = useContext(AuthContext);

  async function loginHandler({ email, password }) {
    setIsAuthenticating(true);
    try {
      const token = await login(email, password);
      authCtx.setAuthenticationToken(token);
    } catch (error) {
      Alert.alert('Authentication failed!', error.message || 'Could not log you in. Please check your credentials or try again later!');
      setIsAuthenticating(false);
    }
  }

  const handleForgotPassword = () => {
    // Navigate to ForgotPasswordScreen or trigger the password reset flow
    navigation.navigate('ForgotPassword');
  };

  if (isAuthenticating) {
    return <LoadingOverlay message="Logging you in..." />;
  }

  return (
    <View>
      <Navbar showLogout={false}/>
      <AuthContent isLogin onAuthenticate={loginHandler} />
      <TouchableOpacity onPress={handleForgotPassword}>
        <Text>Forgot Password?</Text>
      </TouchableOpacity>
    </View>
  );
}

export default LoginScreen;
