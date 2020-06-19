import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Enquiry from '../components/Enquiry/Enquiry';
import ResistEnquiry from '../components/Enquiry/ResistEnquiry';
import ModifyEnquiry from '../components/Enquiry/ModifyEnquiry';

const Stack = createStackNavigator();

const EnquiryStack = () => {
    return (
        <Stack.Navigator initialRouteName="Main" headerMode="none">
            <Stack.Screen name="Enquiry" component={Enquiry} />
            <Stack.Screen name="ResistEnquiry" component={ResistEnquiry} />
            <Stack.Screen name="ModifyEnquiry" component={ModifyEnquiry} />
        </Stack.Navigator>   	
    )
}

export default EnquiryStack;