import React, { useState, useEffect } from 'react';
import { Text, View, Image, StyleSheet } from 'react-native';
import Temperature from './Temperature';

const FAKE_DB = [
    {left : {temp:[21,26,30,40,42]},right : {temp:[21,26,30,42,42]}},
    {left : {temp:[28,36,21,24,24]},right : {temp:[32,26,24,27,42]}},
    {left : {temp:[32,27,28,34,41]},right : {temp:[41,26,28,35,40]}},
    {left : {temp:[29,43,29,40,21]},right : {temp:[31,26,21,40,45]}},
    {left : {temp:[37,41,35,43,28]},right : {temp:[25,34,31,33,41]}},
    {left : {temp:[18,25,45,41,42]},right : {temp:[27,21,32,33,42]}}
];

function InsoleData({name}) {
    return (
        <>
        <View style={{flex:1}}>
            <Text>실시간 모니터링</Text>
        </View>
        <View style={{flex:10,flexDirection:"row"}}>
            <View style={{flex:5}}>
                {name === "temp"?<Temperature data={FAKE_DB}/>:null}
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