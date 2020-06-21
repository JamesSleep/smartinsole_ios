import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, ToastAndroid } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components';
import Average from './Average';
import Percentage from './Percentage';

const LEFT_INSOLE_NAME = "left insole"; 
const RIGHT_INSOLE_NAME = "right insole";

function Analysis({navigation}) {
    const [tabSwipe,setTab] = useState(true);

    const InsoleTab = styled.View`
        width : 27%;
        height : 100%;
        position : absolute;
        bottom : 0;
        left : 0;
        background-color : ${tabSwipe?"white":"#d1ccc0"};
        border-radius : 25px;
    `;
    const InsoleTab2 = styled.View`
        width : 27%;
        height : 100%;
        position : absolute;
        bottom : 0;
        left : 29%;
        background-color : ${tabSwipe?"#d1ccc0":"white"};
        border-radius : 25px;
    `;
    return (
        <LinearGradient start={{x: 1.5, y: 0}} end={{x: 0, y: 0}} colors={['#B2FEFA', '#0ED2F7']} style={{flex:1, alignItems:"center"}} >
            <SafeAreaView style={{flex:1, width:"100%",height:"100%"}} >
            <View style={{flex:1 ,width:"100%",height:"100%", justifyContent:"center",alignItems:"center", marginTop:30}}>
                <FakeLogo/>
            </View>
            <View style={{flex:6, width:"100%",height:"100%", justifyContent:"center",alignItems:"center", paddingBottom:20}}>
                <View style={{width:"85%", justifyContent:"flex-end" }}>
                    <InsoleTab>
                        <TabBtn onPress={()=>setTab(true)}><TabText>평균</TabText></TabBtn>
                    </InsoleTab>
                    <InsoleTab2>
                        <TabBtn onPress={()=>setTab(false)}><TabText>질병확률</TabText></TabBtn>
                    </InsoleTab2>
                    <InsoleDataColumn>
                        {tabSwipe?<Average />:<Percentage />}
                    </InsoleDataColumn>
                </View>
            </View>
            </SafeAreaView>
        </LinearGradient>
    )
}

const FakeLogo = styled.View`
    width : 90px;
    height : 90px;
    background-color : white;
    border-radius : 20px;
`;
const InsoleDataColumn = styled.View`
    width : 100%;
    height : 90%;
    background-color : white;
    border-top-left-radius : 25px;
    border-top-right-radius : 25px;
    border-bottom-left-radius : 25px;
    border-bottom-right-radius : 25px;
    justify-content : center;
    align-items : center;
    z-index:1;
`;
const TabBtn = styled.TouchableOpacity`
    width : 100%;
    height : 100%;
    border-top-left-radius : 25px;
    border-top-right-radius : 25px;
    border-bottom-left-radius : 25px;
`;
const TabText = styled.Text`
    padding-top : 15px;
    text-align : center;
    font-size : 18px;
`;


export default Analysis;