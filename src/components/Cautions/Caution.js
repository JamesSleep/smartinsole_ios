import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, AsyncStorage } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components';
import Icon from 'react-native-vector-icons/FontAwesome';
import Axios from 'axios';
import DiseaseCard from './DiseaseCard';

const SITE_URL = "http://foot.chaeft.com:8080/api";
const API = "/user/get?token=";

function Caution({navigation}) {
    const [token,setToken] = useState("");
    const [userInfo, setUserInfo] = useState({});

    useEffect(() => {
        if(token === "") { autoLogin(); }
        if(token !== "") { loadUserData(); }
    },[token]);
    const autoLogin = async () => {
		await AsyncStorage.getItem('loginInfo')
		.then(res=>{
			const data = JSON.parse(res);
            if(data != null) { setToken(data.token); } 
		})
	};
    const loadUserData = async () => {
        await Axios.get(SITE_URL+API+token)
        .then(res=>{ 
			if(res.data.success) {
				setUserInfo(res.data.data[0]);
			} else {
				ToastAndroid.show("토큰 정보를 확인해주세요",ToastAndroid.SHORT);
			}
		}).catch(err=>{
			console.log("err :" + err);
			ToastAndroid.show(JSON.stringify(err),ToastAndroid.SHORT);
		});
	}
    return (
        <LinearGradient start={{x: 1.5, y: 0}} end={{x: 0, y: 0}} colors={['#B2FEFA', '#0ED2F7']} style={{flex:1}}>
            <SafeAreaView style={{flex:1}}>
            <View style={{flex:1, width:"100%", justifyContent:"center",alignItems:"center"}}>
                <FakeLogo/>
            </View>
            <DiseaseView>
                <DiseaseTitle>
                    <Text style={{textAlign:"center", fontSize:20, fontWeight:"bold"}}>{`${userInfo.name}회원님의 위험질병`}</Text>
                    <Icon name="bell" size={25} color="#7f8c8d" style={{position:"absolute",right:10}} onPress={()=>navigation.navigate('CautionSetting')}/>
                </DiseaseTitle>
                <ScrollView>
                    {/*use array.map() */}
                    <DiseaseCard name={"척추층만증"} per={30}/>
                    <DiseaseCard name={"관절염"} per={85}/>
                    <DiseaseCard name={"허리디스크"} per={72}/>
                </ScrollView>
            </DiseaseView>
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
const DiseaseView = styled.View`
    flex : 3;
    margin : 0px 25px 40px 25px;
    padding : 10px 15px 5px 15px;
    background-color : white;
`;
const DiseaseTitle = styled.View`
    height : 80px;
    margin-bottom : 10px;
    flex-direction : row;
    justify-content : center;
    align-items : center;
    border-bottom-width : 4px;
    border-bottom-color : #7f8c8d;
`;

export default Caution;