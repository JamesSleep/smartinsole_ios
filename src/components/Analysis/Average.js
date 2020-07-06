import React, { useState, useEffect } from 'react';
import { View, AsyncStorage, Dimensions } from 'react-native';
import styled from 'styled-components';
import Swiper from 'react-native-swiper';
import Modal from 'react-native-modal';
import Calendar from './Calendar';
import Chart from './Chart';
import InsoleData from '../Insole/InsoleData';
import Axios from 'axios';
import { API_URL } from '../../../api';

const _WIDTH = Dimensions.get('window').width;
const _HEIGHT = Dimensions.get('window').height;

const WEEK_ENUM = ["첫째주","둘째주","셋째주","넷째주","다섯째주","여섯째주"];
const FAKE_DB = { 
    left : {temp:[18,25,45,41,42], press:[353, 828, 2120, 2577, 2601, 3082, 3349, 3357, 3494]} , 
    right : {temp:[27,21,32,33,42], press:[157, 230, 1481, 1776, 2213, 2536, 3640, 3756, 4021]} 
};

const SITE_URL = API_URL;
const API = "/user/data";

function Average() {
    const [tab, setTab] = useState(true);
    const [swap, setSwap] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [year, setYear] = useState(new Date().getFullYear());
    const [month, setMonth] = useState(new Date().getMonth()+1);
    const [date, setDate] = useState(new Date().getDate());
    const [week, setWeek] = useState([]);
    const [selectWeek, setSelectWeek] = useState(0);
    const [insoleData, setInsoleData] = useState({});
    const fill = 'rgb(134, 65, 244)';
    useEffect(() => {
        weekOfMonth();
        getInsoleData();
    },[tab,selectWeek]);
    const monthCycle = (mon) => {
        if (mon === 4 || mon === 6 || mon === 9 || mon === 11) return 30;
        else if (mon === 2) { if (year%4 === 0) return 29; else return 28; }
        else return 31;
    }
    const weekOfMonth = () => {
        const newDate = new Date(`${year}-${month < 10 ? "0"+month:month}-01`);
        const last = monthCycle(month);
        let temp = newDate.getDate();
        let day = newDate.getDay();
        let weekObj = [];
        for(let i=0; i<6; i++) {
            if(last-temp < 6) {
                weekObj.push({firstDay: temp, lastDay: last});
                break;
            }
            weekObj.push({firstDay: temp, lastDay: temp+6-day});
            temp = temp + 6 - day + 1;
            day = 0;
        }
        setWeek(weekObj);
    }
    const findWeek = () => {
        for (let i=0; i<week.length; i++) {
            if(date >= week[i].firstDay && date <= week[i].lastDay) {
                setSelectWeek(i);
            }
        }
    }
    const getInsoleData = async () => {
        await AsyncStorage.getItem('loginInfo')
		.then(res=>{
			const data = JSON.parse(res);
			if(data != null) { loadUserData(data.token); } 
		})
    }
    const loadUserData = async (storageToken) => {
        let mon = month < 10 ? "0"+month : month ;
        let s_day, e_day;
        if(tab) {
            s_day = "01";
            e_day = monthCycle(month);
        } else {
            s_day = week[selectWeek].firstDay < 10 ? "0"+week[selectWeek].firstDay : week[selectWeek].firstDay;
            e_day = week[selectWeek].lastDay < 10 ? "0"+week[selectWeek].lastDay : week[selectWeek].lastDay;
        }
        const start_date = `${year}-${mon}-${s_day}`;
        const end_date = `${year}-${mon}-${e_day}`;
        console.log(start_date);
        console.log(end_date);
        await Axios.get(`${SITE_URL}${API}?to=${end_date}&from=${start_date}&token=${storageToken}`)
        .then(res=>{ 
			if(res.data.success) {
                console.log(res.data);
                setInsoleData(res.data.data[0]);
			} else {
				alert("토큰정보가 만료되었습니다");
			}
		}).catch(err=>{
			console.log("err :" + err);
		});
	}
    return (
        <View style={{width:"100%",height:"100%", justifyContent:"center",alignItems:"center"}}>
            <View style={{flexDirection:"row",marginTop:_WIDTH/7}}>
                <AvgTab tab={tab} direction onPress={()=>setTab(true)}>
                    <AvgText tab={tab}>월간평균</AvgText>
                </AvgTab>
                <AvgTab tab={!tab} direction={false} onPress={()=>setTab(false)}>
                    <AvgText tab={!tab}>주간평균</AvgText>
                </AvgTab>
            </View>
            <AvgDataView>
                <SelectDate onPress={()=>setModalVisible(true)}>
                    <Modal style={{alignItems:"center"}} isVisible={modalVisible} onBackdropPress={()=>setModalVisible(false)}> 
                        <Calendar 
                            tab={tab}
                            year={year}
                            month={month}
                            week={week}
                            setYear={setYear} 
                            setMonth={setMonth}
                            setModalVisible={setModalVisible}
                            setSelectWeek={setSelectWeek}
                        />
                    </Modal>
                    {   tab?
                        <>
                            <DateText>{`${year}년 ${month}월`}</DateText>
                            <DateText2>{`${month}월1일~${month}월${monthCycle(month)}일`}</DateText2>
                        </>
                        :
                        <>
                            <DateText>{`${month}월 ${WEEK_ENUM[selectWeek]}`}</DateText>
                            <DateText2>{`${month}월${week[selectWeek].firstDay}일~${month}월${week[selectWeek].lastDay}일`}</DateText2>
                        </> }
                </SelectDate>
                <DataView contentContainerStyle={{alignItems:"center"}}>
                    <Swiper height={_HEIGHT*0.37} loop={false} onMomentumScrollEnd={(e, state, context) => {
                        state.index === 1?setSwap(true):setSwap(false);
                    }}>
                        <FootDataView><InsoleData name={"temp"} data={insoleData}/></FootDataView>
                        <FootDataView><InsoleData name={"press"} data={insoleData}/></FootDataView>
                    </Swiper>
                    {!tab?
                        <ChartView>
                            <Chart swap={swap} selectWeek={selectWeek}/>
                        </ChartView>
                    :null}
                </DataView>
            </AvgDataView>
        </View>
    )
}

