import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, AsyncStorage, TouchableOpacity, Alert } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import styled from 'styled-components';
import Icon from 'react-native-vector-icons/FontAwesome';
import Axios from 'axios';
import { SafeAreaView } from 'react-native-safe-area-context';

const SITE_URL = "http://foot.chaeft.com:8080/api";
const API = "/user/get?token=";

function Profile({navigation}) {
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

    const logOut = async () => {
        await AsyncStorage.clear()
        .then(res => {
            navigation.navigate('Home');
        })
    }
    return (
        <LinearGradient start={{x: 1.5, y: 0}} end={{x: 0, y: 0}} colors={['#B2FEFA', '#0ED2F7']} style={{flex:1}}>
            <SafeAreaView style={{flex:1, width:"100%"}}>
            <View style={{flex:1, paddingHorizontal:25, paddingTop:30}}>
                <Icon name="angle-left" style={{position:"absolute",left:20,top:5}} size={40} color="#fff" onPress={()=>navigation.goBack()}/>
                <TouchableOpacity style={{position:"absolute",right:20,top:20}} onPress={()=>logOut()}>
                    <Text style={{color:"white", fontSize:17}}>로그아웃</Text>
                </TouchableOpacity>
                <View style={{flex:2, justifyContent:"center", alignItems:"center"}}>
                    <ProfileIMG></ProfileIMG>
                    <Text style={{color:"white", fontSize:16}}>프로필</Text>
                </View>
                <View style={{flex:4}}>
                    <Text style={{color:"white", marginLeft:10, fontSize:25, fontWeight:"bold",marginBottom:5}}>내 프로필</Text>
                    <View style={{width:"100%",height:"85%" , backgroundColor:"white", borderRadius:20, padding:20}}>
                        <RowColumn>
                            <RowTitle>이메일</RowTitle>
                            <RowData>{userInfo.email}</RowData>
                        </RowColumn>
                        <RowColumn>
                            <RowTitle>이름</RowTitle>
                            <RowData>{userInfo.nickname}</RowData>
                        </RowColumn>
                        <RowColumn>
                            <RowTitle>핸드폰번호</RowTitle>
                            <RowData>{userInfo.num}</RowData>
                        </RowColumn>
                        <RowColumn>
                            <RowTitle>성별</RowTitle>
                            <RowData>{userInfo.sex?"남자":"여자"}</RowData>
                        </RowColumn>
                        <RowColumn>
                            <RowTitle>체중</RowTitle>
                            <RowData>{userInfo.weight+"kg"}</RowData>
                        </RowColumn>
                        <RowColumn>
                            <RowTitle>나이</RowTitle>
                            <RowData>{userInfo.age}</RowData>
                        </RowColumn>
                    </View>
                </View>
                <View style={{flex:1, justifyContent:"flex-start",marginBottom:20}}>
                    <TouchableOpacity 
                        style={{width:"100%",height:"60%", backgroundColor:"white", borderRadius:30, justifyContent:"center"}}
                        onPress={()=>navigation.navigate('ProfileUpdate',{userInfo:userInfo})}
                    >
                        <Text style={{fontSize:25, textAlign:"center",fontWeight:"bold"}}>프로필 수정하기</Text>
                    </TouchableOpacity>
                </View>
            </View>
            </SafeAreaView>
        </LinearGradient>
    )
}
const ProfileIMG = styled.View`
    width : 90px;
    height : 90px;
    border-radius : 50px;
    margin-bottom : 10px;
    background-color : white;
`;
const RowColumn = styled.View`
    flex : 1;
    width : 100%;
    padding : 8px 20px 8px 20px;
    margin-bottom : 2%;
    flex-direction : row;
    justify-content : space-between;
    align-items : center;
`;
const RowTitle = styled.Text`
    font-weight : bold;
    font-size : 16px;
`;
const RowData = styled.Text`
    font-size : 14px;
`;

export default Profile;