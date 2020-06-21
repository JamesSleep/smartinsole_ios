import React, { useState, useEffect } from 'react';
import { Text, View, Image, StyleSheet } from 'react-native';
import Temperature from './Temperature';
import Pressure from './Pressure';

const FAKE_DB = [
    { left : {temp:[21,26,30,40,42], press:[0,348,234,227,2738,1029,4021,882,3092]} , right : {temp:[21,26,30,42,42], press:[0,348,234,227,2738,1029,4021,882,3092]} },
    { left : {temp:[28,36,21,24,24], press:[2128,3428,34,283,1827,1837,987,399,4000]} , right : {temp:[32,26,24,27,42], press:[60,231,550,1825,2142,2990,3272,3445,3502]} },
    { left : {temp:[32,27,28,34,41], press:[343, 614, 1250, 1576, 1646, 1846, 2315, 2525, 3742]} , right : {temp:[41,26,28,35,40], press:[124, 1408, 1664, 1996, 2416, 2901, 3050, 3187, 3668]} },
    { left : {temp:[29,43,29,40,21], press:[141, 1331, 1851, 2086, 2557, 2989, 3232, 3753, 3890]} , right : {temp:[31,26,21,40,45], press:[212, 312, 400, 711, 723, 2687, 2847, 3029, 3568]} },
    { left : {temp:[37,41,35,43,28], press:[78, 249, 749, 1045, 1751, 2224, 2308, 2856, 3750]} , right : {temp:[25,34,31,33,41], press:[840, 941, 1443, 2307, 2341, 2397, 2628, 3174, 3517]} },
    { left : {temp:[18,25,45,41,42], press:[353, 828, 2120, 2577, 2601, 3082, 3349, 3357, 3494]} , right : {temp:[27,21,32,33,42], press:[157, 230, 1481, 1776, 2213, 2536, 3640, 3756, 4021]} }
];

function InsoleData({name}) {
    const [data, setData] = useState(0);
    useEffect(() => { 
        const interval = setInterval(() => {
            setData(data => data >=5 ? 0 : data + 1);
        }, 1000);
        return () => clearInterval(interval);
    }, []);
    return (
        <>
        <View style={{flex:1}}>
            <Text>실시간 모니터링</Text>
        </View>
        <View style={{flex:10,flexDirection:"row"}}>
            <View style={{flex:5}}>
                {name === "temp"?<Temperature data={FAKE_DB[data]}/>:<Pressure data={FAKE_DB[data]}/>}
            </View>
            <View style={{flex:1, flexDirection:"row"}}>
                <Image source={require('../../image/palette.jpg')} style={{flex:1, height:"100%"}}/>
                <View style={{flex:2, flexDirection:"row"}}>
                    <Text>45</Text>
                </View>
            </View>
        </View>
        </>
    )
}

export default InsoleData;