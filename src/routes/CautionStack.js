import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Caution from '../components/Cautions/Caution';
import CautionSetting from '../components/Cautions/CautionSetting';


const Stack = createStackNavigator();

const CautionStack = () => {
    return (
        <Stack.Navigator initialRouteName="Caution" headerMode="none">
            <Stack.Screen name="Caution" component={Caution} />
            <Stack.Screen name="CautionSetting" component={CautionSetting} />
        </Stack.Navigator>   	
    )
}

export default CautionStack;