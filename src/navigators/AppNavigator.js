import React from 'react';
import SignupScreen from '../screens/auth/SignupScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import SplashScreen from '../screens/auth/SplashScreen';
import HomeScreen from '../screens/Homescreen';
import ForgetPasswordScreen from '../screens/auth/ForgetpasswordScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AddNoteScreen from '../screens/AddNoteScreen';
import {Routes} from './routes';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={Routes.SplashScreen}
        component={SplashScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={Routes.LoginScreen}
        component={LoginScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={Routes.SignupScreen}
        component={SignupScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={Routes.HomeScreen}
        component={HomeScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={Routes.AddNoteScreen}
        component={AddNoteScreen}
        options={{
          title: 'Add Note',
          headerStyle: {
            backgroundColor: '#6574FF',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <Stack.Screen
        name={Routes.ForgetPasswordScreen}
        component={ForgetPasswordScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
