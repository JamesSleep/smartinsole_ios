import React from "react";
import { View, Text, StyleSheet, Image, Dimensions } from "react-native";
import RadialGradient from 'react-native-radial-gradient';

const _WIDTH = Dimensions.get('window').width;
const _HEIGHT = Dimensions.get('window').height;

const color = [
    {inner : "rgb(97, 110, 111)", outer : "rgb(99, 125, 126)"},
    {inner : "rgb(108, 120, 121)", outer : "rgb(113, 135, 136)"},
    {inner : "rgb(119, 130, 131)", outer : "rgb(121, 145, 146)"},
    {inner : "rgb(120, 140, 141)", outer : "rgb(132, 155, 156)"},
    {inner : "rgb(131, 150, 151)", outer : "rgb(143, 165, 166)"},
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
            <RadialGradient style={{width:_WIDTH*0.1,height:_WIDTH*0.1,position:'absolute',left:"29%",top:"14%",zIndex:2,}}
                colors={[color[colorHandler(data.PL1)].inner,color[colorHandler(data.PL1)].outer,"rgba(214,215,220,0)"]}
                stops={[0.1,0.5,1]}
                center={[_WIDTH*0.05,_WIDTH*0.05]}
                radius={_WIDTH*0.05}/> 
            {/* PL3 */}
            <RadialGradient style={{width:_WIDTH*0.1,height:_WIDTH*0.1, position:'absolute',left:"18%",top:"18%",zIndex:1,}}
                colors={[color[colorHandler(data.PL3)].inner,color[colorHandler(data.PL3)].outer,"rgba(214,215,220,0)"]}
                stops={[0.1,0.5,1]}
                center={[_WIDTH*0.05,_WIDTH*0.05]}
                radius={_WIDTH*0.05}/>
            {/* PL0 */}
            <RadialGradient style={{width:_WIDTH*0.1,height:_WIDTH*0.1,position:'absolute',left:"33%",top:"35%",zIndex:1,}}
                colors={[color[colorHandler(data.PL0)].inner,color[colorHandler(data.PL0)].outer,"rgba(214,215,220,0)"]}
                stops={[0.1,0.5,1]}
                center={[_WIDTH*0.05,_WIDTH*0.05]}
                radius={_WIDTH*0.05}/>
            {/* PL2 */}
            <RadialGradient style={{width:_WIDTH*0.1,height:_WIDTH*0.1,position:'absolute',left:"24%",top:"34%",zIndex:1,}}
                colors={[color[colorHandler(data.PL2)].inner,color[colorHandler(data.PL2)].outer,"rgba(214,215,220,0)"]}
                stops={[0.1,0.5,1]}
                center={[_WIDTH*0.05,_WIDTH*0.05]}
                radius={_WIDTH*0.05}/>
            {/* PL4 */}
            <RadialGradient style={{width:_WIDTH*0.1,height:_WIDTH*0.1, position:'absolute',left:"15%",top:"36%",zIndex:1,}}
                colors={[color[colorHandler(data.PL4)].inner,color[colorHandler(data.PL4)].outer,"rgba(214,215,220,0)"]}
                stops={[0.1,0.5,1]}
                center={[_WIDTH*0.05,_WIDTH*0.05]}
                radius={_WIDTH*0.05}/>
            {/* PL5 */}
            <RadialGradient style={{width:_WIDTH*0.08,height:_WIDTH*0.08, position:'absolute',left:"28%",bottom:"36%",zIndex:1,}}
                colors={[color[colorHandler(data.PL5)].inner,color[colorHandler(data.PL5)].outer,"rgba(214,215,220,0)"]}
                stops={[0.1,0.5,1]}
                center={[_WIDTH*0.04,_WIDTH*0.04]}
                radius={_WIDTH*0.04}/>
            {/* PL6 */}
            <RadialGradient style={{width:_WIDTH*0.08,height:_WIDTH*0.08, position:'absolute',left:"21%",bottom:"30%",zIndex:1,}}
                colors={[color[colorHandler(data.PL6)].inner,color[colorHandler(data.PL6)].outer,"rgba(214,215,220,0)"]}
                stops={[0.1,0.5,1]}
                center={[_WIDTH*0.04,_WIDTH*0.04]}
                radius={_WIDTH*0.04}/>
            {/* PL7 */}
            <RadialGradient style={{width:_WIDTH*0.08,height:_WIDTH*0.08, position:'absolute',left:"23%",bottom:"20%",zIndex:1,}}
                colors={[color[colorHandler(data.PL7)].inner,color[colorHandler(data.PL7)].outer,"rgba(214,215,220,0)"]}
                stops={[0.1,0.5,1]}
                center={[_WIDTH*0.04,_WIDTH*0.04]}
                radius={_WIDTH*0.04}/>
            {/* PL8 */}
            <RadialGradient style={{width:_WIDTH*0.08,height:_WIDTH*0.08, position:'absolute',left:"30%",bottom:"25%",zIndex:1,}}
                colors={[color[colorHandler(data.PL8)].inner,color[colorHandler(data.PL8)].outer,"rgba(214,215,220,0)"]}
                stops={[0.1,0.5,1]}
                center={[_WIDTH*0.04,_WIDTH*0.04]}
                radius={_WIDTH*0.04}/>

            {/* RIGHT FOOT */}
            {/* PR1 */}
            <RadialGradient style={{width:_WIDTH*0.1,height:_WIDTH*0.1,position:'absolute',right:"29%",top:"14%",zIndex:2,}}
                colors={[color[colorHandler(data.PL1)].inner,color[colorHandler(data.PL1)].outer,"rgba(214,215,220,0)"]}
                stops={[0.1,0.5,1]}
                center={[_WIDTH*0.05,_WIDTH*0.05]}
                radius={_WIDTH*0.05}/> 
            {/* PR3 */}
            <RadialGradient style={{width:_WIDTH*0.1,height:_WIDTH*0.1, position:'absolute',right:"18%",top:"18%",zIndex:1,}}
                colors={[color[colorHandler(data.PL3)].inner,color[colorHandler(data.PL3)].outer,"rgba(214,215,220,0)"]}
                stops={[0.1,0.5,1]}
                center={[_WIDTH*0.05,_WIDTH*0.05]}
                radius={_WIDTH*0.05}/>
            {/* PR0 */}
            <RadialGradient style={{width:_WIDTH*0.1,height:_WIDTH*0.1,position:'absolute',right:"33%",top:"35%",zIndex:1,}}
                colors={[color[colorHandler(data.PL0)].inner,color[colorHandler(data.PL0)].outer,"rgba(214,215,220,0)"]}
                stops={[0.1,0.5,1]}
                center={[_WIDTH*0.05,_WIDTH*0.05]}
                radius={_WIDTH*0.05}/>
            {/* PR2 */}
            <RadialGradient style={{width:_WIDTH*0.1,height:_WIDTH*0.1,position:'absolute',right:"24%",top:"34%",zIndex:1,}}
                colors={[color[colorHandler(data.PL2)].inner,color[colorHandler(data.PL2)].outer,"rgba(214,215,220,0)"]}
                stops={[0.1,0.5,1]}
                center={[_WIDTH*0.05,_WIDTH*0.05]}
                radius={_WIDTH*0.05}/>
            {/* PR4 */}
            <RadialGradient style={{width:_WIDTH*0.1,height:_WIDTH*0.1, position:'absolute',right:"15%",top:"36%",zIndex:1,}}
                colors={[color[colorHandler(data.PL4)].inner,color[colorHandler(data.PL4)].outer,"rgba(214,215,220,0)"]}
                stops={[0.1,0.5,1]}
                center={[_WIDTH*0.05,_WIDTH*0.05]}
                radius={_WIDTH*0.05}/>
            {/* PR5 */}
            <RadialGradient style={{width:_WIDTH*0.08,height:_WIDTH*0.08, position:'absolute',right:"28%",bottom:"36%",zIndex:1,}}
                colors={[color[colorHandler(data.PL5)].inner,color[colorHandler(data.PL5)].outer,"rgba(214,215,220,0)"]}
                stops={[0.1,0.5,1]}
                center={[_WIDTH*0.04,_WIDTH*0.04]}
                radius={_WIDTH*0.04}/>
            {/* PR6 */}
            <RadialGradient style={{width:_WIDTH*0.08,height:_WIDTH*0.08, position:'absolute',right:"21%",bottom:"30%",zIndex:1,}}
                colors={[color[colorHandler(data.PL6)].inner,color[colorHandler(data.PL6)].outer,"rgba(214,215,220,0)"]}
                stops={[0.1,0.5,1]}
                center={[_WIDTH*0.04,_WIDTH*0.04]}
                radius={_WIDTH*0.04}/>
            {/* PR7 */}
            <RadialGradient style={{width:_WIDTH*0.08,height:_WIDTH*0.08, position:'absolute',right:"23%",bottom:"20%",zIndex:1,}}
                colors={[color[colorHandler(data.PL7)].inner,color[colorHandler(data.PL7)].outer,"rgba(214,215,220,0)"]}
                stops={[0.1,0.5,1]}
                center={[_WIDTH*0.04,_WIDTH*0.04]}
                radius={_WIDTH*0.04}/>
            {/* PR8 */}
            <RadialGradient style={{width:_WIDTH*0.08,height:_WIDTH*0.08, position:'absolute',right:"30%",bottom:"25%",zIndex:1,}}
                colors={[color[colorHandler(data.PL8)].inner,color[colorHandler(data.PL8)].outer,"rgba(214,215,220,0)"]}
                stops={[0.1,0.5,1]}
                center={[_WIDTH*0.04,_WIDTH*0.04]}
                radius={_WIDTH*0.04}/>
        </>
    )
}

const styles = StyleSheet.create({
    footImg:{ width:"100%", height:"95%", position:"absolute", zIndex : 5, },
    footImg2 : {width:"100%",height:"95%", position:"absolute", backgroundColor : "#D6D7DC", zIndex : -1,},
});