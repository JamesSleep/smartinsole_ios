import React, { useState, useEffect } from 'react';
import { Text, View, Image, StyleSheet } from 'react-native';
import Temperature from './Temperature';
import Pressure from './Pressure';



function InsoleData({name , data, route}) {
    if(route !== "Main") console.log(data);
    return (
        <>
        <View style={{flex:1}}>
            { route === "Main" ?
              <Text>실시간 모니터링</Text>
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