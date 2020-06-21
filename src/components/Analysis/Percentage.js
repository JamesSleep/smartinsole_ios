import React from "react";
import { View, ScrollView, Text } from "react-native";

const FAKE_DB = [
    {name : "당뇨발", per : 38}, {name : "척추층만증", per : 12}, {name : "척추후만증", per : 18},
    {name : "목디스크", per : 47}, {name : "허리디스크", per : 52}, {name : "거북목\n증후군", per : 72},
    {name : "무지외반증", per : 36}, {name : "관절염", per : 41}, {name : "평발", per : 9}, 
    {name : "휜다리", per : 83},
]

export default function Percentage() {
    return (
        <ScrollView style={{flex:1, paddingHorizontal : 15, paddingTop:20,}} contentContainerStyle={{paddingBottom:20}}>
            <View style={{width:"100%", paddingLeft:"20%",flexDirection:"row", marginBottom:5}}>
                <Text style={{width:"33%", color:"#eccc68", marginRight:2, textAlign:"center"}}>정상</Text>
                <Text style={{width:"33%", color:"#f9ca24", marginRight:2, textAlign:"center"}}>주의</Text>
                <Text style={{width:"33%", color:"#eb4d4b", marginRight:2, textAlign:"center"}}>위험</Text>
            </View>
            {
                FAKE_DB.map((value, index) => (
                    <View key={index} style={{width:"100%",height:30, flexDirection:"row",marginBottom :10, alignItems:"center"}}>
                        <Text style={{width:"20%", fontSize:12}}>{value.name}</Text>
                        <View style={{width:"80%",height:"100%", flexDirection:"row", alignItems:"center"}}>
                            <View style={{width:"33%",height: "100%",marginRight:2, backgroundColor:"#E0F8D8"}}/>
                            <View style={{width:"33%",height:"100%",marginRight:2, backgroundColor:"#F6E7CA"}}/>
                            <View style={{width:"33%",height:"100%",marginRight:2, backgroundColor:"#F6D0CD"}}/>
                            <View style={{width:`${value.per}%`,height:"35%",position:"absolute",backgroundColor:"#66CC36",justifyContent:"center"}}>
                                <Text style={{position:"absolute",right:-30, fontSize:12}}>{`${value.per}%`}</Text>
                            </View>
                        </View>
                    </View>
                ))
            }       
        </ScrollView>
    )
}