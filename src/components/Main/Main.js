import React, { useEffect, useState } from 'react';
import { View, Text, Button, AsyncStorage, Dimensions } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import styled from 'styled-components';
import Icon from 'react-native-vector-icons/FontAwesome';
import InsoleData from '../Insole/InsoleData';
import { SafeAreaView } from 'react-native-safe-area-context';
import Axios from 'axios';
import { BleManager } from "react-native-ble-plx";
import base64 from "react-native-base64";

const _WIDTH = Dimensions.get('window').width;
const _HEIGHT = Dimensions.get('window').height;

const LEFT_INSOLE_NAME = "left insole"; 
const RIGHT_INSOLE_NAME = "right insole";

const SITE_URL = "http://foot.chaeft.com:8080/api";
const API = "/data/data?token=";

const FAKE_DB = [
    {TL0:21,TL1:26,TL2:30,TL3:40,TL4:42,PL0:0,PL1:348,PL2:234,PL3:227,PL4:2738,PL5:1029,PL6:4021,PL7:882,PL8:3092,
     TR0:21,TR1:26,TR2:30,TR3:42,TR4:42,PR0:0,PR1:348,PR2:234,PR3:227,PR4:2738,PR5:1029,PR6:4021,PR7:882,PR8:3092},
    {TL0:28,TL1:36,TL2:21,TL3:24,TL4:24,PL0:2128,PL1:3428,PL2:34,PL3:283,PL4:1827,PL5:1837,PL6:987,PL7:399,PL8:4000, 
     TR0:32,TR1:26,TR2:24,TR3:27,TR4:42,PR0:60,PR1:231,PR2:550,PR3:1825,PR4:2142,PR5:2990,PR6:3272,PR7:3445,PR8:3502},
    {TL0:32,TL1:27,TL2:28,TL3:34,TL4:41,PL0:343,PL1:614,PL2:1250,PL3:1576,PL4:1646,PL5:1846,PL6:2315,PL7:2525,PL8:3742,
     TR0:41,TR1:26,TR2:28,TR3:35,TR4:40,PR0:124,PR1:1408,PR2:1664,PR3:1996,PR4:2416,PR5:2901,PR6:3050,PR7:3187,PR8:3668},
];

