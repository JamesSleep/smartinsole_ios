import React, { useState } from 'react';
import {  View , Text , AsyncStorage, TouchableWithoutFeedback, Keyboard, Dimensions } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import styled from 'styled-components';
import Axios from 'axios';

const SITE_URL = "http://foot.chaeft.com:8080/api";
const API = "/auth/signin";

const _WIDTH = Dimensions.get('window').width;
const _HEIGHT = Dimensions.get('window').height;

function Login({navigation}) {
	const [email, setEmail] = useState("");
	const [password, setPW] = useState("");

	const post = async () => {
		const postData = JSON.stringify({
			"loginType" : "email",
			"email" : email,
			"password" : password,
		});
		await Axios.post(SITE_URL+API, postData, {
			headers : {	'Content-Type' : 'application/json', }
		}).then(res=>{ // response : success, token
			if(res.data.success) { //블루투스 기기연결 확인 후 BT SET or MAIN
				AsyncStorage.setItem('loginInfo', JSON.stringify({
					"token" : res.data.token
				}));
				navigation.reset({
					index:0,
					routes:[{name:"Bluetooth"}]
				});
			} else {
				alert("로그인 정보를 확인해주세요");
			}
		}).catch(err=>{
			console.log("err :" + err);
			alert(JSON.stringify(err));
		});
	}
    return (
		<LinearGradient start={{x: 1.5, y: 0}} end={{x: 0, y: 0}} colors={['#B2FEFA', '#0ED2F7']} style={{flex:1,justifyContent:"center",alignItems:"center"}}>
			<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
				<View style ={{flex:1, width:"100%", height:"100%", justifyContent:"center",alignItems:"center"}}>
					<Icon name="angle-left" size={40} color="#fff" style={{position:"absolute",left:20,top:10}} onPress={()=>navigation.goBack()}/>
					<FakeLogo source={require('../../image/icon.png')}/>
					<LoginCard>
						<InputData onChangeText={text=>setEmail(text)} placeholder="이메일" placeholderTextColor="gray"/>
						<InputData onChangeText={text=>setPW(text)} secureTextEntry placeholder="비밀번호" placeholderTextColor="gray"/>
						<CustomBtn onPress={()=>post()}><LoginText>로그인</LoginText></CustomBtn>
						<View style={{width:"80%", flexDirection:"row", justifyContent:"space-around"}}>
							<Text onPress={()=>navigation.navigate('FinderID')} style={{fontSize:_WIDTH/32, color:"black", opacity: 0.7}}>ID(이메일)찾기</Text>
							<Text onPress={()=>navigation.navigate('FinderPW')} style={{fontSize:_WIDTH/32, color:"black", opacity: 0.7}}>비밀번호찾기</Text>
						</View>
					</LoginCard>
				</View>
			</TouchableWithoutFeedback>
		</LinearGradient>
    );
}

const FakeLogo = styled.Image`
	width : ${_WIDTH/4}px;
	height : ${_WIDTH/4}px;
	border-radius : ${_HEIGHT/25}px;
`;

const LoginCard = styled.View`
	margin-top : ${_HEIGHT/7}px;
	padding : 5% 7% 3% 7%;
	width : 90%;
	height : ${_HEIGHT*0.4}px;
	background-color : white;
	border-radius : ${_HEIGHT/25}px;
	align-items : center;
`;
const InputData = styled.TextInput`
	color : black;
	margin-top : 10px;
	width : 90%;
	height : ${_HEIGHT/13}px;
    border-bottom-width : 1px;
	border-bottom-color : black;
	font-size : ${_WIDTH/28}px;
`;
const CustomBtn = styled.TouchableOpacity`
	margin-top : ${_HEIGHT/30}px;
	margin-bottom : 10px;
    width : 100%;
    height : ${_HEIGHT/14}px;
    background-color : #4F92E0;
	justify-content : center;
	border-radius : 30px;
`;
const LoginText = styled.Text`
	text-align : center;
	color : white;
	font-size : ${_WIDTH/20}px;
`;


export default Login;