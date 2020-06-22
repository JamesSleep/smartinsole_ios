import React, { useState, useEffect } from 'react';
import { View, Text, AsyncStorage } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import styled from 'styled-components';
import { SafeAreaView } from 'react-native-safe-area-context';

function CautionSetting({navigation}) {
    const [all, setAll] = useState(false);
    const [caution, setCaution] = useState(false);
    const [danger, setDanger] = useState(false);
    const toggleSwitchAll = () => setAll(prev => !prev);
    const toggleSwitchCaution = () => setCaution(prev => !prev);
    const toggleSwitchDanger = () => setDanger(prev => !prev);

    useEffect(() => {
        getAsyncStorage();
    }, [])
    const setAsyncStorage = async () => {
        await AsyncStorage.setItem("alram",JSON.stringify({
            all : all.toString(), danger : danger.toString(), caution : caution.toString()
        }));
        navigation.goBack();
    }
    const getAsyncStorage = async (value) => {
        await AsyncStorage.getItem("alram")
        .then(res => {
            const data = JSON.parse(res);
            if(data !== null) {
                setAll(data["all"] === "true");
                setDanger(data["danger"] === "true");
                setCaution(data["caution"] === "true");
            }
        })
    }

    return (
        <LinearGradient start={{x: 1.5, y: 0}} end={{x: 0, y: 0}} colors={['#B2FEFA', '#0ED2F7']} style={{flex:1}}>
            <SafeAreaView style={{flex:1,width:"100%",height:"100%"}}>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start', paddingTop:80 }}>
                <Icon name="angle-left" size={28} color="#fff" style={{position:"absolute",left:20,top:10}} onPress={()=>navigation.goBack()}/>
                <AlarmView>
                    <Title>알림 설정</Title>
                    <LinearLine />
                    <RowView>
                        <AlarmText>전체 알림</AlarmText>
                        <AlarmSwitch
                            trackColor={{ false: "#767577", true: "#81b0ff" }}
                            thumbColor={all ? "#B2FEFA" : "#f4f3f4"}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={toggleSwitchAll}
                            value={all}
                        />
                    </RowView>
                    <LinearLine2 />
                    <RowView>
                        <AlarmText>질병 위험 알림</AlarmText>
                        <AlarmSwitch
                            trackColor={{ false: "#767577", true: "#81b0ff" }}
                            thumbColor={danger ? "#B2FEFA" : "#f4f3f4"}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={toggleSwitchDanger}
                            value={danger}
                        />
                    </RowView>
                    <RowView>
                        <AlarmText>질병 주의 알림</AlarmText>
                        <AlarmSwitch
                            trackColor={{ false: "#767577", true: "#81b0ff" }}
                            thumbColor={caution ? "#B2FEFA" : "#f4f3f4"}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={toggleSwitchCaution}
                            value={caution}
                        />
                    </RowView>
                </AlarmView>
                <SetBtn onPress={()=>setAsyncStorage()}><Text style={{fontSize:23}}>설정완료</Text></SetBtn>
            </View>
            </SafeAreaView>
        </LinearGradient>
    )
}

const AlarmView = styled.View`
    width : 90%;
    height : 300px;
    padding : 20px 10px 0px 10px;
    background-color : white;
    border-radius : 20px;
    align-items : center;
`;
const Title = styled.Text`
    font-size : 30px;
    text-align : center;
`;
const LinearLine = styled.View`
    width : 100%;
    height : 5px;
    background-color : gray;
    margin : 5px;
`;
const LinearLine2 = styled.View`
    width : 100%;
    height : 1px;
    background-color : gray;
    margin : 5px;
`;
const RowView = styled.View`
    width : 90%
    height : 50px;
    flex-direction : row;
    justify-content : space-between;
    align-items : center;
`;
const AlarmText = styled.Text`
    font-size : 20px;
    color : black;
`;
const AlarmSwitch = styled.Switch`
    transform : scaleX(0.9) scaleY(0.9);
`;
const SetBtn = styled.TouchableOpacity`
    width : 90%;
    height : 60px;
    margin-top : 30px;
    background-color : white;
    border-radius : 30px;
    justify-content : center;
    align-items : center;
`;
export default CautionSetting;