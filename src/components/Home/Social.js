import React from 'react';
import { View, Text, AsyncStorage , TouchableOpacity } from 'react-native';
import WebView  from 'react-native-webview';

//ios문제로 잠시 미룸
function Social({navigation}) {
    return (
        <>
        <View>
            <TouchableOpacity onPress={()=>navigation.goBack()}><Text>back</Text></TouchableOpacity>
        </View>
        <View>
            <WebView
                source={{ uri: 'https://www.naver.com/' }}
                style={{ flex:1 }}
            />
		</View>
        </>
    )
}

export default Social;