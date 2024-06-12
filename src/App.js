import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import TabNavigator from './TabNavigator';
import { Text } from 'react-native';
import Toast from 'react-native-toast-message';

const App = () => {
    return (
        <NavigationContainer>
            <TabNavigator />
            <Toast />
        </NavigationContainer>
    );
};

export default App;
