import React, { useContext, useState } from 'react';
import { Alert, View } from 'react-native';
import Navbar from '../Navbar'; // Import Navbar
import AuthContent from '../components/Auth/AuthContent';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import { AuthContext } from '../store/auth-context';
import { createUser } from '../util/auth';

function SignupScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const authCtx = useContext(AuthContext);

  async function signupHandler({ username, password }) {
    setIsAuthenticating(true);
    try {
      const token = await createUser(username, password);
      authCtx.setAuthenticationToken(token);
    } catch (error) {
      Alert.alert(
        'Authentication failed',
        'Could not create user, please check your input and try again later.'
      );
      setIsAuthenticating(false);
    }
  }

  if (isAuthenticating) {
    return <LoadingOverlay message="Creating user..." />;
  }

  return (
    <View>
      <Navbar />
      <AuthContent onAuthenticate={signupHandler} />
    </View>
  );
}

export default SignupScreen;
