import React, { useState, useEffect } from 'react';
import { Text, View, Image, StyleSheet, Dimensions } from 'react-native';
import Temperature from './Temperature';
import Pressure from './Pressure';

const _WIDTH = Dimensions.get('window').width;

function InsoleData({name , data, route}) {
    return (
        <>
        <View style={{flex:1}}>
            { route === "Main" ?
              <Text style={{fontSize:_WIDTH/30, top: 10, left: 10}}>실시간 모니터링</Text>
              : null }
        </View>
        <View style={{flex:10,flexDirection:"row"}}>
            <View style={{flex:5}}>
                {name === "temp"?<Temperature data={data}/>:<Pressure data={data}/>}
            </View>
            <View style={{flex:1,width:"100%",height:"100%"}}>
                { name === "temp" ? 
                  <Image source={require('../../image/temp.png')} style={{width:"100%",height:"90%"}} resizeMode="contain"/>
                  : null }
            </View>
        </View>
        </>
    )
}

export default InsoleData;