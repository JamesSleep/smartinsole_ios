import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../components/Home/Home';
import Login from '../components/Home/Login';
import Join from '../components/Home/Join';
import FinderID from '../components/Home/FinderID';
import FinderPW from '../components/Home/FinderPW';
import Social from '../components/Home/Social';
import MainRouter from './MainRouter';
import Bluetooth from '../components/Bluetooth';

const Stack = createStackNavigator();

const HomeRouter = () => {
    return (
        <Stack.Navigator initialRouteName="Home" headerMode="none">
			<Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Join" component={Join} />
            <Stack.Screen name="FinderID" component={FinderID} />
            <Stack.Screen name="FinderPW" component={FinderPW} />
            <Stack.Screen name="Social" component={Social} />
            <Stack.Screen name="Bluetooth" component={Bluetooth} />
            <Stack.Screen name="MainRouter" component={MainRouter}/>
        </Stack.Navigator>   	
    )
}

export default HomeRouter;
