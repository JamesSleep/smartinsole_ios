import React, { useEffect, useState } from 'react';
import { View, Text, Button, AsyncStorage } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import styled from 'styled-components';
import Icon from 'react-native-vector-icons/FontAwesome';
import InsoleData from '../Insole/InsoleData';
import { SafeAreaView } from 'react-native-safe-area-context';
import Axios from 'axios';

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

function Main({navigation}) {
    const [data, setData] = useState(0);
    const [token, setToken] = useState("");
    useEffect(() => {
        getToken();
        const interval = setInterval(() => {
            setData(data => data >=2 ? 0 : data + 1);
        }, 1000);
        return () => clearInterval(interval);
    }, []);
    const [devices, setDevices] = useState([]);
    const [LeftDevice, setLeft] = useState({id:"",name:"",isConnect:false});
    const [RightDevice, setRight] = useState({id:"",name:"",isConnect:false});
    const [tabSwipe,setTab] = useState(true);

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
    const insoleDataHandler = async () => {
        const insoleData = FAKE_DB[5];
        const postData = JSON.stringify({
            "create" : "2020-06-21",  //오늘날짜
            // 왼쪽 압력 값
            "PL0": insoleData.left.press[0].toString(), "PL1": insoleData.left.press[1].toString(), "PL2": insoleData.left.press[2].toString(), 
            "PL3": insoleData.left.press[3].toString(), "PL4": insoleData.left.press[4].toString(), "PL5": insoleData.left.press[5].toString(), 
            "PL6": insoleData.left.press[6].toString(), "PL7": insoleData.left.press[7].toString(), "PL8": insoleData.left.press[8].toString(), 
            // L (x,y)
            "xL": "2", "yL": "2",
            // 왼쪽 온도 값 
            "TL0": insoleData.left.temp[0].toString(), "TL1": insoleData.left.temp[1].toString(), "TL2": insoleData.left.temp[2].toString(), 
            "TL3": insoleData.left.temp[3].toString(), "TL4": insoleData.left.temp[4].toString(), 
            //오른쪽 압력 값
            "PR0": insoleData.right.press[0].toString(), "PR1": insoleData.right.press[1].toString(), "PR2": insoleData.right.press[2].toString(), 
            "PR3": insoleData.right.press[3].toString(), "PR4": insoleData.right.press[4].toString(), "PR5": insoleData.right.press[5].toString(), 
            "PR6": insoleData.right.press[6].toString(), "PR7": insoleData.right.press[7].toString(), "PR8": insoleData.right.press[8].toString(), 
            //R (x,y)
            "xR": "2", "yR": "2",
            // 오른쪽 온도 값
            "TR0": insoleData.right.temp[0].toString(), "TR1": insoleData.right.temp[1].toString(), "TR2": insoleData.right.temp[2].toString(), 
            "TR3": insoleData.right.temp[3].toString(), "TR4": insoleData.right.temp[4].toString()
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
                <FakeLogo />
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
                        <InsoleData name={tabSwipe?"temp":"press"} data={FAKE_DB[data]} route={"Main"}/>
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