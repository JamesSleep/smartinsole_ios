import React, { useState } from 'react';
import {  View, Text , ToastAndroid, AsyncStorage } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome';
import styled from 'styled-components';
import Axios from 'axios';

const SITE_URL = "http://foot.chaeft.com:8080/api";
const JOIN_API = "/auth/signup";

function Join({navigation}) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [userName, setUserName] = useState("");
    const [phoneNum, setPhoneNum] = useState("");
    const [gender, setGender] = useState(1);
    const [weight, setWeight] = useState("");
    const [age, setAge] = useState("");
    const [isCheck, setCheck] = useState({1:false,2:false,3:false,4:false});

    //post 실행시 빈값("")도 넘어감 수정필요
    const post = async () => {
        if(isCheck[1]*isCheck[2]*isCheck[3]*isCheck[4]) { //체크박스검사
            const postData = JSON.stringify({
                "signType" : "mail",
                "email" : email,
                "password" : password,
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
                console.log(res.data);
                if(res.data.success) { //성공하면 자동로그인, 블루투스설정화면
                    AsyncStorage.setItem("loginInfo",postData);
                    navigation.navigate("Bluetooth");
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
        } else {
            //android only : toast
            ToastAndroid.show("사용자 정보 제공 동의에 체크해주세요",ToastAndroid.SHORT);
        }
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
                <Text style={{fontSize:20, color:"#fff", fontWeight:"bold"}}>회원가입하기</Text>
            </View>
            <Form>
                <MemberInfo>
                    <InfoColumn>
                        <InfoTitle>이메일 주소</InfoTitle>
                        <InputData
                            onChangeText={text=>setEmail(text)} 
                            placeholder="이메일을 입력해주세요" 
                            placeholderTextColor="gray"
                        />
                        {checkInput("email")}
                    </InfoColumn>
                    <InfoColumn>
                        <InfoTitle>비밀번호</InfoTitle>
                        <InputData 
                            secureTextEntry
                            placeholder="비밀번호를 입력해주세요"
                            placeholderTextColor="gray"
                            onChangeText={text=>setPassword(text)}
                        />
                        {checkInput("password")}
                        <Text style={{opacity:0.4, position:"absolute", right:0, bottom:-20}}>숫자&영문 6-20자</Text>
                    </InfoColumn>
                    <InfoColumn>
                        <InfoTitle>이름</InfoTitle>
                        <InputData 
                            placeholder="이름을 입력해주세요" 
                            placeholderTextColor="gray"
                            onChangeText={text=>setUserName(text)}
                        />
                        {checkInput("name")}
                    </InfoColumn>
                    <InfoColumn>
                        <InfoTitle>핸드폰번호</InfoTitle>
                        <RowView>
                            <InputData 
                                placeholder="핸드폰번호를 입력해주세요"
                                placeholderTextColor="gray"
                                onChangeText={text=>setPhoneNum(text)}
                            />
                            <CustomBtn>
                                <BtnText>{"인증번호\n전송"}</BtnText>
                            </CustomBtn>
                        </RowView>
                        <RowView>
                            <InputData placeholder="인증번호를 입력해주세요" placeholderTextColor="gray"></InputData>
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
                            placeholder="체중을 입력해주세요 ( 단위 : kg )" 
                            onChangeText={text=>setWeight(text)}
                            placeholderTextColor="gray"
                        />
                    </InfoColumn>
                    <InfoColumn>
                        <InfoTitle>나이</InfoTitle>
                        <InputData 
                            placeholder="나이를 입력해주세요" 
                            placeholderTextColor="gray"
                            onChangeText={text=>setAge(text)}
                        />
                    </InfoColumn>
                </MemberInfo>
                <AgreeForm>
                    <InfoTitle>사용을 위한 동의가 필요합니다.</InfoTitle>
                    <RowView>
                        <CheckBox>
                            {isCheck[1]?
                            <Icon name="check-square-o" size={23} onPress={()=>setCheck({...isCheck, 1:false})}/>
                            :<Icon name="square-o" size={23} onPress={()=>setCheck({...isCheck, 1:true})}/>}
                        </CheckBox>
                        <Text style={{color:"#4834d4"}}>생체 데이터 전송 동의(필수)</Text>
                    </RowView>
                    <RowView>
                        <CheckBox>
                            {isCheck[2]?
                            <Icon name="check-square-o" size={23} onPress={()=>setCheck({...isCheck, 2:false})}/>
                            :<Icon name="square-o" size={23} onPress={()=>setCheck({...isCheck, 2:true})}/>}
                        </CheckBox>
                        <Text style={{color:"#4834d4"}}>개인정보 수집 및 이용동의(필수)</Text>
                    </RowView>
                    <RowView>
                        <CheckBox>
                            {isCheck[3]?
                            <Icon name="check-square-o" size={23} onPress={()=>setCheck({...isCheck, 3:false})}/>
                            :<Icon name="square-o" size={23} onPress={()=>setCheck({...isCheck, 3:true})}/>}
                        </CheckBox>
                        <Text>이용약관 동의</Text>
                    </RowView>
                    <RowView>
                        <CheckBox>
                            {isCheck[4]?
                            <Icon name="check-square-o" size={23} onPress={()=>setCheck({...isCheck, 4:false})}/>
                            :<Icon name="square-o" size={23} onPress={()=>setCheck({...isCheck, 4:true})}/>}
                        </CheckBox>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
                        <Text>개인정보 취급 위탁 동의</Text>
                    </RowView>
                </AgreeForm>
                <View style={{alignItems:"center", marginVertical:20}}>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         
                    <PostBtn onPress={()=>post()}><Text style={{textAlign:"center", fontSize: 20}}>다음</Text></PostBtn>
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
    padding : 50px 30px 0px 30px;
`;
const AgreeForm = styled.View`
    padding : 10px 0px 25px 15px;
    background-color : #dcdde1;
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
    margin : 10px 1px 0px 1px;
    background-color : #fff;
    justify-content : center;
    border-radius : 35px;
`;
const ErrorMsg = styled.Text`
    color : red;
    font-size : 12px;
`;
const CheckBox = styled.TouchableOpacity`
    width : 20px;
    margin-right : 10px;
`;
export default Join;