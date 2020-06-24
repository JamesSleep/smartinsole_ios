import React, { useState, useEffect } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import styled from 'styled-components';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/AntDesign';
import { View, Text, ScrollView, AsyncStorage, Dimensions } from 'react-native';
import Axios from 'axios';

const _WIDTH = Dimensions.get('window').width;
const _HEIGHT = Dimensions.get('window').height;

const SITE_URL = "http://foot.chaeft.com:8080/api";
const API = ["/board/list?start=1&token=","/comment/list"];

function Enquiry({navigation}) {
    const [token, setToken] = useState("");
    const [enquiryArray, setEnquiryArray] = useState([]);
    const [enqiuryLen, setLen] = useState(enquiryArray.length);
    useEffect(() => {
        getToken();
        if(token != "") getEnquiryList();
    },[token]);
    
    const getToken = async () => {
        await AsyncStorage.getItem('loginInfo')
		.then(res=>{
			const data = JSON.parse(res);
			if(data != null) { setToken(data.token); } 
		})
    };
    const getEnquiryList = async () => {
        await Axios.get(SITE_URL+API[0]+token)
        .then(res=>{
			if(res.data.success) {
                const arr = res.data.data;
                arr.map(async (value,index)=>{
                    value.content = await Axios.get(SITE_URL+`/board/get?id=${value.id}&token=${token}`)
                    .then(res=>{
                        if(res.data.success) { const content = res.data.data; return content.content; } 
                        else alert("토근정보를 확인해주세요");
                    });
                    value.commentArray =value.comments?await Axios.get(SITE_URL+API[1]+`?id=${value.id}&token=${token}`)
                    .then(res=>{
                        if(res.data.success) { const comment = res.data.data; return comment; } 
                        else alert("토근정보를 확인해주세요");
                    }):null
                    value.stretch = false;
                });
                setEnquiryArray(arr);
			} else {
				alert("토근정보를 확인해주세요");
			}
		}).catch(err=>{
			console.log("err :" + err);
		});
    }
    const deletePost = async (id) => {
        const postData = JSON.stringify({ "id" : id });
        await Axios.post(SITE_URL+"/board/del?token="+token, postData,{
			headers : {	'Content-Type' : 'application/json', }
		})
        .then(res=>{
            if(res.data.success) {
                alert("삭제완료");
                navigation.reset({
					index:0,
					routes:[{name:"Enquiry"}]
				});
            } else {
                alert(res.data.message);
            }
        });
    }

    return (
        <LinearGradient start={{x: 1.5, y: 0}} end={{x: 0, y: 0}} colors={['#B2FEFA', '#0ED2F7']} style={{flex:1}} >
             <SafeAreaView style={{flex:1, width:"100%",height:"100%"}} >
                <View style={{flex:1 ,width:"100%",height:"100%", justifyContent:"center",alignItems:"center", marginTop:_HEIGHT/40}}>
                    <FakeLogo/>
                </View>
                <View style={{flex:4, width:"100%",height:"100%",paddingHorizontal:_WIDTH/20, justifyContent:"flex-start",alignItems:"center", paddingBottom:_WIDTH/20}}>
                    <Text style={{width:"90%", color:"white", textAlign:"left", fontSize:_WIDTH/22, marginBottom:5}}>나의 문의글</Text>
                    <EnquiryView>
                        <ScrollView>
                            <EnquiryList>
                               {enquiryArray.length > 0 ?
                                enquiryArray.map((value,index)=>(
                                    <MyEnquiry key={index}>
                                        <Category>{value.category}</Category>
                                        <MyEnquiryColumn onTouchEnd={()=>setEnquiryArray(
                                            enquiryArray.map((item,i)=>(
                                                i === index?{...item, stretch:!item.stretch}:item
                                            ))
                                        )}>
                                            <Title>{value.title}</Title>
                                            <View style={{flexDirection:"row", alignItems:"center"}}>
                                                <Condition>{value.comments?"답변완료":"답변대기"}</Condition>
                                                <Icon name={value.stretch?"caretup":"caretdown"} size={_WIDTH/30} color="#7f8c8d"/>
                                            </View>
                                        </MyEnquiryColumn>
                                        {
                                            value.stretch?
                                            <>
                                            <MyEnquiryView><Text style={{fontSize:_WIDTH/27}}>{value.content}</Text></MyEnquiryView>
                                            {   value.comments?
                                                <AnswerView>    
                                                    <Text style={{fontSize:_WIDTH/24, fontWeight:"bold"}}>답변완료</Text>
                                                    {
                                                        value.commentArray.map((comment,index)=>(
                                                            <Text key={index} style={{fontSize:_WIDTH/27, marginVertical:5}}>{comment.content}</Text>
                                                        ))
                                                    }
                                                </AnswerView>
                                                :null
                                            }
                                            <BtnView>
                                                <ModifyBtn onPress={()=>navigation.navigate("ModifyEnquiry",{data:value})}>
                                                    <Text style={{textAlign:"center", fontSize:_WIDTH/27, color: "white"}}>수정하기</Text>
                                                </ModifyBtn>
                                                <ModifyBtn onPress={()=>deletePost(value.id)}>
                                                    <Text style={{textAlign:"center", fontSize:_WIDTH/27, color: "white"}}>삭제하기</Text>
                                                </ModifyBtn>
                                            </BtnView>
                                            </>
                                            : null
                                        }
                                    </MyEnquiry>
                                )):
                                    <View style={{width:"100%",height:100,justifyContent:"center",alignItems:"center"}}>
                                        <Text style={{fontSize:_WIDTH/25}}>문의글이 없습니다</Text>
                                    </View>
                                }
                            </EnquiryList>
                            <ResistBtn onPress={()=>navigation.navigate("ResistEnquiry")}>
                                <Text style={{textAlign:"center", fontSize:_WIDTH/22}}>문의하기</Text>
                            </ResistBtn>
                        </ScrollView>
                    </EnquiryView>
                </View>
            </SafeAreaView>
        </LinearGradient>
    )
}

