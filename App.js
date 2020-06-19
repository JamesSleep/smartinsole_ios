import React, { useEffect } from 'react';
import {View,Text} from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import HomeRouter from './src/routes/HomeRouter';

const App = () => {
	return (
		<SafeAreaProvider>
			<NavigationContainer>
				<HomeRouter/>
			</NavigationContainer>	
		</SafeAreaProvider>
	);
};

export default App;
