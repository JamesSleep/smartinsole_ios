import React, { useState } from 'react';
import {  View, Text , ToastAndroid, AsyncStorage } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome';
import styled from 'styled-components';
import Axios from 'axios';

const SITE_URL = "http://foot.chaeft.com:8080/api";
const JOIN_API = "/user/mod?token=";

function ProfileUpdate({navigation, route}) {
    const { userInfo } = route.params;
    const [userName, setUserName] = useState(userInfo.nickname);
    const [phoneNum, setPhoneNum] = useState(userInfo.num);
    const [gender, setGender] = useState(userInfo.sex);
    const [weight, setWeight] = useState(userInfo.weight.toString());
    const [age, setAge] = useState(userInfo.age.toString());

    //post 실행시 빈값("")도 넘어감 수정필요
    const post = async () => {
        const postData = JSON.stringify({
            "nickname" : userName,
            "number" : phoneNum,
            "sex" : gender,
            "weight" : Number(weight),
            "age" : Number(age)
        });
        await Axios.post(SITE_URL+JOIN_API, postData, {
            headers : {
                'Content-Type' : 'application/json',
            }
        }).then(res=>{
            if(res.data.success) { 
                navigation.navigate("Profile");
            } else {
                if(res.data.message === "number already used") {
                    ToastAndroid.show("이미 가입된 핸드폰번호입니다.",ToastAndroid.SHORT);
                } else if(res.data.message === "email already used") {
                    ToastAndroid.show("이미 가입된 이메일입니다.",ToastAndroid.SHORT);
                } else {
                    ToastAndroid.show("관리자에게 문의하세요.",ToastAndroid.SHORT);
                }
            }
        }).catch(err=>{
            console.log("err :" + err);
            ToastAndroid.show(JSON.stringify(err),ToastAndroid.SHORT);
        });
    }

    //유효성검사
    const checkInput = (token) => {
        switch(token) {
            case "email" : {
                if(email !== "" && (email.indexOf('@') === -1 || email.indexOf('.') === -1 || 
                email.length < 7)) {
                    return <ErrorMsg>메일주소를 확인하세요</ErrorMsg>;
                } 
                break;
            }
            case "password" : {
                let asciiNum = false, asciiUpper = false, asciiLower = false;
                for (let i=0; i<password.length; i++) {
                    if(password.charCodeAt(i) > 47 && password.charCodeAt(i) < 58) {
                        asciiNum = true;
                    }
                    if(password.charCodeAt(i) > 96 && password.charCodeAt(i) < 122) {
                        asciiLower = true;
                    }
                    if(password.charCodeAt(i) > 64 && password.charCodeAt(i) < 91) {
                        asciiUpper = true;
                    }
                }
                if(password !== "" && (password.length < 5 || password.length > 21 || 
                    !asciiNum*(asciiLower+asciiUpper))) {
                    return <ErrorMsg>비밀번호는 6~20자, 영문&숫자조합입니다.</ErrorMsg>;
                }
                break;
            }
            case "name" : {
                let asciiEng = false;
                for (let i=0; i<userName.length; i++) {
                    if(userName.charCodeAt(i) < 12000) { asciiEng = true; }
                }
                if(userName !== "" && (userName.length < 2 || userName.length > 5 || asciiEng)) {
                    return <ErrorMsg>이름을 확인해주세요.</ErrorMsg>;
                }
                break;
            }
            default : break;
        }
    }
    return (
        <LinearGradient start={{x: 1.5, y: 0}} end={{x: 0, y: 0}} colors={['#B2FEFA', '#0ED2F7']} style={{flex:1}}>
             <SafeAreaView style={{flex:1}}>
            <View style={{flexDirection:"row", justifyContent:"center",alignItems:"center", height:80}}>
                <Icon name="angle-left" size={40} color="#fff" style={{position:"absolute",left:20}}
                    onPress={()=>navigation.goBack()}/>
                <Text style={{fontSize:20, color:"#fff", fontWeight:"bold"}}>프로필 수정하기</Text>
            </View>
            <Form>
                <MemberInfo>
                    <InfoColumn>
                        <InfoTitle>비밀번호</InfoTitle>
                        <PasswordBtn onPress={()=>navigation.navigate('ModifyPW')}>
                            <Text style={{color:"#fff", textAlign:"center", fontSize: 15}}>비밀번호 변경하기</Text>
                        </PasswordBtn>
                    </InfoColumn>
                    <InfoColumn>
                        <InfoTitle>이름</InfoTitle>
                        <InputData 
                            value={userName}
                            onChangeText={text=>setUserName(text)}
                        />
                        {checkInput("name")}
                    </InfoColumn>
                    <InfoColumn>
                        <InfoTitle>핸드폰번호</InfoTitle>
                        <RowView>
                            <InputData 
                                value={phoneNum}
                                onChangeText={text=>setPhoneNum(text)}
                            />
                            <CustomBtn>
                                <BtnText>{"인증번호\n전송"}</BtnText>
                            </CustomBtn>
                        </RowView>
                        <RowView>
                            <InputData placeholder="인증번호를 입력해주세요"></InputData>
                            <CustomBtn>
                                <Text style={{color:"white",fontSize:13, textAlign:"center"}}>인증하기</Text>
                            </CustomBtn>
                        </RowView>
                    </InfoColumn>
                    <InfoColumn>
                        <InfoTitle>성별</InfoTitle>
                        <SegmentView>
                            {gender === 1? <SegBtnAct><SegText>남자</SegText></SegBtnAct>
                            : <SegBtnNoneAct onPress={()=>setGender(1)}><SegTextNoneAct>남자</SegTextNoneAct></SegBtnNoneAct>}
                            {gender === 2? <SegBtnAct><SegText>여자</SegText></SegBtnAct>
                            : <SegBtnNoneAct onPress={()=>setGender(2)}><SegTextNoneAct>여자</SegTextNoneAct></SegBtnNoneAct>}
                        </SegmentView>
                    </InfoColumn>
                    <InfoColumn>
                        <InfoTitle>체중</InfoTitle>
                        <InputData 
                            value={weight}
                            onChangeText={text=>setWeight(text)}
                        />
                    </InfoColumn>
                    <InfoColumn>
                        <InfoTitle>나이</InfoTitle>
                        <InputData 
                            value={age}
                            onChangeText={text=>setAge(text)}
                        />
                    </InfoColumn>
                </MemberInfo>
                <View style={{alignItems:"center", marginVertical:20}}>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         
                    <PostBtn onPress={()=>post()}><Text style={{textAlign:"center", fontSize: 20}}>프로필 수정하기</Text></PostBtn>
                </View>
            </Form>
            </SafeAreaView>
        </LinearGradient>	
    )
}

