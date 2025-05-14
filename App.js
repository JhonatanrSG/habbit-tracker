import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./screens/LoginScreen";
import SignUpScreen from "./screens/SignUpScreen";
import HomeScreen from "./screens/HomeScreen";
import CreateHabitScreen from "./screens/CreateHabitScreen";
import Toast from 'react-native-toast-message';
import * as Notifications from 'expo-notifications';
import { useEffect } from 'react';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="CreateHabit" component={CreateHabitScreen} />
        </Stack.Navigator>
      </NavigationContainer>
      <Toast />
    </>
  );
};


useEffect(() => {
  Notifications.requestPermissionsAsync();
}, []);
