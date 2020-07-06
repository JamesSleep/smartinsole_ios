import React, { useState } from 'react';
import {  View, Text , TouchableWithoutFeedback, Keyboard, Dimensions } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import styled from 'styled-components';
import Axios from 'axios';
import { API_URL } from '../../../api';

const SITE_URL = API_URL;
const FIND_API = "/auth/findByNumber";

const _WIDTH = Dimensions.get('window').width;
const _HEIGHT = Dimensions.get('window').height;

function FinderID({navigation}) {
    const [isFind, setFind] = useState(false);
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");

    const post = async () => {
        const postData = JSON.stringify({ "number" : phone });
        await Axios.post(SITE_URL+FIND_API, postData, {
            headers : {
                'Content-Type' : 'application/json',
            }
        }).then(res=>{ // false 없음
            if(res.data.success) { 
                setFind(true);
                setEmail(res.data.email);
            } else {
                alert("핸드폰번호를 확인해주세요");
            }
        }).catch(err=>{
            console.log("err :" + err);
            alert(JSON.stringify(err));
        });
    }
    return (
        <LinearGradient start={{x: 1.5, y: 0}} end={{x: 0, y: 0}} colors={['#B2FEFA', '#0ED2F7']} style={{flex:1,justifyContent:"center",alignItems:"center"}}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={{flex:1, width:"100%", height:"100%", justifyContent:"center",alignItems:"center"}}>
                    <Icon name="angle-left" size={_WIDTH/13} color="#fff" style={{position:"absolute",left:20,top:10}} onPress={()=>navigation.goBack()}/>
                    {   isFind?
                        <FinderBox>
                            <Text style={{fontSize:_WIDTH/25, paddingBottom:_WIDTH/30,marginBottom:_WIDTH/20,textAlign:"center",borderBottomColor:"#7f8c8d",borderBottomWidth:_WIDTH*0.015}}>
                                {"입력하신 정보와 일치하는\nID(이메일)는 다음과 같습니다"}
                            </Text>
                            <View style={{width:"100%",height:"50%", marginTop:10, flexDirection:"row", paddingLeft:10, justifyContent:"center", alignItems:"center"}}>
                                <Text style={{fontSize:_WIDTH/15}}>{email}</Text>
                            </View>
                        </FinderBox>
                        :
                        <FinderBox>
                            <FinderTitle editable={false} value={"ID(이메일)찾기"}/>
                            <Text style={{fontSize:_WIDTH/24, fontWeight:"bold", paddingLeft:10}}>핸드폰번호를 입력해주세요</Text>
                            <View style={{marginTop:10, flexDirection:"row", paddingLeft:10, alignItems:"center"}}>
                                <InputData placeholder="핸드폰번호를 입력해주세요" placeholderTextColor="gray" onChangeText={text=>setPhone(text)}/>
                                <CustomBtn><Text style={{fontSize:_WIDTH/30,color:"white", textAlign:"center"}}>{"인증번호\n전송"}</Text></CustomBtn>
                            </View>
                            <View style={{marginTop:10, flexDirection:"row", paddingLeft:10, alignItems:"center"}}>
                                <InputData placeholder="인증번호를 입력해주세요" placeholderTextColor="gray"></InputData>
                                <CustomBtn><Text style={{fontSize:_WIDTH/30,color:"white", textAlign:"center"}}>인증하기</Text></CustomBtn>
                            </View>
                        </FinderBox>
                    }
                    { isFind?
                        <PostButton onPress={()=>navigation.navigate('Login')}>
                            <Text style={{fontSize:_WIDTH/18, color:"black", textAlign:"center"}}>로그인하기</Text>
                        </PostButton>
                        :
                        <PostButton onPress={()=>post()}>
                            <Text style={{fontSize:_WIDTH/18, color:"black", textAlign:"center"}}>확인</Text>
                        </PostButton>
                    }
                    <Text onPress={()=>navigation.navigate('FinderPW')} style={{fontSize: _WIDTH/30, fontWeight:"bold"}}>
                        비밀번호 찾기
                    </Text>
                </View>
            </TouchableWithoutFeedback>
        </LinearGradient>
    )
}

const FinderBox = styled.View`
    width : 90%;
    height : ${_HEIGHT*0.5}px;
    padding : 20px 20px 10px 20px;
    background-color : white;
`;
const FinderTitle = styled.TextInput`
    width : 100%;
    height : ${_HEIGHT/10}px;
    color : black;
    padding-bottom : ${_HEIGHT/25}px;
    margin-bottom : ${_HEIGHT/20}px;
    text-align : center;
    font-size : ${_WIDTH/17}px;
    font-weight : bold;
    border-bottom-width : 7px;
	border-bottom-color : #7f8c8d;
`;
const InputData = styled.TextInput`
    width : 70%;
    height : ${_HEIGHT/14}px;
    padding-left : ${_WIDTH/25}px;
    border : 2px #7f8c8d ; 
	font-size : ${_WIDTH/32}px;
`;
const CustomBtn = styled.TouchableOpacity`
    width : 25%;
    height : ${_HEIGHT/14}px;
    background-color : #4F92E0;
    justify-content : center;
`;
const PostButton = styled.TouchableOpacity`
    width : 88%;
    height : ${_HEIGHT/12}px;
    margin : ${_HEIGHT/20}px 0;
    background-color : white;
    justify-content : center;
    border-radius : 30px;
`;

export default FinderID;