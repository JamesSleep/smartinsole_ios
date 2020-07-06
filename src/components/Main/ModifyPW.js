import React, { useState, useEffect } from 'react';
import {  View, Text , ToastAndroid, AsyncStorage, Dimensions,
    TouchableOpacity, TextInput, TouchableWithoutFeedback, Keyboard } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import Axios from 'axios';
import { SafeAreaView } from 'react-native-safe-area-context';
import { API_URL } from '../../../api';

const SITE_URL = API_URL;
const API = "/user/mod_pw?token=";

const _WIDTH = Dimensions.get('window').width;
const _HEIGHT = Dimensions.get('window').height;

function ModifyPW({navigation}) {
    const [token, setToken] = useState("");
    const [password, setPW] = useState("");
    const [currentPW, setCurrent] = useState("");
    const [updatePW, setUpdate] = useState("");
    const [checkPW, setCheck] = useState("");

    useEffect(() => {
        loadToken();
    },[token]);

    const loadToken = async () => {
        await AsyncStorage.getItem('loginInfo')
        .then(res => {
            const data = JSON.parse(res);
            setToken(data.token); setPW(data.password);      
        })
    };
    const error_check = (pw) => {
        switch (pw) {
            case "CURRENT" : {
                if(password === currentPW) return true;
                else return false;
            }
            case "UPDATE" : {
                let asciiNum = false, asciiUpper = false, asciiLower = false;
                for (let i=0; i<updatePW.length; i++) {
                    if(updatePW.charCodeAt(i) > 47 && updatePW.charCodeAt(i) < 58) {
                        asciiNum = true;
                    }
                    if(updatePW.charCodeAt(i) > 96 && updatePW.charCodeAt(i) < 122) {
                        asciiLower = true;
                    }
                    if(updatePW.charCodeAt(i) > 64 && updatePW.charCodeAt(i) < 91) {
                        asciiUpper = true;
                    }
                }
                if(updatePW.length > 5 && updatePW.length < 21 && 
                    asciiNum && (asciiLower || asciiUpper)) return true;
                else return false; 
            }
            case "CHECK" : {
                if(updatePW === checkPW) return true;
                else return false;
            }
            default : break;
        }
    };

    const post = async () => {
        if(error_check("CURRENT") && error_check("UPDATE") && error_check("CHECK")) {
            const pw = JSON.stringify({
                "password" : updatePW
            })
            await Axios.post(SITE_URL+API, pw, {
                headers : {
                    'Content-Type' : 'application/json',
                }
            }).then(res=>{
                console.log(res.data);
                if(res.data.success) { 
                    alert("비밀번호 변경에 성공하였습니다.");
                    navigation.navigate('ProfileUpdate');
                } else {
                    if(res.data.message === "invalid token") {
                        ToastAndroid.show("무효화 토큰입니다.",ToastAndroid.SHORT);
                    }
                }
            })
        } else {
            if(!error_check("CURRENT")) ToastAndroid.show("현재 비밀번호 확인바랍니다.",ToastAndroid.SHORT);
            if(!error_check("UPDATE")) ToastAndroid.show("변경된 비밀번호 확인바랍니다.",ToastAndroid.SHORT);
            if(!error_check("CHECK")) ToastAndroid.show("변경된 비밀번호가 일치하지않습니다.",ToastAndroid.SHORT);
        }
    };

    return (
        <LinearGradient start={{x: 1.5, y: 0}} end={{x: 0, y: 0}} colors={['#B2FEFA', '#0ED2F7']} style={{flex:1}}>
            <SafeAreaView style={{flex:1, width:"100%",height:"100%"}}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
				<View style ={{flex:1, width:"100%", height:"100%", justifyContent:"center",alignItems:"center"}}>
                    <Icon name="angle-left" size={_WIDTH/11} color="#fff" style={{width:"100%",top:10,left:20}}  onPress={()=>navigation.goBack()}/>
                    <View style={{flex:1,width:"100%",height:"100%",justifyContent:"center",alignItems:"center"}}>
                        <View style={{width:"90%", height:"70%",backgroundColor:"white",padding:_WIDTH/20}}>
                            <Text style={{fontSize:_WIDTH/18,textAlign:"center",fontWeight:"bold",marginBottom:_HEIGHT/32}}>비밀번호 변경하기</Text>
                            <View style={{borderBottomColor:"#7f8c8d",borderBottomWidth:_WIDTH/70}}/>
                            <View style={{flex:1, flexDirection:"row",justifyContent:"space-around", alignItems:"center", margin:_WIDTH/70}}>
                                <Text style={{fontSize:_WIDTH/26}}>현재 비밀번호</Text>
                                <TextInput secureTextEntry placeholder="비밀번호를 입력하세요" onChangeText={text=>setCurrent(text)} placeholderTextColor="gray"
                                style={{width:"60%",height:_HEIGHT/16, borderColor:"#7f8c8d",borderWidth:_WIDTH*0.005, textAlign:"center",fontSize:_WIDTH/30}}/>
                            </View>
                            {   
                                error_check("CURRENT") ? null : 
                                <Text style={{color:"red", textAlign:"right",paddingRight:_WIDTH/18, fontSize:_WIDTH/35}}>
                                    현재 비밀번호와 일치하지않습니다
                                </Text> 
                            }
                            <View style={{flex:1, flexDirection:"row",justifyContent:"space-around", alignItems:"center", margin:_WIDTH/70}}>
                                <Text style={{fontSize:_WIDTH/26}}>변경 비밀번호</Text>
                                <TextInput secureTextEntry placeholder="비밀번호를 입력하세요" onChangeText={text=>setUpdate(text)} placeholderTextColor="gray"
                                style={{width:"60%",height:_HEIGHT/16, borderColor:"#7f8c8d",borderWidth:_WIDTH*0.005, textAlign:"center",fontSize:_WIDTH/30}}/>
                            </View>
                            {   
                                error_check("UPDATE") ? null : 
                                <Text style={{color:"red", textAlign:"right",paddingRight:_WIDTH/18, fontSize:_WIDTH/35}}>
                                    비밀번호는 숫자&영문 6자 이상 20자 이하 입니다
                                </Text> 
                            }
                            <View style={{flex:1, flexDirection:"row",justifyContent:"space-around", alignItems:"center", margin:_WIDTH/70}}>
                                <Text style={{fontSize:_WIDTH/26}}>비밀번호 확인</Text>
                                <TextInput secureTextEntry placeholder="비밀번호를 입력하세요" onChangeText={text=>setCheck(text)} placeholderTextColor="gray"
                                style={{width:"60%",height:_HEIGHT/16, borderColor:"#7f8c8d",borderWidth:_WIDTH*0.005, textAlign:"center",fontSize:_WIDTH/30}}/>
                            </View>
                            {   
                                error_check("CHECK") ? null : 
                                <Text style={{color:"red", textAlign:"right",paddingRight:_WIDTH/18, fontSize:_WIDTH/35}}>
                                    변경할 비밀번호와 일치하지않습니다
                                </Text> 
                            }
                        </View>
                        <TouchableOpacity
                            onPress={()=>post()}
                            style={{width:"90%",height:"10%",marginTop:_HEIGHT/32,backgroundColor:"white",borderRadius:30,justifyContent:"center"}}
                        >
                            <Text style={{textAlign:"center",fontSize:_WIDTH/20,fontWeight:"bold"}}>변경하기</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableWithoutFeedback>      
            </SafeAreaView>
        </LinearGradient>
    )
}


export default ModifyPW;