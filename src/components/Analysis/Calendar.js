import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Icon from 'react-native-vector-icons/FontAwesome';

const MONTH_ENUM = ["1","2","3","4","5","6","7","8","9","10","11","12"];
const WEEK_ENUM = ["첫째주","둘째주","셋째주","넷째주","다섯째주","여섯째주"];

function Calendar ({ tab, year, month, week, setYear, 
    setMonth, setModalVisible, setSelectWeek }) {
    const [currentYear, setCurrentYear] = useState(year);
    const [currentMonth, setCurrentMonth] = useState(month);
    const [currentWeek, setCurrentWeek] = useState(week);
    const propsDispatch = (mon) => {
        setYear(currentYear);
        setMonth(mon);
        setModalVisible(false);
    }
    const propsDispatch2 = (weeks) => {
        setSelectWeek(weeks);
        setModalVisible(false);
    }
    return (
        <MainView>
            <HeaderView>
                
                {   tab?
                    <>
                    <Icon name="angle-left" size={28} color="black" onPress={()=>setCurrentYear(currentYear-1)}/>
                    <YearToggle>{currentYear+"년"}</YearToggle>
                    <Icon name="angle-right" size={28} color="black" onPress={()=>setCurrentYear(currentYear+1)}/>
                    </>
                :
                    <>
                    <YearToggle>{currentYear+"년 "+currentMonth+"월"}</YearToggle>
                    </>
                }
            </HeaderView>
            <BodyView>
                {   tab?
                    MONTH_ENUM.filter((mon, index) => (index+1)%4 === 0).
                        map((mon,index) => (
                            <RowView key={index}>
                                {   MONTH_ENUM.filter((mon,index2) => index2 >= index*4 && index2 < index*4+4).map((mon,index) => (
                                    <MonBtn key={index} onPress={()=>propsDispatch(parseInt(mon))}><MonthText>{mon+"월"}</MonthText></MonBtn>))}
                            </RowView>))
                    :
                    currentWeek.map((wk,index) => (
                        <SelectWeek key={index} onPress={()=>propsDispatch2(index)}>
                            <WeekText>{`${currentMonth}월 ${WEEK_ENUM[index]}`}</WeekText>
                            <WeekText2>{`${currentMonth}월${week[index].firstDay}일~${currentMonth}월${week[index].lastDay}일`}</WeekText2>
                        </SelectWeek>
                    ))
                }
            </BodyView>
        </MainView>
    )
}

const MainView = styled.View`
    width : 90%;
    height : 300px;
    background-color : white;
    border-radius : 10px;
`;
const HeaderView = styled.View`
    flex : 1;
    margin : 0 4%;
    flex-direction : row;
    justify-content : center;
    align-items : center;
    border-bottom-width : 2px;
    border-bottom-color : black;
`;
const BodyView = styled.View`
    flex : 3;
    justify-content : space-around;
    align-items : center;
`;
const RowView = styled.View`
    width : 100%;
    height : 60px;
    flex-direction : row;
    justify-content : center;
    align-items : center;
`;
const YearToggle = styled.Text`
    font-size : 25px;
    text-align : center;
    font-weight : bold;
    margin : 0 7%;
`;
const MonBtn = styled.TouchableOpacity`
    width : 25%
`;
const MonthText = styled.Text`
    font-size : 18px;
    text-align : center;
`;
const SelectWeek = styled.TouchableOpacity`
    width : 100%;
    height : 40px;
    justify-content : center;
    align-items : center;
`;
const WeekText = styled.Text`
    font-size : 20px;
    text-align : center;
`;
const WeekText2 = styled.Text`
    font-size : 12px;
    text-align : center;
`;


export default Calendar;