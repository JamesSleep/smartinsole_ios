import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import styled from 'styled-components';
import Icon from 'react-native-vector-icons/FontAwesome';
import InsoleData from '../Insole/InsoleData';
import { SafeAreaView } from 'react-native-safe-area-context';

const LEFT_INSOLE_NAME = "left insole"; 
const RIGHT_INSOLE_NAME = "right insole";

function Main({navigation}) {
    const [devices, setDevices] = useState([]);
    const [LeftDevice, setLeft] = useState({id:"",name:"",isConnect:false});
    const [RightDevice, setRight] = useState({id:"",name:"",isConnect:false});
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
            <SafeAreaView style={{flex:1, width:"100%"}}>
            <View style={{flex:2 ,width:"100%", justifyContent:"center",alignItems:"center"}}>
                <FakeLogo/>
                <Profile >
                    <ProfileIcon onPress={()=>navigation.navigate('Profile')}/>
                    <Text style={{color:"white"}}>프로필</Text>
                </Profile>
            </View>
            <View style={{flex:1, width:"100%", justifyContent:"center",alignItems:"center"}}>
                <ConnectView>
                    <Text style={{flex:1, fontSize:17, fontWeight:"bold"}}>인솔 연결 상태</Text>
                    <View style={{flex:3, flexDirection:"row",justifyContent:"space-around",  alignItems:"center"}}>
                        <View style={{flexDirection:"row",justifyContent:"space-around", alignItems:"center"}}>
                            <Icon name="check-circle" size={40} 
                            color={RightDevice.isConnect?"#34ace0":"#d1ccc0"} />
                            <Text style={{marginLeft:10}}>L 왼쪽 인솔</Text>
                        </View>
                        <View style={{flexDirection:"row", alignItems:"center"}}>
                            <Icon name="check-circle" size={40} 
                            color={RightDevice.isConnect?"#34ace0":"#d1ccc0"} />
                            <Text style={{marginLeft:10}}>R 오른쪽 인솔</Text>
                        </View>
                    </View>
                </ConnectView>
            </View>
            <View style={{flex:5, width:"100%", justifyContent:"center",alignItems:"center", paddingBottom:20}}>
                <View style={{width:"85%", justifyContent:"flex-end" }}>
                    <InsoleTab>
                        <TabBtn onPress={()=>setTab(true)}><TabText>온도</TabText></TabBtn>
                    </InsoleTab>
                    <InsoleTab2>
                        <TabBtn onPress={()=>setTab(false)}><TabText>압력</TabText></TabBtn>
                    </InsoleTab2>
                    <InsoleDataColumn>
                        <InsoleData name={tabSwipe?"temp":"press"}/>
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
const Profile = styled.View`
    width : 80px;
    position : absolute;
    top : 20px;
    right : 20px;
    justify-content : center;
    align-items : center;
`;
const ProfileIcon = styled.TouchableOpacity`
    width : 60px;
    height : 60px;
    border-radius : 50px;
    background-color : white;
`;
const ConnectView = styled.View`
    width : 85%;
    height : 120px;
    background-color : white;
    border-radius : 25px;
    padding : 10px;
`;
const InsoleDataColumn = styled.View`
    width : 100%;
    height : 85%;
    background-color : white;
    border-top-right-radius : 25px;
    border-bottom-left-radius : 25px;
    border-bottom-right-radius : 25px;
`;
const TabBtn = styled.TouchableOpacity`
    width : 100%;
    height : 100%;
    border-top-left-radius : 25px;
    border-top-right-radius : 25px;
    border-bottom-left-radius : 25px;
`;
const TabText = styled.Text`
    padding-top : 10px;
    text-align : center;
    font-size : 20px;
`;

export default Main;