import React, { useState, useEffect } from 'react';
import { Text, View, Dimensions, Alert } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import styled from 'styled-components';
import Icon from 'react-native-vector-icons/FontAwesome';
import { BleManager } from "react-native-ble-plx";
import base64 from "react-native-base64";
 
const _WIDTH = Dimensions.get('window').width;
const _HEIGHT = Dimensions.get('window').height;
const LEFT_NAME = "L";
const RIGHT_NAME = "R";

function Bluetooth({navigation}) { 
    const [power, setPower] = useState(true);
    const [scan, setScan] = useState(false);
    const [leftDevice, setLeftDevice] = useState({
        name : LEFT_NAME,
        id : "",
        uuid: "",
        isConnect : false
    });
    const [rightDevice, setRightDevice] = useState({
        name : RIGHT_NAME,
        id : "",
        uuid : "",
        isConnect : false
    })
    const manager = new BleManager();
    useEffect(() => {

    },[leftDevice, rightDevice]);
    const isPowered = (searchDevice) => {
        if((leftDevice.isConnect && searchDevice === LEFT_NAME) ||
        (rightDevice.isConnect && searchDevice === RIGHT_NAME))
            return; 
        const subscription = manager.onStateChange((state) => {
            if (state === "PoweredOn") {
                subscription.remove();
                scanAndConnect(searchDevice);
            } else { 
                alert("블루투스 전원을 확인해주세요"); 
            }
        },true);
    };
    const scan_ = () => {
        manager.startDeviceScan(null, null, (error, device) => {
            if(error) { console.log(error); return; }
            console.log(device.name);
        })
    }
    const scanAndConnect = (searchDevice) => {
        let scan = false;
        manager.startDeviceScan(null, null,(error,device) => {
            if(error) {
                console.log(error);
                return;
            }
            if(device.name === searchDevice) {
                console.log("scan complete");
                setScan(false);
                if(device.name === LEFT_NAME) {
                    manager.stopDeviceScan();
                    setLeftDevice({
                        ...leftDevice,
                        id: device.id,
                        uuid: device.serviceUUIDs[0], 
                        isConnect: true  
                    });
                    scan = true;
                }
                else if(device.name === RIGHT_NAME) {
                    manager.stopDeviceScan();
                    setRightDevice({
                        ...rightDevice,
                        id: device.id,
                        uuid: device.serviceUUIDs[0],
                        isConnect: true 
                    });
                    scan = true;
                }
            }
        });
        setTimeout(() => {
            if(!scan) {
                manager.stopDeviceScan();
                console.log(`Dont found ${searchDevice}`);
                alert(`${searchDevice} 기기의 전원을 켜주세요`);
                return;
            }
        }, 5000);
    };
    const doConnect = async (searchDevice) => {
        console.log("start conn");
        if(leftDevice.id.length > 0 && searchDevice.name === LEFT_NAME) {
            try {
                manager.connectToDevice(searchDevice.id)
                .then(res => {
                    setLeftDevice({
                        ...leftDevice,
                        isConnect: true
                    })
                    console.log("L connected");
                })
            } catch (error) {
                console.log(error);
            }
        } else if(rightDevice.id.length > 0 && searchDevice.name === RIGHT_NAME) {
            try {
                manager.connectToDevice(searchDevice.id)
                .then(res => {
                    setRightDevice({
                        ...rightDevice,
                        isConnect: true
                    })
                    console.log("R connected");
                })
            } catch (error) {
                console.log(error);
            }
        }
    }
    return (
        <LinearGradient start={{x: 1.5, y: 0}} end={{x: 0, y: 0}} colors={['#B2FEFA', '#0ED2F7']} style={{flex:1, alignItems:"center"}} >
			<MainView>
				<Text style={{fontSize:_WIDTH/23, fontWeight:"bold"}}>블루투스 연결</Text>
                <View style={{marginTop:30}}>
                    <Text style={{fontSize:_WIDTH/28, fontWeight:"bold"}}>왼쪽, 오른쪽 인솔 장치 연결</Text>
                    <Text style={{fontSize:_WIDTH/28, color:"#d1ccc0"}}>스마트폰의 블루투스 악세서리를 연결해주세요</Text>
                </View>
                <View style={{flexDirection:"row",height:"100%",justifyContent:"space-around"}}>
                    <BluetoothBox onTouchEnd={()=>isPowered(LEFT_NAME)}>
                        <Text style={{fontSize:_WIDTH/30, fontWeight:"bold"}}>왼쪽 인솔 연결</Text>
                        <Text style={{fontSize:_WIDTH/33, color:"#d1ccc0"}}>{LEFT_NAME}</Text>
                        <View style={{justifyContent:"center",alignItems:"center",height:"50%"}}>
                            <Icon name="check-circle" size={_WIDTH/11}  color={leftDevice.isConnect?"#34ace0":"#d1ccc0"} />
                        </View>
                    </BluetoothBox>
                    <BluetoothBox onTouchEnd={()=>isPowered(RIGHT_NAME)}>
                        <Text style={{fontSize:_WIDTH/30, fontWeight:"bold"}}>오른쪽 인솔 연결</Text>
                        <Text style={{fontSize:_WIDTH/33, color:"#d1ccc0"}}>{RIGHT_NAME}</Text>
                        <View style={{justifyContent:"center",alignItems:"center",height:"50%"}}>
                            <Icon name="check-circle" size={_WIDTH/11} color={rightDevice.isConnect?"#34ace0":"#d1ccc0"} />
                        </View>
                    </BluetoothBox>
                </View>
			</MainView>
            <NextBtn onPress={()=>{
                navigation.navigate('MainRouter',{
                screen: 'MainStack',
                params: {
                    screen: 'Main',
                    params: {
                        leftDevice: {
                            name: leftDevice.name,
                            isConnect : leftDevice.isConnect, 
                            id: leftDevice.id, 
                            uuid: leftDevice.uuid
                        },
                        rightDevice: {
                            name: rightDevice.name,
                            isConnect: rightDevice.isConnect,
                            id: rightDevice.id,
                            uuid: rightDevice.uuid,
                        }
                    }
                }
            })}}>
                <Text style={{fontSize:_WIDTH/22, fontWeight:"bold"}}>시작하기</Text>
            </NextBtn>
        </LinearGradient>
    )
}

const MainView = styled.View`
	width : 90%;
    height : 50%;
    margin-top : ${_HEIGHT/10}px;
    padding : 4% 5% 6% 5%;
	background-color : white;
`;
const BluetoothBox = styled.View`
    width : 40%;
    height : 60%;
    margin-top : ${_HEIGHT/30}px;
    padding : 10px;
    border : 3px #7f8c8d;
    border-radius : 20px;
`;
const NextBtn = styled.TouchableOpacity`
    width : 80%;
    height : ${_HEIGHT/13}px;
    position : absolute;
    bottom : ${_HEIGHT/15}px;
    background-color : white;
    border-radius : 30px;
    justify-content : center;
    align-items : center;
`;

export default Bluetooth;