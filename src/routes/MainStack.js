import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Main from '../components/Main/Main';
import Profile from '../components/Main/Profile';
import ProfileUpdate from '../components/Main/ProfileUpdate';
import ModifyPW from '../components/Main/ModifyPW';

const Stack = createStackNavigator();

const MainStack = () => {
    return (
        <Stack.Navigator initialRouteName="Main" headerMode="none">
            <Stack.Screen name="Main" component={Main} />
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="ProfileUpdate" component={ProfileUpdate} />
            <Stack.Screen name="ModifyPW" component={ModifyPW} />
        </Stack.Navigator>   	
    )
}

export default MainStack;
