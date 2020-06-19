import React, { useState } from 'react';
import {  View, Text , ToastAndroid } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import styled from 'styled-components';
import Axios from 'axios';

function FinderID({navigation}) {
    const [isFind, setFind] = useState(false);
    const tempEmail = "tyuyiy@naver.com";
    return (
        <LinearGradient start={{x: 1.5, y: 0}} end={{x: 0, y: 0}} colors={['#B2FEFA', '#0ED2F7']} style={{flex:1,justifyContent:"center",alignItems:"center"}}>
            <Icon name="angle-left" size={28} color="#fff" style={{position:"absolute",left:20,top:10}} onPress={()=>navigation.goBack()}/>
            {   isFind?
                    <FinderBox>
                        <Text style={{fontSize:18, paddingBottom:20,marginBottom:40,textAlign:"center",borderBottomColor:"#7f8c8d",borderBottomWidth:7}}>
                            {"입력하신 정보와 일치하는\nID(이메일)는 다음과 같습니다"}
                        </Text>
                        <View style={{width:"100%",height:"50%", marginTop:10, flexDirection:"row", paddingLeft:10, justifyContent:"center", alignItems:"center"}}>
                            <Text style={{fontSize:30}}>{tempEmail}</Text>
                        </View>
                    </FinderBox>
                :
                <FinderBox>
                    <FinderTitle editable={false} value={"ID(이메일)찾기"}/>
                    <Text style={{fontSize:18, fontWeight:"bold", paddingLeft:10}}>핸드폰번호를 입력해주세요</Text>
                    <View style={{marginTop:10, flexDirection:"row", paddingLeft:10, alignItems:"center"}}>
                        <InputData placeholder="핸드폰번호를 입력해주세요" placeholderTextColor="gray"></InputData>
                        <CustomBtn><Text style={{color:"white", textAlign:"center"}}>{"인증번호\n전송"}</Text></CustomBtn>
                    </View>
                    <View style={{marginTop:10, flexDirection:"row", paddingLeft:10, alignItems:"center"}}>
                        <InputData placeholder="인증번호를 입력해주세요" placeholderTextColor="gray"></InputData>
                        <CustomBtn><Text style={{color:"white", textAlign:"center"}}>인증하기</Text></CustomBtn>
                    </View>
                </FinderBox>
            }
            { isFind?
                <PostButton onPress={()=>navigation.navigate('Login')}>
                    <Text style={{fontSize:25, color:"black", textAlign:"center"}}>로그인하기</Text>
                </PostButton>
                :
                <PostButton onPress={()=>setFind(true)}>
                    <Text style={{fontSize:25, color:"black", textAlign:"center"}}>확인</Text>
                </PostButton>
            }
            <Text onPress={()=>navigation.navigate('FinderPW')} style={{fontSize: 15, fontWeight:"bold"}}>
                비밀번호 찾기
            </Text>
        </LinearGradient>
    )
}

const FinderBox = styled.View`
    width : 90%;
    height : 350px;
    padding : 20px 20px 10px 20px;
    background-color : white;
`;
const FinderTitle = styled.TextInput`
    width : 100%;
    height : 65px;
    color : black;
    padding-bottom : 20px;
    margin-bottom : 40px;
    text-align : center;
    font-size : 30px;
    font-weight : bold;
    border-bottom-width : 7px;
	border-bottom-color : #7f8c8d;
`;
const InputData = styled.TextInput`
    width : 70%;
    height : 55px;
    padding-left : 15px;
    border : 2px #7f8c8d ; 
	font-size : 15px;
`;
const CustomBtn = styled.TouchableOpacity`
    width : 25%;
    height : 55px;
    background-color : #4F92E0;
    justify-content : center;
`;
const PostButton = styled.TouchableOpacity`
    width : 88%;
    height : 60px;
    margin : 30px 0;
    background-color : white;
    justify-content : center;
    border-radius : 30px;
`;

export default FinderID;