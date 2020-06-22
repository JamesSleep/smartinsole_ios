import React, { useState, useEffect } from 'react';
import { Text, View, Image, StyleSheet } from 'react-native';
import Temperature from './Temperature';
import Pressure from './Pressure';



function InsoleData({name , data}) {
    return (
        <>
        <View style={{flex:1}}>
            <Text>실시간 모니터링</Text>
        </View>
        <View style={{flex:10,flexDirection:"row"}}>
            <View style={{flex:5}}>
                {name === "temp"?<Temperature data={data}/>:<Pressure data={data}/>}
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