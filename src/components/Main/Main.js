import React, { useEffect, useState } from 'react';
import { View, Text, Button, AsyncStorage, Dimensions, ScrollView, Platform, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AntIcon from 'react-native-vector-icons/AntDesign';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import InsoleData from '../Insole/InsoleData';
import { SafeAreaView } from 'react-native-safe-area-context';
import Axios from 'axios';
import { BleManager } from "react-native-ble-plx";
import base64 from "react-native-base64";
import { API_URL } from '../../../api';
import { retrieveServices } from 'react-native-ble-manager';

const _WIDTH = Dimensions.get('window').width;
const _HEIGHT = Dimensions.get('window').height;
const SITE_URL = API_URL;
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
    const [data, setData] = useState(FAKE_DB[0]);
    const [token, setToken] = useState("");
    const [tabSwipe,setTab] = useState(true);
    const [control, setControl] = useState(false);
    const [stop, setStop] = useState(false);
    const [insoleData, setInsoleData] = useState({
        left: {}, right: {},
    })
    const [leftDevice, setLeftDevice] = useState({
        name: route.params.leftDevice.name,
        id: route.params.leftDevice.id,
        isConnect: route.params.leftDevice.isConnect,
        uuid: route.params.leftDevice.uuid,
    });
    const [rightDevice, setRightDevice] = useState({
        name: route.params.rightDevice.name,
        id: route.params.rightDevice.id,
        isConnect: route.params.rightDevice.isConnect,
        uuid: route.params.rightDevice.uuid,
    });
    const manager = new BleManager();

    useEffect(() => {
        if(token.length < 1) {
            getToken();
        }
        if(stop) {
            if(insoleData.left.type === undefined && leftDevice.id.length > 0) {
                setTimeout(() => {
                    getInsoleData(leftDevice);
                }, 1000)
            } else if (insoleData.right.type === undefined && rightDevice.id.length > 0) {
                setTimeout(() => {
                    getInsoleData(rightDevice);
                }, 1000)
            }
            if(insoleData.left.type !== undefined && insoleData.right.type !== undefined) {
                insoleDataHandler();
                const { TL0, TL1, TL2, TL3, TL4 } = insoleData.left.Temper;
                const { PL0, PL1, PL2, PL3, PL4, PL5, PL6, PL7, PL8 } = insoleData.left.Pressure;
                const { TR0, TR1, TR2, TR3, TR4 } = insoleData.right.Temper;
                const { PR0, PR1, PR2, PR3, PR4, PR5, PR6, PR7, PR8 } = insoleData.right.Pressure;
                setData({
                    TL0: TL0, TL1: TL1, TL2: TL2, TL3: TL3, TL4: TL4,
                    PL0: PL0, PL1: PL1, PL2: PL2, PL3: PL3, PL4: PL4, PL5: PL5, PL6: PL6, PL7: PL7, PL8: PL8,
                    TR0: TR0, TR1: TR1, TR2: TR2, TR3: TR3, TR4: TR4,
                    PR0: PR0, PR1: PR1, PR2: PR2, PR3: PR3, PR4: PR4, PR5: PR5, PR6: PR6, PR7: PR7, PR8: PR8,
                });
                setInsoleData({ left: {}, right: {}, });
            }
        }
    }, [ token, stop, insoleData ]);
    const getToken = async () => {
		await AsyncStorage.getItem('loginInfo')
		.then(res=>{
			const data = JSON.parse(res);
			if(data != null) { 
				setToken(data.token);
			}
		})
    }
    const getInsoleData = async(selectedDevice) => {
        await manager.connectToDevice(selectedDevice.id, {requestMTU : 260})
        .then(device => {
            return device.discoverAllServicesAndCharacteristics();
        })
        .then(async (device) => {
            console.log("discover")
            return device.services();
        }).then(async (services)=> {
            console.log("service")
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
            const serviceUUIDs = selectedDevice.uuid;
            const id = selectedDevice.id;
            for(let i in servicesMap) {
                let uuid = i;
                if(uuid === serviceUUIDs) {
                    let chID = servicesMap[uuid].characteristics;
                    for(let inner in chID) characteristicUUID = inner;
                }
            }
            if(Platform.OS === "ios") {
                let responeseData;
                await manager.readCharacteristicForDevice(id,serviceUUIDs,characteristicUUID,)
                .then(res => {
                    //post insole data
                    responeseData = JSON.parse(base64.decode(res.value));
                    console.log(base64.decode(res.value));
                });
                await manager.cancelDeviceConnection(id)
                .then(res => {
                    console.log("disconnected");
                }); 
                if(selectedDevice.name === leftDevice.name) {
                    setInsoleData({...insoleData,left: responeseData});
                } else if(selectedDevice.name === rightDevice.name) {
                    setInsoleData({...insoleData,right: responeseData});
                }
            }
            if(Platform.OS === "android") {
                await manager.readCharacteristicForDevice(id,serviceUUIDs,characteristicUUID,)
                .then(res => {
                    //post insole data
                    if(selectedDevice.name === leftDevice.name) {
                        setInsoleData({...insoleData,left: JSON.parse(base64.decode(res.value))});
                    } else if(selectedDevice.name === rightDevice.name) {
                        setInsoleData({...insoleData,right: JSON.parse(base64.decode(res.value))});
                    }
                    console.log(base64.decode(res.value));
                });
                await manager.cancelDeviceConnection(id)
                .then(res => {
                    console.log("disconnected");
                });          
            }
        });
    }
    const connect = async(id) => {
        await manager.connectToDevice(id)
        .then(res => {
            console.log(id);
            console.log("connected");
        })
    }
    const disconnect = async(id) => {
        await manager.cancelDeviceConnection(id)
        .then(res => {
            console.log("disconnected");                
        })
    }
    const isConnect = async(id) => {
        await manager.isDeviceConnected(id)
        .then(res => {
            console.log(res);
        })
    }
    const insoleDataHandler = async () => {
        const { PL0, PL1, PL2, PL3, PL4, PL5, PL6, PL7, PL8 } = insoleData.left.Pressure;
        const { PR0, PR1, PR2, PR3, PR4, PR5, PR6, PR7, PR8 } = insoleData.right.Pressure;
        const { TL0, TL1, TL2, TL3, TL4 } = insoleData.left.Temper;
        const { TR0, TR1, TR2, TR3, TR4 } = insoleData.right.Temper;
        const xL = insoleData.left.Cop.x; const yL = insoleData.left.Cop.y;
        const xR = insoleData.right.Cop.x; const yR = insoleData.right.Cop.y;
        const today = new Date();
        const postData = JSON.stringify({
            "create" : today.toISOString().slice(0,10),  //오늘날짜
            // 왼쪽 압력 값
            "PL0": PL0.toString(), "PL1": PL1.toString(), "PL2": PL2.toString(), 
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
            <SafeAreaView style={{flex:1, width:"100%"}} >
            <View style={{flex:2 ,width:"100%", justifyContent:"center",alignItems:"center"}}>
                <FakeLogo source={require('../../image/icon.png')}/>
                <Profile onTouchEnd={()=>navigation.navigate('Profile')}>
                    <Icon name={"user-circle"} size={_WIDTH/12} color={'white'} style={{borderRadius:50}}/>
                    <Text style={{fontSize:_WIDTH/32, color:"white"}}>프로필</Text>
                </Profile>
            </View>
            <View style={{flex:1, width:"100%", justifyContent:"center",alignItems:"center"}}>
                <ConnectView>
                    <View style={{flex: 1, flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
                        <Text style={{fontSize:_WIDTH/26, fontWeight:"bold"}}>인솔 연결 상태</Text>
                        <TouchableOpacity
                            style={{backgroundColor: "#34ace0", padding: 5, borderRadius: 20}}
                            onPress={()=>setControl(true)}
                        >
                            <Text style={{ fontSize:_WIDTH/30, fontWeight:"bold", color: "white" }}>
                                데이터 송/수신
                            </Text> 
                        </TouchableOpacity>
                    </View>
                    <View style={{flex:3, flexDirection:"row",justifyContent:"space-around",  alignItems:"center"}}>
                        <View style={{flexDirection:"row",justifyContent:"space-around", alignItems:"center"}}>
                            <Icon name="check-circle" size={_WIDTH/12} 
                            color={leftDevice.isConnect?"#34ace0":"#d1ccc0"} />
                            <Text style={{fontSize:_WIDTH/30, marginLeft:10}}>L 왼쪽 인솔</Text>
                        </View>
                        <View style={{flexDirection:"row", alignItems:"center"}}>
                            <Icon name="check-circle" size={_WIDTH/12} 
                            color={rightDevice.isConnect?"#34ace0":"#d1ccc0"} />
                            <Text style={{fontSize:_WIDTH/30, marginLeft:10}}>R 오른쪽 인솔</Text>
                        </View>
                    </View>
                </ConnectView>
                { control? (
                    <ControlView>
                        <Icon 
                            name="times-circle" size={_WIDTH /16} color="white"
                            style={{top:10, left:10, position:"absolute"}} 
                            onPress={()=>setControl(false)}
                        />
                        <ControlColumn>
                            <TouchableOpacity onPress={()=>{setStop(true)}}>
                                <MaterialIcon 
                                    name="lan-connect" 
                                    size={_WIDTH / 7}
                                    color="white"                                   
                                />
                            </TouchableOpacity>
                            <ControlTxT>데이터수신</ControlTxT>
                        </ControlColumn>
                        <ControlColumn>
                            <TouchableOpacity onPress={()=>setStop(false)}>
                                <AntIcon 
                                    name="disconnect"
                                    size={_WIDTH / 7}
                                    color="white"                          
                                />
                            </TouchableOpacity>
                            <ControlTxT>연결끊기</ControlTxT>
                        </ControlColumn>
                        <ControlColumn>
                            <TouchableOpacity onPress={()=>navigation.navigate("Bluetooth")}>
                                <MaterialIcon 
                                    name="bluetooth-connect" 
                                    size={_WIDTH / 7}
                                    color="white"                                   
                                />
                            </TouchableOpacity>
                            <ControlTxT>BLE 설정</ControlTxT>
                        </ControlColumn>
                    </ControlView>
                    ): ( null
                )}
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
                        <InsoleData name={tabSwipe?"temp":"press"} data={data} route={"Main"}/>
                    </InsoleDataColumn>
                </View>
            </View>
            </SafeAreaView>
        </LinearGradient>
    )    
}
const FakeLogo = styled.Image`
    width : ${_WIDTH/5}px;
    height : ${_WIDTH/5}px;
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
const ProfileIcon = styled.Image`
    width : ${_WIDTH/12}px;
    height : ${_WIDTH/12}px;
    border-radius : 50px;
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
const ControlView = styled.View`
    width: 90%;
    height: ${_HEIGHT * 0.3}px;
    background-color: rgba(0,0,0,0.7);
    border-radius: 25px;
    position: absolute;
    bottom: 0px;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`;
const ControlColumn = styled.View`
    margin: 0 20px;
    justify-content: center;
    align-items: center;
`;
const ControlTxT = styled.Text`
    font-size: ${_WIDTH/30}px;
    color: white;
    margin-top: 8px;
`;


export default Main;