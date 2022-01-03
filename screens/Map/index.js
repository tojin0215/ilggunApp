import React, { useEffect, useState} from 'react';
import { View } from 'react-native';
import Postcode from 'react-native-daum-postcode';



const MapScreen = ({ navigation, props }) => {
  return <Postcode
    style={{ width: 320, height: 320 }}
    jsOptions={{ animation: false }}
    onSelected={data => alert(JSON.stringify(data))}
/>
  return (
    <View style={{ width: "100%", height: "100%" }}>
        <Postcode
            style={{ width: "100%", height: "100%" }}
            jsOptions={{ animated: true }}
            onSelected={(data) =>{
                navigation.navigate(('Add Business'),{address1:JSON.parse(JSON.stringify(data)).address, zipCode: JSON.parse( JSON.stringify(data)).zonecode}) 
            }}/>
    </View>
  );
};

export default MapScreen;