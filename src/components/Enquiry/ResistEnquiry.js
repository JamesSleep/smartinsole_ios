import React, { useState, useEffect } from "react";
import { View, Text, AsyncStorage, TextInput, TouchableWithoutFeedback, Keyboard, Dimensions } from "react-native";
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import IconFA from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/AntDesign';
import styled from 'styled-components';
import Axios from 'axios';
import Modal from 'react-native-modal';
import { ScrollView } from "react-native-gesture-handler";
import { API_URL } from "../../../api";

const _WIDTH = Dimensions.get('window').width;
const _HEIGHT = Dimensions.get('window').height;

const SITE_URL = API_URL;
const API = ["/board/categories?token=","/board/write?token="];

function ResistEnquiry({navigation}) {
    const [token, setToken] = useState("");
    const [categoryArray, setCategoryArray] = useState([]);
    const [category, setCategory] = useState("문의유형선택");
    const [modalVisible, setModalVisible] = useState(false);
    const [textLength, setTextLength] = useState(0);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    useEffect(() => {
        getToken();
        if(token != "") getCategory();
    },[token]);
    
    const getToken = async () => {
        await AsyncStorage.getItem('loginInfo')
		.then(res=>{
			const data = JSON.parse(res);
			if(data != null) { setToken(data.token); } 
		})
    };
    const getCategory = async () => {
        await Axios.get(SITE_URL+API[0]+token)
        .then(res=>{ 
			if(res.data.success) {
				setCategoryArray(res.data.categories);
			} else {
				alert("토근정보를 확인해주세요");
			}
		}).catch(err=>{
			console.log("err :" + err);
		});
    }
    const post = async () => {
        const postData = JSON.stringify({
			"title" : title,
			"content" : content,
			"category" : category,
		});
        await Axios.post(SITE_URL+API[1]+token, postData,{
			headers : {	'Content-Type' : 'application/json', }
		})
        .then(res=>{
            if(res.data.success) {
                alert("문의가 완료되었습니다");
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
        <LinearGradient start={{x: 1.5, y: 0}} end={{x: 0, y: 0}} colors={['#B2FEFA', '#0ED2F7']} style={{flex:1}}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <SafeAreaView style={{flex:1, width:"100%",height:"100%"}} >
                <View style={{flex:2 ,width:"100%",height:"100%", justifyContent:"center",alignItems:"center", marginTop:30}}>
                    <IconFA name="angle-left" style={{position:"absolute",left:20,top:-15,}} size={_WIDTH/11} color="#fff" onPress={()=>navigation.goBack()}/>
                    <FakeLogo/>
                </View>
                <View style={{flex:7, width:"100%",height:"100%",paddingHorizontal:_WIDTH/20, justifyContent:"flex-start",alignItems:"center", paddingBottom:40}} >
                    <Text style={{width:"90%", color:"white", textAlign:"left", fontSize:_WIDTH/21, marginBottom:5}}>문의하기</Text>
                    <EnquiryView>
                        <View style={{flex:1,justifyContent:"space-around",borderBottomWidth:2}}>
                            <ColumnTitle>문의유형</ColumnTitle>
                            <View 
                                style={{flexDirection:"row",justifyContent:"space-between"}}
                                onTouchEnd={()=>setModalVisible(!modalVisible)}
                            >
                                <Text style={{fontSize:_WIDTH/32}}>{category}</Text>
                                <Icon name="caretdown" size={_WIDTH/30} color="#7f8c8d"/>
                                <Modal style={{alignItems:"center"}} isVisible={modalVisible} onBackdropPress={()=>setModalVisible(false)}>
                                    <CategoryModal>
                                        {categoryArray.map((value,index)=>(
                                                <CategoryItem key={index} onPress={()=>setCategory(value)}>
                                                    <CategoryItemText>{value}</CategoryItemText>
                                                </CategoryItem>
                                        ))}
                                    </CategoryModal>
                                </Modal>
                            </View>
                        </View>
                        <View style={{flex:1,justifyContent:"space-around", paddingTop:3, borderBottomWidth:2}}>
                            <ColumnTitle>문의내용</ColumnTitle>
                            <TextInput onChangeText={text=>setTitle(text)} textAlign="left" placeholder="문의글 제목 입력" placeholderTextColor="gray" style={{fontSize:_WIDTH/32,}}/>
                        </View>
                        <View style={{flex:3}}>
                            <TextInput onChangeText={text=>{setContent(text),setTextLength(text.length)}} 
                                multiline={true} blurOnSubmit={true} style={{height:"80%", fontSize:_WIDTH/32}}
                                textAlignVertical="top"
                            />
                            <View style={{ marginTop:12, borderTopWidth:2}}>
                                <Text style={{fontSize:_WIDTH/34}}>{`${textLength}/200자`}</Text>
                            </View>    
                        </View>
                    </EnquiryView>
                    <ResistBtn onPress={()=>post()}>
                        <Text style={{textAlign:"center", fontSize:_WIDTH/21}}>등록하기</Text>
                    </ResistBtn>
                </View>
            </SafeAreaView>
            </TouchableWithoutFeedback>
        </LinearGradient>
    )
}

const FakeLogo = styled.View`
    width : ${_WIDTH/5}px;
    height : ${_WIDTH/5}px;
    background-color : white;
    border-radius : ${_WIDTH/20}px;
`;
const EnquiryView = styled.View`
    width : 100%;
    height : 70%;
    padding : ${_WIDTH/30}px ${_WIDTH/13}px;
    margin-bottom : 20px;
    border-radius : 20px;
    background-color : white;
`;
const ResistBtn = styled.TouchableOpacity`
    width : 100%;
    height : ${_HEIGHT/14}px;
    justify-content : center;
    background-color : white;
    border-radius : 30px;
`;
const ColumnTitle = styled.Text`
    font-size : ${_WIDTH/32}px;
`;
const CategoryModal = styled.View`
    width : 90%;
    height : 200px;
    background-color : white;
    justify-content : space-around;
`;
const CategoryItem = styled.TouchableOpacity`
    width : 100%;
`;
const CategoryItemText = styled.Text`
    text-align : center;
`;

export default ResistEnquiry;