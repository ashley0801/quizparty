import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignInScreen from './SignInScreen';
import SignUpScreen from './SignUpScreen';
import CategoriesScreen from './CategoriesScreen';
import QuizScreen from './QuizScreen';
import ResultsScreen from './ResultsScreen';
import ProfileScreen from './ProfileScreen';
import SplashScreen from './SplashScreen';

const Stack = createNativeStackNavigator();

function AppNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
      <Stack.Screen name="SignIn" component={SignInScreen} options={{ headerShown: false }} />
      <Stack.Screen name="SignUp" component={SignUpScreen}  options={{ headerShown: false }} />
      <Stack.Screen name="Categories" component={CategoriesScreen}  options={{ headerShown: false }}/>
      <Stack.Screen name="QuizScreen" component={QuizScreen}  options={{ headerShown: false }}/>
      <Stack.Screen name="ResultsScreen" component={ResultsScreen}  options={{ headerShown: false }}/>
      <Stack.Screen name="ProfileScreen" component={ProfileScreen}  options={{ headerShown: false }}/>
    </Stack.Navigator>
  );
}

export default AppNavigator;
