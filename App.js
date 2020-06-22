import React, { useEffect } from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import HomeRouter from './src/routes/HomeRouter';
import SplashScreen from 'react-native-splash-screen';

const App = () => {
	useEffect(()=>{
		setTimeout(() => {
			SplashScreen.hide();
		}, 1500);
	},[])
	return (
		<SafeAreaProvider>
			<NavigationContainer>
				<HomeRouter/>
			</NavigationContainer>	
		</SafeAreaProvider>
	);
};

export default App;
