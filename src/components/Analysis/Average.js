import React, { useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import styled from 'styled-components';
import Swiper from 'react-native-swiper';
import Modal from 'react-native-modal';
import Calendar from './Calendar';
import Chart from './Chart';

const WEEK_ENUM = ["첫째주","둘째주","셋째주","넷째주","다섯째주","여섯째주"];

function Average() {
    const [tab, setTab] = useState(true);
    const [swap, setSwap] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [year, setYear] = useState(new Date().getFullYear());
    const [month, setMonth] = useState(new Date().getMonth()+1);
    const [date, setDate] = useState(new Date().getDate());
    const [week, setWeek] = useState([]);
    const [selectWeek, setSelectWeek] = useState(0);
    const fill = 'rgb(134, 65, 244)';
    useEffect(() => {
        weekOfMonth();
    },[]);

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

    return (
        <View style={{width:"100%",height:"100%", justifyContent:"center",alignItems:"center"}}>
            <View style={{flexDirection:"row",marginTop:70}}>
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
                    <Swiper height={280} loop={false} onMomentumScrollEnd={(e, state, context) => {
                        state.index === 1?setSwap(true):setSwap(false);
                    }}>
                        <FootDataView><Text>온도</Text></FootDataView>
                        <FootDataView><Text>압력</Text></FootDataView>
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
    height : 30px;
    justify-content : center;
    align-items : center;
    background-color : ${props=> props.tab?"#4F92E0":"#d1ccc0"} ;
    ${props=> props.direction?
        "border-top-left-radius : 30px; border-bottom-left-radius : 30px;":
        "border-top-right-radius : 30px; border-bottom-right-radius : 30px;"}
`;
const AvgText = styled.Text`
    font-size : 15px;
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
    height : 60px;
    margin-top : 10px;
    background-color : #4F92E0;
    border-top-left-radius : 10px;
    border-top-right-radius : 10px;
    justify-content : center;
    align-items : center;
`;
const DataView = styled.ScrollView`
    width : 100%;
    padding : 10px 10px 0px 10px;
    margin-bottom : 60px;
    background-color : #d1ccc0;
    border-bottom-left-radius : 10px;
    border-bottom-right-radius : 10px;
`;
const FootDataView = styled.View`
    width : 100%;
    height : 240px;
    margin-bottom : 40px;
    background-color : #fff;
`;
const ChartView = styled.View`
    width : 95%;
    height : 250px;
    margin-bottom : 20px;
    background-color : #fff;
`;
const DateText = styled.Text`
    font-size : 20px;
    text-align : center;
    color : white;
`;
const DateText2 = styled.Text`
    font-size : 15px;
    text-align : center;
    color : white;
`;

export default Average;