const FakeLogo = styled.View`
    width : ${_WIDTH/5}px;
    height : ${_WIDTH/5}px;
    background-color : white;
    border-radius : ${_WIDTH/25}px;
`;
const EnquiryView = styled.View`
    width : 100%;
    height : 90%;
`;
const EnquiryList = styled.View`
    width : 100%;
    padding : 7% 3%;
    background-color : white;
    border-radius : 20px;
    margin-bottom : ${_WIDTH/20}px;
`;
const ResistBtn = styled.TouchableOpacity`
    width : 100%;
    height : ${_HEIGHT/13}px;
    justify-content : center;
    background-color : white;
    border-radius : 30px;
`;
const MyEnquiry = styled.View`
    width : 100%;
    margin : 10px 0;
    align-items : center;
`;
const Category = styled.Text`
    width : 90%;
    margin-bottom : 1%;
    text-align : left;
    font-size : ${_WIDTH/32}px;
`;
const MyEnquiryColumn = styled.View`
    width : 90%;
    height : ${_HEIGHT/25}px;
    flex-direction : row;
    justify-content : space-between;
    align-items : center;
    border-bottom-width : 2px;
`;
const Title = styled.Text`
    font-size : ${_WIDTH/28}px;
`;
const Condition = styled.Text`
    font-size : ${_WIDTH/30}px;
    margin-right : 5px;
`;
const MyEnquiryView = styled.View`
    width : 90%;
    padding : 20px 0px;
    border-bottom-width : 1px;
`;
const AnswerView = styled.View`
    width : 90%;
    padding : ${_WIDTH/20}px 0px;
`;
const BtnView = styled.View`
    width : 90%;
    padding : 5px;
    flex-direction : row;
    justify-content : center;
    border-bottom-width : 2px;
`;
const ModifyBtn = styled.TouchableOpacity`
    width : 30%;
    padding : 3px;
    margin : 0 10px;
    justify-content : center;
    background-color : #4F92E0;
    border-radius : 30px;
`;

export default Enquiry;