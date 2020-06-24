import React from 'react';
import { View, Text, Dimensions } from 'react-native';

const _WIDTH = Dimensions.get('window').width;
const _HEIGHT = Dimensions.get('window').height;

function DiseaseCard({name, per}) {
    return (
        <View style={{flex:1, marginVertical:_WIDTH/35}}>
            <View style={{flex:1,width:"100%",height:_WIDTH/13, flexDirection:"row",justifyContent:"center",alignItems:"center"}}>
                <Text style={{width:"30%", textAlign:"center", fontSize:_WIDTH/30}} >{name}</Text>
                <View style={{width:"70%",height:"100%", flexDirection:"row", alignItems:"center"}}>
                    <View style={{width:"32%",height:"100%",marginRight:2, backgroundColor:"#E0F8D8"}}/>
                    <View style={{width:"32%",height:"100%",marginRight:2, backgroundColor:"#F6E7CA"}}/>
                    <View style={{width:"32%",height:"100%",marginRight:2, backgroundColor:"#F6D0CD"}}/>
                    <View style={{width:`${per}%`,height:"35%",position:"absolute", backgroundColor:"#66CC36", justifyContent:"center"}}>
                        <Text style={{position:"absolute",right:-_WIDTH/14,fontSize:_WIDTH/30}}>{`${per}%`}</Text>
                    </View>
                </View>
            </View>
            <View style={{flex:3, width:"100%", height:_HEIGHT/6, marginTop:10}}>
                <View style={{width:"100%",height:"100%", marginRight:2, backgroundColor:"#E8E8E8", borderRadius:20, padding:15}}>
                    <Text style={{fontSize:_WIDTH/30}}>{`좌우 족압 및 온도 측정 결과 ${per}%의 확률로 ${name}이 예상됩니다. 전문의의 진료를 받기를 권장합니다.`}</Text>
                </View>
            </View>
        </View>
    )
}

export default DiseaseCard;