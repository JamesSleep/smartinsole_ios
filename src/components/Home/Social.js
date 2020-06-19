import React from 'react';
import { View, Text, AsyncStorage , TouchableOpacity } from 'react-native';
import WebView  from 'react-native-webview';

//ios문제로 잠시 미룸
function Social({navigation}) {
    return (
        <>
        <View style={{  }}>
            <TouchableOpacity><Text>back</Text></TouchableOpacity>
        </View>
        <View style={{ width:"100%", height:50 }}>
            <WebView
                source={{ uri: 'https://www.naver.com/' }}
                style={{ flex:1 }}
            />
		</View>
        </>
    )
}

export default Social;