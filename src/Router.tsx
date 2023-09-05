import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {useTheme as useThemePaper} from 'react-native-paper';
import {RootStackType} from './types/RootStackType';
import Login from './containers/Login';
import Home from './containers/Home';

const Stack = createNativeStackNavigator<RootStackType>();

export default function StackNavigation() {
  const {colors} = useThemePaper();
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={'Login'}
        screenOptions={() => ({
          shadowColor: 'transparent',
          borderBottomWidth: 0,
          headerTitleAlign: 'center',
          headerBackTitleVisible: false,
          headerShadowVisible: false,
          contentStyle: {
            backgroundColor: colors.background,
          },
          headerStyle: {
            backgroundColor: colors.background,
          },
          headerTitleStyle: {
            color: colors.onBackground,
          },
          headerTintColor: colors.primary,
        })}>
        <Stack.Screen
          name={'Login'}
          component={Login}
          options={{title: 'Login & Configuration'}}
        />
        <Stack.Screen
          name={'Home'}
          component={Home}
          options={{title: 'Home'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