function Main({navigation, route}) {
    const [data, setData] = useState(0);
    const [token, setToken] = useState("");
    const [insoleData, setInsoleData] = useState({
        left: {},
        right: {}
    });
    const [tabSwipe,setTab] = useState(true);
    const { leftDevice } = route.params;
    const manager = new BleManager();
    useEffect(() => {
        getToken();
        if(leftDevice.id.length) getInsoleData();
        
    }, []);
    const getToken = async () => {
		await AsyncStorage.getItem('loginInfo')
		.then(res=>{
			const data = JSON.parse(res);
			if(data != null) { 
				setToken(data.token);
			} else {
				
			}
		})
    }
    const getInsoleData = async() => {
        await manager.connectToDevice(leftDevice.id)
        .then(res => {
            return res.discoverAllServicesAndCharacteristics();
        }).then(async (device) => {
            return device.services();
        }).then(async (services)=> {
            let servicesMap= {};
            for(let service of services) {
                let characteristicsMap = {};
                let characteristics = await service.characteristics();
                for (let characteristic of characteristics) {
                    characteristicsMap[characteristic.uuid] = {
                        uuid : characteristic.uuid,
                        isReadable : characteristic.isReadable,
                        isWritableWithResponse : characteristic.isWritableWithResponse,
                        isWritableWithoutResponse : characteristic.isWritableWithoutResponse,
                        isNotifiable : characteristic.isIndicatable,
                        isNotifying : characteristic.isNotifying,
                        value : characteristic.value
                    }
                }
                servicesMap[service.uuid] = {
                    uuid : service.uuid,
                    isPrimary : service.isPrimary,
                    characteristicsCount : characteristics.length,
                    characteristics : characteristicsMap
                }
            }
            let characteristicUUID;
            const serviceUUIDs = leftDevice.uuid;
            const id = leftDevice.id;
            for(let i in servicesMap) {
                let uuid = i;
                if(uuid === serviceUUIDs) {
                    let chID = servicesMap[uuid].characteristics;
                    for(let inner in chID) characteristicUUID = inner;
                }
            }
            await manager.readCharacteristicForDevice(id,serviceUUIDs,characteristicUUID,)
            .then(res => {
                setInsoleData({...insoleData,right: base64.decode(res.value)});
                console.log(base64.decode(res.value));
            });
        });
    }
    const insoleDataHandler = async () => {
        const { PL0, PL1, PL2, PL3, PL4, PL5, PL6, PL7, PL8 } = insoleData.left.Pressure;
        const { PR0, PR1, PR2, PR3, PR4, PR5, PR6, PR7, PR8 } = insoleData.right.Pressure;
        const { TL0, TL1, TL2, TL3, TL4 } = insoleData.left.Temper;
        const { TR0, TR1, TR2, TR3, TR4 } = insoleData.right.Temper;
        const xL = insoleData.left.Cop.x; const yL = insoleData.left.Cop.y;
        const xR = insoleData.right.Cop.x; const yR = insoleData.right.Cop.y;

        const postData = JSON.stringify({
            "create" : "2020-06-21",  //오늘날짜
            // 왼쪽 압력 값
            "PL0": PL0.toString, "PL1": PL1.toString(), "PL2": PL2.toString(), 
            "PL3": PL3.toString(), "PL4": PL4.toString(), "PL5": PL5.toString(), 
            "PL6": PL6.toString(), "PL7": PL7.toString(), "PL8": PL8.toString(), 
            // L (x,y)
            "xL": xL, "yL": yL,
            // 왼쪽 온도 값 
            "TL0": TL0.toString(), "TL1": TL1.toString(), "TL2": TL2.toString(), 
            "TL3": TL3.toString(), "TL4": TL4.toString(), 
            //오른쪽 압력 값
            "PR0": PR0.toString(), "PR1": PR1.toString(), "PR2": PR2.toString(), 
            "PR3": PR3.toString(), "PR4": PR4.toString(), "PR5": PR5.toString(), 
            "PR6": PR6.toString(), "PR7": PR7.toString(), "PR8": PR8.toString(), 
            //R (x,y)
            "xR": xR, "yR": yR,
            // 오른쪽 온도 값
            "TR0": TR0.toString(), "TR1": TR1.toString(), "TR2": TR2.toString(), 
            "TR3": TR3.toString(), "TR4": TR4.toString()
        });
        await Axios.post(SITE_URL+API+token, postData, {
            headers : {
                'Content-Type' : 'application/json',
            }
        }).then(res=>{
            console.log(res.data);
        })
    }
    const InsoleTab = styled.View`
        width : 27%;
        height : 100%;
        position : absolute;
        bottom : 0;
        left : 0;
        background-color : ${tabSwipe?"white":"#d1ccc0"};
        border-radius : ${_WIDTH/20}px;
    `;
    const InsoleTab2 = styled.View`
        width : 27%;
        height : 100%;
        position : absolute;
        bottom : 0;
        left : 29%;
        background-color : ${tabSwipe?"#d1ccc0":"white"};
        border-radius : ${_WIDTH/20}px;
    `;
    return (
        <LinearGradient start={{x: 1.5, y: 0}} end={{x: 0, y: 0}} colors={['#B2FEFA', '#0ED2F7']} style={{flex:1, alignItems:"center"}} >
            <SafeAreaView style={{flex:1, width:"100%"}}>
            <View style={{flex:2 ,width:"100%", justifyContent:"center",alignItems:"center"}}>
                <FakeLogo />
                <Profile >
                    <ProfileIcon onPress={()=>navigation.navigate('Profile')}/>
                    <Text style={{fontSize:_WIDTH/32, color:"white"}}>프로필</Text>
                </Profile>
            </View>
            <View style={{flex:1, width:"100%", justifyContent:"center",alignItems:"center"}}>
                <ConnectView onTouchEnd={()=>navigation.navigate("Bluetooth")}>
                    <Text style={{flex:1, fontSize:_WIDTH/26, fontWeight:"bold"}}>인솔 연결 상태</Text>
                    <View style={{flex:3, flexDirection:"row",justifyContent:"space-around",  alignItems:"center"}}>
                        <View style={{flexDirection:"row",justifyContent:"space-around", alignItems:"center"}}>
                            <Icon name="check-circle" size={_WIDTH/12} 
                            color={leftDevice.isConnect?"#34ace0":"#d1ccc0"} />
                            <Text style={{fontSize:_WIDTH/30, marginLeft:10}}>L 왼쪽 인솔</Text>
                        </View>
                        <View style={{flexDirection:"row", alignItems:"center"}}>
                            <Icon name="check-circle" size={_WIDTH/12} 
                            color={"#d1ccc0"} />
                            <Text style={{fontSize:_WIDTH/30, marginLeft:10}}>R 오른쪽 인솔</Text>
                        </View>
                    </View>
                </ConnectView>
            </View>
            <View style={{flex:5, width:"100%", justifyContent:"center",alignItems:"center", paddingBottom:_WIDTH/40}}>
                <View style={{width:"85%", justifyContent:"flex-end" }}>
                    <InsoleTab>
                        <TabBtn onPress={()=>setTab(true)}><TabText>온도</TabText></TabBtn>
                    </InsoleTab>
                    <InsoleTab2>
                        <TabBtn onPress={()=>setTab(false)}><TabText>압력</TabText></TabBtn>
                    </InsoleTab2>
                    <InsoleDataColumn>
                        <InsoleData name={tabSwipe?"temp":"press"} data={FAKE_DB[data]} route={"Main"}/>
                    </InsoleDataColumn>
                </View>
            </View>
            </SafeAreaView>
        </LinearGradient>
    )
    
}
const FakeLogo = styled.View`
    width : ${_WIDTH/5}px;
    height : ${_WIDTH/5}px;
    background-color : white;
    border-radius : ${_WIDTH/25}px;
`;
const Profile = styled.View`
    width : ${_WIDTH/8}px;
    position : absolute;
    top : ${_WIDTH/20}px;
    right : ${_WIDTH/20}px;
    justify-content : center;
    align-items : center;
`;
const ProfileIcon = styled.TouchableOpacity`
    width : ${_WIDTH/8}px;
    height : ${_WIDTH/8}px;
    border-radius : 50px;
    background-color : white;
`;
const ConnectView = styled.View`
    width : 85%;
    height : ${_HEIGHT/6}px;
    background-color : white;
    border-radius : ${_WIDTH/25}px;
    padding : 10px;
`;
const InsoleDataColumn = styled.View`
    width : 100%;
    height : 85%;
    background-color : white;
    border-top-right-radius : ${_WIDTH/25}px;
    border-bottom-left-radius :${_WIDTH/25}px;
    border-bottom-right-radius : ${_WIDTH/25}px;
`;
const TabBtn = styled.TouchableOpacity`
    width : 100%;
    height : 100%;
    border-top-left-radius : ${_WIDTH/25}px;
    border-top-right-radius : ${_WIDTH/25}px;
    border-bottom-left-radius : ${_WIDTH/25}px;
`;
const TabText = styled.Text`
    padding-top : ${_WIDTH/35}px;
    text-align : center;
    font-size : ${_WIDTH/25}px;
`;

export default Main;