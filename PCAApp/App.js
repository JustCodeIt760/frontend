import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import React, { useContext, useEffect } from 'react'; // Added useEffect
import AuthContextProvider, { AuthContext } from './store/auth-context.js';
import LoginScreen from './screens/LoginScreen';
import VehiclesList from './screens/VechileList';
import { Colors } from './constants/styles';
import Navbar from './Navbar'; // Import Navbar
import ForgotPasswordScreen from './screens/ForgotPasswordScreen';
import ResetPasswordScreen from './screens/ResetPasswordScreen';

const linking = {
  prefixes: ['exp://exp.host/@justcodeit/pcaapp'],
  config: {
    screens: {
      AuthStack: {
        screens: {
          ResetPassword: 'reset-password/:uid/:token',
        },
      },
    },
  },
};

const Stack = createNativeStackNavigator();

function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: 'white',
        contentStyle: { backgroundColor: Colors.primary100 },
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
      <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
    </Stack.Navigator>
  );
}


function AuthenticatedStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: 'white',
        contentStyle: { backgroundColor: Colors.primary100 },
        headerRight: () => <Navbar showLogout={true} /> // Add Navbar with logout button
      }}
    >
      <Stack.Screen name="Vehicles" component={VehiclesList} />
    </Stack.Navigator>
  );
}

function Navigation() {
  const { isAuthenticated, isLoading } = useContext(AuthContext);

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  return (
    <NavigationContainer linking={linking}>
      {isAuthenticated ? <AuthenticatedStack /> : <AuthStack />}
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <AuthContextProvider>
      <StatusBar style="light" />
        <Navigation />
    </AuthContextProvider>
  );
}