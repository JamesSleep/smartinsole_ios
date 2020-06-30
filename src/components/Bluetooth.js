import React, { useState, useEffect } from 'react';
import { Text, View, Dimensions, Alert } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import styled from 'styled-components';
import Icon from 'react-native-vector-icons/FontAwesome';
import { BleManager } from "react-native-ble-plx";
import base64 from "react-native-base64";
import { requestMTU } from 'react-native-ble-manager';
 
const _WIDTH = Dimensions.get('window').width;
const _HEIGHT = Dimensions.get('window').height;
const LEFT_NAME = "L";
const RIGHT_NAME = "";

function Bluetooth({navigation}) { 
    const [power, setPower] = useState(false);
    const [scan, setScan] = useState(false);
    const [leftDevice, setLeftDevice] = useState({
        name : LEFT_NAME,
        id : "",
        uuid: "",
        isConnect : false
    });
    const manager = new BleManager();

    useEffect(() => {
        isPowered();
        if(scan) scanAndConnect();
        
    },[power, scan, leftDevice]);

    const isPowered = () => {
        const subscription = manager.onStateChange((state) => {
            if (state === "PoweredOn") {
                setPower(true);
                //subscription.remove();
            } else { setPower(false); }
        },true);
    };
    const scanAndConnect = () => {
        let scan = false;
        manager.startDeviceScan(null, null,(error,device) => {
            if(error) {
                console.log(error);
                return;
            }
            if(device.name === LEFT_NAME) {
                manager.stopDeviceScan();
                console.log("scan complete");
                setScan(false);
                setLeftDevice({
                    ...leftDevice,
                    id: device.id,
                    uuid: device.serviceUUIDs[0]
                });
                scan = true;
            }
        });
        setTimeout(() => {
            if(!scan) {
                manager.stopDeviceScan();
                console.log("Don't found L");
                alert("블루투스 전원 및 기기페어링을 확인해주세요");
                setScan(false);
            }
        }, 5000);
    };
    const connecting = async id => {
        await manager.connectToDevice(id, {requestMTU: 260})
        .then(res => {
            setLeftDevice({...leftDevice,
                isConnect : true
            });
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
            manager.monitorCharacteristicForDevice(id,serviceUUIDs,characteristicUUID, async (err, char) => {
                console.log( base64.decode( char.value));
            })

           /*  await manager.readCharacteristicForDevice(id,serviceUUIDs,characteristicUUID,)
            .then(res => {
                console.log(base64.decode(res.value));
            }); */
        });
    };
    const doConnect = async () => {
        if(leftDevice.id.length > 0) {
            try {
                manager.connectToDevice(leftDevice.id)
                .then(res => {
                    setLeftDevice({
                        ...leftDevice,
                        isConnect: true
                    })
                    console.log("connected");
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
                    <BluetoothBox onTouchEnd={()=>setScan(true)}>
                        <Text style={{fontSize:_WIDTH/30, fontWeight:"bold"}}>왼쪽 인솔 연결</Text>
                        <Text style={{fontSize:_WIDTH/33, color:"#d1ccc0"}}>{leftDevice.name===""?"LEFT":leftDevice.name}</Text>
                        <View style={{justifyContent:"center",alignItems:"center",height:"50%"}}>
                            <Icon name="check-circle" size={_WIDTH/11}  color={leftDevice.isConnect?"#34ace0":"#d1ccc0"} />
                        </View>
                    </BluetoothBox>
                    <BluetoothBox onTouchEnd={()=>connecting(leftDevice.id)}>
                        <Text style={{fontSize:_WIDTH/30, fontWeight:"bold"}}>오른쪽 인솔 연결</Text>
                        <Text style={{fontSize:_WIDTH/33, color:"#d1ccc0"}}>{"R"}</Text>
                        <View style={{justifyContent:"center",alignItems:"center",height:"50%"}}>
                            <Icon name="check-circle" size={_WIDTH/11} color={"#d1ccc0"} />
                        </View>
                    </BluetoothBox>
                </View>
			</MainView>
            <NextBtn onPress={()=>navigation.navigate('MainRouter',{
                screen: 'MainStack',
                params: {
                    screen: 'Main',
                    params: {
                        leftDevice: {
                            isConnect : leftDevice.isConnect, 
                            id: leftDevice.id, 
                            uuid: leftDevice.uuid
                        }
                    }
                }
            })}>
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