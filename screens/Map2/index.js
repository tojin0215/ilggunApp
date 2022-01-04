import React, { useEffect, useState} from 'react';
import { View } from 'react-native';
// import Postcode from 'react-native-daum-postcode';
import Postcode from '@actbase/react-daum-postcode';


/**
 * @deprecated
 */
const MapScreen2 = ({ navigation, props }) => {
  return (
    <View style={{ width: "100%", height: "100%" }}>
        <Postcode
            style={{ width: "100%", height: "100%" }}
            jsOptions={{ animated: true }}
            onSelected={(data) =>{
              navigation.navigate(('Modify Business'),{address1:JSON.parse(JSON.stringify(data)).address, zipCode: JSON.parse( JSON.stringify(data)).zonecode}) 
            }}/>
    </View>
  );
};

export default MapScreen2;