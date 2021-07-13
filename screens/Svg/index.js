import React, { Component } from 'react';
import Svg, { Circle, Rect, Path } from 'react-native-svg';
import { View,Text, TouchableOpacity,Button, StyleSheet } from 'react-native';

class SvgComponent extends Component{
    state={path:"", 
    mySign:`<svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 10 L100 100" stroke="red"/>
  </svg>`}
    handlePress(evt){
        console.log(`x coord = ${evt.nativeEvent.locationX}`);
      }
      render() {
        return (
            <>
            <View style={styles.sign} onTouchMove={(e) => {
                    console.log('touchMove',e.nativeEvent.locationX, e.nativeEvent.locationY) 
                    this.setState({path:this.state.path+' L'+e.nativeEvent.locationX+' '+e.nativeEvent.locationY})
                    console.log(this.state.path)
                }}
                ontouchend={(e) => {
                    console.log('touchMove',e.nativeEvent.locationX, e.nativeEvent.locationY) 
                    this.setState({path:this.state.path+' Z'})
                    console.log(this.state.path)
                }}
                onTouchStart={(e) => {
                    console.log('touchMove',e.nativeEvent.locationX, e.nativeEvent.locationY) 
                    this.setState({path:this.state.path+' M'+e.nativeEvent.locationX+' '+e.nativeEvent.locationY})
                    console.log(this.state.path)
                }}
            >
            <Svg>
            <Path
                d={this.state.path}
                fill="none"
                stroke="black"
            />
            </Svg>
            </View>
            <Button
                title="reset"
                color="#FF3232"
                onPress={async()=>{
                    this.setState({path:''})
                }}/> 
            <Button
                title="완료"
                color="#FF3232"
                onPress={async()=>{
                    
                    console.log("upload!")
        
                }}/> 
        </>
        );
      }
}


export default SvgComponent;

const styles = StyleSheet.create({
    sign : { height:400, width:400, backgroundColor: '#faa' },
});
