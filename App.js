// In App.js in a new project

import * as React from 'react';
import { View, Button, Text, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import login from "./screens/login";
// import { auth } from 'firebase';
import Auths from "./screens/auth";
import setProfile from "./screens/setProfile";
import Timeline from "./screens/timline";
import Need from "./screens/need";




const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerShown: false
      }} initialRouteName="Home">
        <Stack.Screen name="Home" component={login} />
        <Stack.Screen name="Auths" component={Auths} />
        <Stack.Screen name="setProfile" component={setProfile} />
        <Stack.Screen name="Timeline" component={Timeline} />
        <Stack.Screen name="Need" component={Need} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}




export default App;