const AvgTab = styled.TouchableOpacity`
    width : 35%;
    height : ${_WIDTH/15}px;
    justify-content : center;
    align-items : center;
    background-color : ${props=> props.tab?"#4F92E0":"#d1ccc0"} ;
    ${props=> props.direction?
        "border-top-left-radius : 30px; border-bottom-left-radius : 30px;":
        "border-top-right-radius : 30px; border-bottom-right-radius : 30px;"}
`;
const AvgText = styled.Text`
    font-size : ${_WIDTH/27}px;
    text-align : center;
    color : ${props=> props.tab?"#fff":"black"} ;
`;
const AvgDataView = styled.View`
    width : 90%;
    height : 100%;
    justify-content : center;
    align-items : center;
`;
const SelectDate = styled.TouchableOpacity`
    width : 100%;
    height : ${_WIDTH/7}px;
    margin-top : 10px;
    background-color : #4F92E0;
    border-top-left-radius : 10px;
    border-top-right-radius : 10px;
    justify-content : center;
    align-items : center;
`;
const DataView = styled.ScrollView`
    width : 100%;
    padding : 3% 3% 0% 3%;
    margin-bottom : ${_HEIGHT/12}px;
    background-color : #d1ccc0;
    border-bottom-left-radius : 10px;
    border-bottom-right-radius : 10px;
`;
const FootDataView = styled.View`
    width : 100%;
    height : ${_WIDTH/2}px;
    background-color : #fff;
`;
const ChartView = styled.View`
    width : 95%;
    height : ${_HEIGHT/3}px;
    margin-bottom : 30px;
    background-color : #fff;
`;
const DateText = styled.Text`
    font-size : ${_WIDTH/19}px;
    text-align : center;
    color : white;
`;
const DateText2 = styled.Text`
    font-size : ${_WIDTH/28}px;
    text-align : center;
    color : white;
`;

export default Average;