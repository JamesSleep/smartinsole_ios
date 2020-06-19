import React from 'react';
import { View, Text } from 'react-native';

function DiseaseCard({name, per}) {
    return (
        <View style={{flex:1, marginVertical:20}}>
            <View style={{flex:1,width:"100%",height:30, flexDirection:"row",justifyContent:"center",alignItems:"center"}}>
                <Text style={{width:"30%", textAlign:"center"}} >{name}</Text>
                <View style={{width:"70%",height:"100%", flexDirection:"row", alignItems:"center"}}>
                    <View style={{width:"32%",height:"100%",marginRight:2, backgroundColor:"#E0F8D8"}}/>
                    <View style={{width:"32%",height:"100%",marginRight:2, backgroundColor:"#F6E7CA"}}/>
                    <View style={{width:"32%",height:"100%",marginRight:2, backgroundColor:"#F6D0CD"}}/>
                    <View style={{width:`${per}%`,height:"50%",position:"absolute", backgroundColor:"#66CC36", justifyContent:"center"}}>
                        <Text style={{position:"absolute",right:-30}}>{`${per}%`}</Text>
                    </View>
                </View>
            </View>
            <View style={{flex:3, width:"100%", height:120, marginTop:10}}>
                <View style={{width:"100%",height:"100%", marginRight:2, backgroundColor:"#E8E8E8", borderRadius:20, padding:15}}>
                    <Text>{`좌우 족압 및 온도 측정 결과 ${per}%의 확률로 ${name}이 예상됩니다. 전문의의 진료를 받기를 권장합니다.`}</Text>
                </View>
            </View>
        </View>
    )
}

export default DiseaseCard;