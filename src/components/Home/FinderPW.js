import React, { useState } from 'react';
import {  View, Text , TouchableWithoutFeedback, Keyboard, Dimensions } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import styled from 'styled-components';

const _WIDTH = Dimensions.get('window').width;
const _HEIGHT = Dimensions.get('window').height;

function FinderPW({navigation}) {
    const [tempPW, setTemp] = useState(false);
    return (
        <LinearGradient start={{x: 1.5, y: 0}} end={{x: 0, y: 0}} colors={['#B2FEFA', '#0ED2F7']} style={{flex:1,justifyContent:"center",alignItems:"center"}}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={{flex:1, width:"100%", height:"100%", justifyContent:"center",alignItems:"center"}}>
                    <Icon name="angle-left" size={_WIDTH/13} color="#fff" style={{position:"absolute",left:20,top:10}} onPress={()=>navigation.goBack()}/>
                    <FinderBox>
                        <FinderTitle editable={false} value={"비밀번호 찾기"} />
                        <Text style={{fontSize:_WIDTH/23, fontWeight:"bold", paddingLeft:10}}>이메일주소를 입력해주세요</Text>
                        <Text style={{fontSize:_WIDTH/30, paddingLeft:10,marginBottom:_HEIGHT/35, color:"#95a5a6"}}>가입했던 이메일로 임시 비밀번호가 발급됩니다</Text>
                        <View style={{marginTop:10, flexDirection:"row", paddingLeft:10, alignItems:"center"}}>
                            <InputData placeholder="이메일주소를 입력해주세요" placeholderTextColor="gray"></InputData>
                        </View>
                    </FinderBox>
                    {   
                        tempPW?
                        <PostButton activeOpacity={1}>
                            <Text style={{fontSize:_WIDTH/20, color:"#95a5a6", textAlign:"center", opacity:0.7}}>임시 비밀번호 전송</Text>
                        </PostButton>
                        :
                        <PostButton onPress={()=>setTemp(true)}>
                            <Text style={{fontSize:_WIDTH/20, color:"black", textAlign:"center"}}>임시 비밀번호 전송</Text>
                        </PostButton>   
                    }
                    {   
                        tempPW?
                        <PostButton onPress={()=>navigation.navigate('Login')}>
                            <Text style={{fontSize:_WIDTH/20, color:"black", textAlign:"center"}}>로그인하기</Text>
                        </PostButton>   
                        :null  
                    }
                </View>
            </TouchableWithoutFeedback>
        </LinearGradient>
    )
}

const FinderBox = styled.View`
    width : 90%;
    height : ${_HEIGHT*0.4}px;
    padding : 4% 4% 2% 4%;
    background-color : white;
`;
const FinderTitle = styled.TextInput`
    width : 100%;
    height : ${_HEIGHT/12}px;
    color : black;
    padding-bottom : ${_WIDTH/30}px;
    margin-bottom : ${_WIDTH/15}px;
    text-align : center;
    font-size : ${_WIDTH/16}px;
    font-weight : bold;
    border-bottom-width : ${_WIDTH/70}px;
	border-bottom-color : #7f8c8d;
`;
const InputData = styled.TextInput`
    width : 95%;
    height : ${_HEIGHT/15}px;
    padding-left : ${_WIDTH/25}px;
    border : 2px #7f8c8d ; 
	font-size : ${_WIDTH/32}px;
`;
const PostButton = styled.TouchableOpacity`
    width : 88%;
    height : ${_HEIGHT/12}px;
    margin : 30px 0;
    background-color : white;
    justify-content : center;
    border-radius : 30px;
`;

export default FinderPW;