import React, { useContext, useState } from 'react';
import { Alert, View, Text, TouchableOpacity } from 'react-native';
import Navbar from '../Navbar';
import AuthContent from '../components/Auth/AuthContent';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import { AuthContext } from '../store/auth-context';
import { login } from '../util/auth';

function LoginScreen() {
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

  if (isAuthenticating) {
    return <LoadingOverlay message="Logging you in..." />;
  }

  return (
    <View>
      <Navbar showLogout={false}/>
      <AuthContent isLogin onAuthenticate={loginHandler} />
      <TouchableOpacity onPress={() => {/* navigation logic for forgot password */}}>
        <Text style={{ color: 'blue', textAlign: 'center', marginTop: 20 }}>Forgot My Password</Text>
      </TouchableOpacity>
    </View>
  );
}

export default LoginScreen;
