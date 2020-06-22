import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import styled from 'styled-components';
import Icon from 'react-native-vector-icons/FontAwesome';
import InsoleData from '../Insole/InsoleData';
import { SafeAreaView } from 'react-native-safe-area-context';

const LEFT_INSOLE_NAME = "left insole"; 
const RIGHT_INSOLE_NAME = "right insole";

const FAKE_DB = [
    { left : {temp:[21,26,30,40,42], press:[0,348,234,227,2738,1029,4021,882,3092]} , right : {temp:[21,26,30,42,42], press:[0,348,234,227,2738,1029,4021,882,3092]} },
    { left : {temp:[28,36,21,24,24], press:[2128,3428,34,283,1827,1837,987,399,4000]} , right : {temp:[32,26,24,27,42], press:[60,231,550,1825,2142,2990,3272,3445,3502]} },
    { left : {temp:[32,27,28,34,41], press:[343, 614, 1250, 1576, 1646, 1846, 2315, 2525, 3742]} , right : {temp:[41,26,28,35,40], press:[124, 1408, 1664, 1996, 2416, 2901, 3050, 3187, 3668]} },
    { left : {temp:[29,43,29,40,21], press:[141, 1331, 1851, 2086, 2557, 2989, 3232, 3753, 3890]} , right : {temp:[31,26,21,40,45], press:[212, 312, 400, 711, 723, 2687, 2847, 3029, 3568]} },
    { left : {temp:[37,41,35,43,28], press:[78, 249, 749, 1045, 1751, 2224, 2308, 2856, 3750]} , right : {temp:[25,34,31,33,41], press:[840, 941, 1443, 2307, 2341, 2397, 2628, 3174, 3517]} },
    { left : {temp:[18,25,45,41,42], press:[353, 828, 2120, 2577, 2601, 3082, 3349, 3357, 3494]} , right : {temp:[27,21,32,33,42], press:[157, 230, 1481, 1776, 2213, 2536, 3640, 3756, 4021]} }
];

function Main({navigation}) {
    const [data, setData] = useState(0);
    useEffect(() => { 
        const interval = setInterval(() => {
            setData(data => data >=5 ? 0 : data + 1);
        }, 1000);
        return () => clearInterval(interval);
    }, []);
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
                    <Text style={{flex:1, fontSize:17, fontWeight:"bold"}}>인솔 결 상태</Text>
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
                        <InsoleData name={tabSwipe?"temp":"press"} data={FAKE_DB[data]}/>
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