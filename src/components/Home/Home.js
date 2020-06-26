import React, { useEffect, useState } from 'react';
import { StyleSheet ,StatusBar, Image, AsyncStorage, Dimensions } from 'react-native';
import { Text, View, Button, Thumbnail } from 'native-base'; //사용하지않을예정 수정필요
import LinearGradient from 'react-native-linear-gradient'; //그라데이션 모듈
import Axios from 'axios';
import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';

const SITE_URL = "http://foot.chaeft.com:8080/api";
const API = "/user/get?token=";
const _WIDTH = Dimensions.get('window').width;
const _HEIGHT = Dimensions.get('window').height;

function Home({navigation}) {
	const [token, setToken] = useState("");
	useEffect(() => {
		askPermission();
		autoLogin();
	},[])
	const askPermission = async () => {
		try {
			const result = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
			if (result !== RESULTS.GRANTED) {
				alert("권한설정을 해주세요. 기기설정이 제한됩니다.");
			}
		} catch (e) {
			console.log(e);
		}
	}
	const autoLogin = async () => {
		await AsyncStorage.getItem('loginInfo')
		.then(res=>{
			const data = JSON.parse(res);
			if(data != null) { 
				setToken(data.token);
				loadUserData(data.token);
			}
		})
	}
    const loadUserData = async (storageToken) => {
        await Axios.get(SITE_URL+API+storageToken)
        .then(res=>{ 
			if(res.data.success) {
				navigation.reset({
					index:0,
					routes:[{name:"Bluetooth"}]
				});
			} else {
				alert("토큰정보가 만료되었습니다");
				AsyncStorage.clear();
			}
		}).catch(err=>{
			console.log("err :" + err);
		});
	}
	
	return (
		<LinearGradient start={{x: 1.5, y: 0}} end={{x: 0, y: 0}} colors={['#65C5FF', '#0ED2F7']} style={css.linearGradient}>
			<StatusBar hidden={true}/>
			<View style={css.wrapView}>
				<View style={css.logoView}>
					<Thumbnail style={css.logo} square source={require('../../image/icon.png')}/>
					<Button style={css.joinBtn} onPress={()=>navigation.navigate('Join')}>
						<Text style={{color:"black",fontSize:_WIDTH/20,fontWeight:"bold"}}>회원가입</Text>
					</Button>
				</View>
				<View style={css.socialView}>
					<View style={{flexDirection:"row",alignItems:"center"}}>
						<View style={{width:"30%",height:2, backgroundColor:"#fff"}}/>
						<Text style={{color:"#fff",fontSize:_WIDTH/25, marginHorizontal:20}}>간편로그인</Text>
						<View style={{width:"30%",height:2, backgroundColor:"#fff"}}/>
					</View>
					<View style={{width:"90%", flexDirection:"row", justifyContent:"space-around", marginTop:20 }}>
						<View style={{alignItems:"center"}}>
							<Button style={css.socialBtn} onPress={()=>navigation.navigate('Social')}>
								<Image style={{width:_WIDTH/5, height:_WIDTH/5}} source={require('../../image/kakaotalk.png')}/>
							</Button>
							<Text style={{fontSize:_WIDTH/28, color: "#fff"}}>카카오톡</Text>
						</View>
						<View style={{alignItems:"center"}}>
							<Button style={css.socialBtn} onPress={()=>navigation.navigate('Social')}>
									<Image style={{width:_WIDTH/6, height:_WIDTH/6}} source={require('../../image/google2.png')}/>
							</Button>
							<Text style={{fontSize:_WIDTH/28, color: "#fff"}}>Google</Text>
						</View>
						<View style={{alignItems:"center"}}>
						<Button style={css.socialBtn} onPress={()=>navigation.navigate('Social')}>
								<Image style={{width:_WIDTH/5, height:_WIDTH/5}} source={require('../../image/naver.png')}/>
							</Button>
							<Text style={{fontSize:_WIDTH/28, color: "#fff"}}>네이버</Text>
						</View>
					</View>
				</View>
				<View style={css.loginView}>
					<Text style={{fontSize:_WIDTH/25, color:"#fff"}}>이미 계정이 있으신가요?</Text>
					<Text style={{fontSize:_WIDTH/25, color:"#fff", textDecorationLine:"underline"}} onPress={()=>navigation.navigate('Login')}>로그인하기</Text>
				</View>
			</View>
		</LinearGradient>		
	);
}

const css = StyleSheet.create({
	linearGradient: {
	  flex: 1
	},
	wrapView : {
		flex: 1,
		flexDirection: "column",
	},
	logoView: {
		flex: 11,
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
	},
	socialView: {
		flex: 5,
		flexDirection: "column",
		alignItems: "center",
	},
	loginView: {
		flex: 1,
		flexDirection: "row",
		justifyContent: "space-around",
	},
	logo: {
		width: _WIDTH/4,
		height: _WIDTH/4,
		backgroundColor: "#fff",
		borderRadius: 20,
	},
	joinBtn: {
		width: "80%",
		height: _HEIGHT/12,
		marginTop: 100,
		justifyContent: "center",
		borderRadius: 30,
		backgroundColor: "#fff",
	},
	socialBtn: {
		width: _WIDTH/5,
		height: _WIDTH/5,
		marginBottom: 10,
		backgroundColor: "#fff",
		borderRadius: 20,
		overflow : "hidden",
		justifyContent : "center",
		alignItems : "center"
	}
 });

export default Home;