const Form = styled.ScrollView`
    margin : 0 20px;
`;
const MemberInfo = styled.View`
    background-color : #fff;
    padding : 30px 30px 0px 30px;
`;
const InfoColumn = styled.View`
    margin-bottom : 20px;
`;
const InfoTitle = styled.Text`
    font-size : 18px;
    font-weight : bold;
`;
const InputData = styled.TextInput`
    width : 100%;
    height : 40px;
    color : black;
    font-size : 15px;
    border-bottom-width : 1px;
    border-bottom-color : black;
`;
const RowView = styled.View`
    width : 100%;
    margin-bottom : 3px;
    flex-direction : row;
    align-items : center;
`;
const SegmentView = styled.View`
    width : 100%;
    flex-direction : row;
    justify-content : center;
`;
const BtnText = styled.Text`
    color : white;
    font-size : 14px;
    text-align : center;
`;
const PasswordBtn = styled.TouchableOpacity`
    margin-top : 10px;
    width : 50%;
    height : 40px;
    background-color : #4F92E0;
    justify-content : center;
`;
const CustomBtn = styled.TouchableOpacity`
    width : 90px;
    height : 40px;
    position : absolute;
    right : 0;
    bottom : 0;
    background-color : #4F92E0;
    justify-content : center;
`;
const SegBtnAct = styled.TouchableOpacity`
    width : 42%;
    height : 60px;
    margin : 10px 1px 0px 1px;
    background-color : #fff;
    justify-content : center;
    border : 1px solid #4F92E0;
`;
const SegBtnNoneAct = styled.TouchableOpacity`
    width : 42%;
    height : 60px;
    margin : 10px 1px 0px 1px;
    background-color : #fff;
    justify-content : center;
    border : 1px solid #dcdde1;
`;
const SegText = styled.Text`
    color : black;
    font-size : 20px;
    text-align : center;
`;
const SegTextNoneAct = styled.Text`
    color : #dcdde1;
    font-size : 20px;
    text-align : center;
`;
const PostBtn = styled.TouchableOpacity`
    width : 80%;
    height : 60px;
    margin : 0px 1px 20px 1px;
    background-color : #fff;
    justify-content : center;
    border-radius : 35px;
`;
const ErrorMsg = styled.Text`
    color : red;
    font-size : 12px;
`;

export default ProfileUpdate;