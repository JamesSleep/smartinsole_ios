import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import RadialGradient from 'react-native-radial-gradient';

const color = [
    {inner : "rgb(127, 140, 141)", outer : "rgb(149, 165, 166)"},
    {inner : "rgb(138, 150, 151)", outer : "rgb(153, 175, 176)"},
    {inner : "rgb(149, 160, 161)", outer : "rgb(161, 185, 186)"},
    {inner : "rgb(150, 170, 171)", outer : "rgb(172, 195, 196)"},
    {inner : "rgb(161, 180, 181)", outer : "rgb(183, 205, 206)"},
];

export default function Pressure({data}) {
    const colorHandler = (press) => {
        if (press <= 4095 && press >= 3200) return 0;
        else if (press < 3200 && press >= 2400) return 1;
        else if (press < 2400 && press >= 1600) return 2;
        else if (press < 1600 && press >= 800) return 3;
        else return 4;
    }
    return (
        <>
        <Image source={require('../../image/bal.png')} style={styles.footImg}/>
            <Image source={require('../../image/bal.png')} style={styles.footImg2}/>
            {/* LEFT FOOT */}
            {/* PL1 */}
            <RadialGradient style={{width:50,height:50,position:'absolute',left:"25%",top:"14%",zIndex:2,}}
                colors={[color[colorHandler(data.PL1)].inner,color[colorHandler(data.PL1)].outer,"rgba(214,215,220,0)"]}
                stops={[0.1,0.5,1]}
                center={[25,25]}
                radius={25}/> 
            {/* PL3 */}
            <RadialGradient style={{width:50,height:50, position:'absolute',left:"13%",top:"18%",zIndex:1,}}
                colors={[color[colorHandler(data.PL3)].inner,color[colorHandler(data.PL3)].outer,"rgba(214,215,220,0)"]}
                stops={[0.1,0.5,1]}
                center={[25,25]}
                radius={25}/>
            {/* PL0 */}
            <RadialGradient style={{width:50,height:50,position:'absolute',left:"31%",top:"35%",zIndex:1,}}
                colors={[color[colorHandler(data.PL0)].inner,color[colorHandler(data.PL0)].outer,"rgba(214,215,220,0)"]}
                stops={[0.1,0.5,1]}
                center={[25,25]}
                radius={25}/>
            {/* PL2 */}
            <RadialGradient style={{width:50,height:50,position:'absolute',left:"20%",top:"34%",zIndex:1,}}
                colors={[color[colorHandler(data.PL2)].inner,color[colorHandler(data.PL2)].outer,"rgba(214,215,220,0)"]}
                stops={[0.1,0.5,1]}
                center={[25,25]}
                radius={25}/>
            {/* PL4 */}
            <RadialGradient style={{width:50,height:50, position:'absolute',left:"10%",top:"36%",zIndex:1,}}
                colors={[color[colorHandler(data.PL4)].inner,color[colorHandler(data.PL4)].outer,"rgba(214,215,220,0)"]}
                stops={[0.1,0.5,1]}
                center={[25,25]}
                radius={25}/>
            {/* PL5 */}
            <RadialGradient style={{width:40,height:40, position:'absolute',left:"23%",bottom:"30%",zIndex:1,}}
                colors={[color[colorHandler(data.PL5)].inner,color[colorHandler(data.PL5)].outer,"rgba(214,215,220,0)"]}
                stops={[0.1,0.5,1]}
                center={[20,20]}
                radius={20}/>
            {/* PL6 */}
            <RadialGradient style={{width:40,height:40, position:'absolute',left:"13%",bottom:"22%",zIndex:1,}}
                colors={[color[colorHandler(data.PL6)].inner,color[colorHandler(data.PL6)].outer,"rgba(214,215,220,0)"]}
                stops={[0.1,0.5,1]}
                center={[20,20]}
                radius={20}/>
            {/* PL7 */}
            <RadialGradient style={{width:40,height:40, position:'absolute',left:"20%",bottom:"12%",zIndex:1,}}
                colors={[color[colorHandler(data.PL7)].inner,color[colorHandler(data.PL7)].outer,"rgba(214,215,220,0)"]}
                stops={[0.1,0.5,1]}
                center={[20,20]}
                radius={20}/>
            {/* PL8 */}
            <RadialGradient style={{width:40,height:40, position:'absolute',left:"28%",bottom:"20%",zIndex:1,}}
                colors={[color[colorHandler(data.PL8)].inner,color[colorHandler(data.PL8)].outer,"rgba(214,215,220,0)"]}
                stops={[0.1,0.5,1]}
                center={[20,20]}
                radius={20}/>

            {/* RIGHT FOOT */}
            {/* PR1 */}
            <RadialGradient style={{width:50,height:50,position:'absolute',right:"25%",top:"14%",zIndex:2,}}
                colors={[color[colorHandler(data.PR1)].inner,color[colorHandler(data.PR1)].outer,"rgba(214,215,220,0)"]}
                stops={[0.1,0.5,1]}
                center={[25,25]}
                radius={25}/> 
            {/* PR3 */}
            <RadialGradient style={{width:50,height:50, position:'absolute',right:"13%",top:"18%",zIndex:1,}}
                colors={[color[colorHandler(data.PR3)].inner,color[colorHandler(data.PR3)].outer,"rgba(214,215,220,0)"]}
                stops={[0.1,0.5,1]}
                center={[25,25]}
                radius={25}/>
            {/* PR0 */}
            <RadialGradient style={{width:50,height:50,position:'absolute',right:"31%",top:"35%",zIndex:1,}}
                colors={[color[colorHandler(data.PR0)].inner,color[colorHandler(data.PR0)].outer,"rgba(214,215,220,0)"]}
                stops={[0.1,0.5,1]}
                center={[25,25]}
                radius={25}/>
            {/* PR2 */}
            <RadialGradient style={{width:50,height:50,position:'absolute',right:"20%",top:"34%",zIndex:1,}}
                colors={[color[colorHandler(data.PR2)].inner,color[colorHandler(data.PR2)].outer,"rgba(214,215,220,0)"]}
                stops={[0.1,0.5,1]}
                center={[25,25]}
                radius={25}/>
            {/* PL4 */}
            <RadialGradient style={{width:50,height:50, position:'absolute',right:"10%",top:"36%",zIndex:1,}}
                colors={[color[colorHandler(data.PR4)].inner,color[colorHandler(data.PR4)].outer,"rgba(214,215,220,0)"]}
                stops={[0.1,0.5,1]}
                center={[25,25]}
                radius={25}/>
            {/* PR5 */}
            <RadialGradient style={{width:40,height:40, position:'absolute',right:"23%",bottom:"30%",zIndex:1,}}
                colors={[color[colorHandler(data.PR5)].inner,color[colorHandler(data.PR5)].outer,"rgba(214,215,220,0)"]}
                stops={[0.1,0.5,1]}
                center={[20,20]}
                radius={20}/>
            {/* PR6 */}
            <RadialGradient style={{width:40,height:40, position:'absolute',right:"13%",bottom:"22%",zIndex:1,}}
                colors={[color[colorHandler(data.PR6)].inner,color[colorHandler(data.PR6)].outer,"rgba(214,215,220,0)"]}
                stops={[0.1,0.5,1]}
                center={[20,20]}
                radius={20}/>
            {/* PR7 */}
            <RadialGradient style={{width:40,height:40, position:'absolute',right:"20%",bottom:"12%",zIndex:1,}}
                colors={[color[colorHandler(data.PR7)].inner,color[colorHandler(data.PR7)].outer,"rgba(214,215,220,0)"]}
                stops={[0.1,0.5,1]}
                center={[20,20]}
                radius={20}/>
            {/* PR8 */}
            <RadialGradient style={{width:40,height:40, position:'absolute',right:"28%",bottom:"20%",zIndex:1,}}
                colors={[color[colorHandler(data.PR8)].inner,color[colorHandler(data.PR8)].outer,"rgba(214,215,220,0)"]}
                stops={[0.1,0.5,1]}
                center={[20,20]}
                radius={20}/>
        </>
    )
}

const styles = StyleSheet.create({
    footImg:{ width:"100%", height:"100%", position:"absolute", zIndex : 5, },
    footImg2 : {width:"100%",height:"100%", position:"absolute", backgroundColor : "#D6D7DC", zIndex : -1,},
});