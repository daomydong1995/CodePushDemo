import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { memo } from 'react';
import CodePush from "react-native-code-push";
import DemoCodePushScreen from './src/screens/DemoCodePushScreen';
import DemoSocketScreen from './src/screens/DemoSocketScreen';
import HomeScreen from './src/screens/HomeScreen';
const Stack = createStackNavigator()

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={'HOME_SCREEN'}
        screenOptions={{
          cardStyle: {
            backgroundColor: 'transparent',
          },
        }}
      >
        <Stack.Screen name={'HOME_SCREEN'} component={HomeScreen} />
        <Stack.Screen name={'DEMO_CODEPUSH_SCREEN'} component={DemoCodePushScreen} options={{ title: 'Demo CodePush' }}
        />
        <Stack.Screen name={'DEMO_SOCKET_SCREEN'} component={DemoSocketScreen} options={{ title: 'Demo Socket' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

let codePushOptions = { checkFrequency: CodePush.CheckFrequency.MANUAL };

export default CodePush(codePushOptions)(App);
