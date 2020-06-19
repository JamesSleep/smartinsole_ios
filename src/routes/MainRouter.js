import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconA from 'react-native-vector-icons/MaterialCommunityIcons';
import MainStack from './MainStack';
import CautionStack from './CautionStack';
import Analysis from '../components/Analysis/Analysis';
import EnquiryStack from './EnquiryStack';

const Tab = createBottomTabNavigator();

const MainRouter = () => {
    return (
        <Tab.Navigator 
            initialRouteName = "MainStack"
            tabBarOptions={{ 
                activeTintColor : "#34ace0",
                tabStyle : {borderRightWidth:0.5,height:80,bottom:30, backgroundColor:"white"},
                labelStyle : {fontSize : 15}
            }}
        >
            <Tab.Screen 
                name = "MainStack" component={MainStack} 
                options={{
                    tabBarLabel:"메인",
                    tabBarIcon : ({color, size}) => (
                        <Icon name="home" size={30} color={color}/>
                    )
                }} 
            />
            <Tab.Screen name = "CautionStack" component={CautionStack} 
                options={{
                    tabBarLabel:"알림",
                    tabBarIcon : ({color, size}) => (
                        <IconA name="alarm-light" size={30} color={color}/>
                    )
                }} 
            />
            <Tab.Screen name = "Analysis" component={Analysis} 
                options={{
                    tabBarLabel:"분석",
                    tabBarIcon : ({color, size}) => (
                        <IconA name="chart-areaspline" size={30} color={color}/>
                    )
                }} 
            />
            <Tab.Screen name = "Enquiry" component={EnquiryStack} 
                options={{
                    tabBarLabel:"문의",
                    tabBarIcon : ({color, size}) => (
                        <Icon name="question-circle" size={30} color={color}/>
                    )
                }} 
            />
        </Tab.Navigator>
    )
}

export default MainRouter;