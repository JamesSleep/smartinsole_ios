import React, { useState } from 'react';
import { StyleSheet, Image, Dimensions } from 'react-native';
import RadialGradient from 'react-native-radial-gradient';

const _WIDTH = Dimensions.get('window').width;
const _HEIGHT = Dimensions.get('window').height;

const color = [
    {inner : "#ff4757", outer : "#ff7f50"},
    {inner : "#fff200", outer : "#fffa65"},
    {inner : "#5352ed", outer : "#70a1ff"},
];

export default function Temperature({data}) {
    
    const colorHandler = (temp) => {
        if (temp <= 45 && temp >= 36) return 0;
        else if (temp <= 35 && temp >= 27) return 1;
        else return 2;
    }
    return (
        <>
        <Image source={require('../../image/bal.png')} style={styles.footImg}/>
            <Image source={require('../../image/bal.png')} style={styles.footImg2}/>
            {/* LEFT FOOT */}
            {/* TL1 */}
            <RadialGradient style={{width:_WIDTH*0.14,height:_WIDTH*0.14,position:'absolute',left:"23%",top:"14%",zIndex:2,}}
                colors={[color[colorHandler(data.TL1)].inner,color[colorHandler(data.TL1)].outer,"rgba(214,215,220,0)"]}
                stops={[0.1,0.5,1]}
                center={[_WIDTH*0.07,_WIDTH*0.07]}
                radius={_WIDTH*0.07}/>  
            {/* TL0 */}
            <RadialGradient style={{width:_WIDTH*0.1,height:_WIDTH*0.1,position:'absolute',left:"34%",top:"35%",zIndex:1,}}
                colors={[color[colorHandler(data.TL0)].inner,color[colorHandler(data.TL0)].outer,"rgba(214,215,220,0)"]}
                stops={[0.1,0.5,1]}
                center={[_WIDTH*0.05,_WIDTH*0.05]}
                radius={_WIDTH*0.05}/>
            {/* TL2 */}
            <RadialGradient style={{width:_WIDTH*0.1,height:_WIDTH*0.1,position:'absolute',left:"24%",top:"34%",zIndex:1,}}
                colors={[color[colorHandler(data.TL2)].inner,color[colorHandler(data.TL2)].outer,"rgba(214,215,220,0)"]}
                stops={[0.1,0.5,1]}
                center={[_WIDTH*0.05,_WIDTH*0.05]}
                radius={_WIDTH*0.05}/>
            {/* TL3 */}
            <RadialGradient style={{width:_WIDTH*0.1,height:_WIDTH*0.1, position:'absolute',left:"15%",top:"36%",zIndex:1,}}
                colors={[color[colorHandler(data.TL3)].inner,color[colorHandler(data.TL3)].outer,"rgba(214,215,220,0)"]}
                stops={[0.1,0.5,1]}
                center={[_WIDTH*0.05,_WIDTH*0.05]}
                radius={_WIDTH*0.05}/>
            {/* TL4 */}
            <RadialGradient style={{width:_WIDTH*0.14,height:_WIDTH*0.14, position:'absolute',left:"23%",bottom:"17%",zIndex:1,}}
                colors={[color[colorHandler(data.TL4)].inner,color[colorHandler(data.TL4)].outer,"rgba(214,215,220,0)"]}
                stops={[0.1,0.5,1]}
                center={[_WIDTH*0.07,_WIDTH*0.07]}
                radius={_WIDTH*0.07}/>
            {/* RIGHT FOOT */}
            {/* TR1 */}
            <RadialGradient style={{width:_WIDTH*0.14,height:_WIDTH*0.14,position:'absolute',right:"23%",top:"14%",zIndex:2,}}
                colors={[color[colorHandler(data.TR1)].inner,color[colorHandler(data.TR1)].outer,"rgba(214,215,220,0)"]}
                stops={[0.1,0.5,1]}
                center={[_WIDTH*0.07,_WIDTH*0.07]}
                radius={_WIDTH*0.07}/>  
            {/* TR0 */}
            <RadialGradient style={{width:_WIDTH*0.1,height:_WIDTH*0.1,position:'absolute',right:"34%",top:"35%",zIndex:1,}}
                colors={[color[colorHandler(data.TR0)].inner,color[colorHandler(data.TR0)].outer,"rgba(214,215,220,0)"]}
                stops={[0.1,0.5,1]}
                center={[_WIDTH*0.05,_WIDTH*0.05]}
                radius={_WIDTH*0.05}/>
            {/* TR2 */}
            <RadialGradient style={{width:_WIDTH*0.1,height:_WIDTH*0.1,position:'absolute',right:"24%",top:"34%",zIndex:1,}}
                colors={[color[colorHandler(data.TR2)].inner,color[colorHandler(data.TR2)].outer,"rgba(214,215,220,0)"]}
                stops={[0.1,0.5,1]}
                center={[_WIDTH*0.05,_WIDTH*0.05]}
                radius={_WIDTH*0.05}/>
            {/* TR3 */}
            <RadialGradient style={{width:_WIDTH*0.1,height:_WIDTH*0.1, position:'absolute',right:"15%",top:"36%",zIndex:1,}}
                colors={[color[colorHandler(data.TR3)].inner,color[colorHandler(data.TR3)].outer,"rgba(214,215,220,0)"]}
                stops={[0.1,0.5,1]}
                center={[_WIDTH*0.05,_WIDTH*0.05]}
                radius={_WIDTH*0.05}/>
            {/* TR4 */}
            <RadialGradient style={{width:_WIDTH*0.14,height:_WIDTH*0.14, position:'absolute',right:"23%",bottom:"17%",zIndex:1,}}
                colors={[color[colorHandler(data.TR4)].inner,color[colorHandler(data.TR4)].outer,"rgba(214,215,220,0)"]}
                stops={[0.1,0.5,1]}
                center={[_WIDTH*0.07,_WIDTH*0.07]}
                radius={_WIDTH*0.07}/>
        </>
    )
}

const styles = StyleSheet.create({
    footImg:{ width:"100%", height:"95%", position:"absolute", zIndex : 5, },
    footImg2 : {width:"100%",height:"95%", position:"absolute", backgroundColor : "#D6D7DC", zIndex : -1,},
});