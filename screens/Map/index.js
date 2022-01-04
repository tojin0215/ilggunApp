import React, { useEffect, useState, useCallback } from 'react';
import { View, Text } from 'react-native';
// import Postcode from '@actbase/react-daum-postcode';

import WebView from 'react-native-webview';
import { Linking } from 'react-native';
import { TabRouter } from 'react-navigation';

const html = `
<!DOCTYPE html>
<html lang="ko">
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no">
	<style> 
	  * { box-sizing: border-box }
	  html, body { width: 100%; height: 100%; margin:0px; padding: 0px; background-color: #ececec; } 
  </style>
</head>
<body>
	<div id="layer" style="width:100%; min-height: 100%;"></div>
	<script type="text/javascript">
    function callback() {
			var element_layer = document.getElementById('layer');
			element_layer.innerHTML = "";
      new daum.Postcode({
        ...window.options,
        onsearch: function () {
          window.scrollTo(0, 0);
        },
        oncomplete: function(data) {
          window.ReactNativeWebView.postMessage(JSON.stringify(data));
        },
        onresize: function(size) {
          document.getElementById('layer').style.height = size.height + 'px';
        },
        onclose: function() {
          callback();
        },
        width : '100%',
        height: '100%',
      }).embed(element_layer);
    }
		function initOnReady(options) {
    	window.options = options;
			var s = document.createElement('script');
			s.type = 'text/javascript'; s.src = 'https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
			s.onreadystatechange = callback; s.onload = callback;
			var x = document.getElementsByTagName('script')[0]; x.parentNode.insertBefore(s, x);
    }
	</script>
</body>
</html>
`;

const Postcode = (props) => {
  const { jsOptions, onSelected, onError, style, ...otherProps } = props;
  const injectedJavaScript = React.useMemo(() => `initOnReady(${JSON.stringify(jsOptions)});void(0);`, [jsOptions]);

  const onMessage = React.useCallback(
    ({ nativeEvent }) => {
      try {
        nativeEvent.data && onSelected && onSelected(JSON.parse(nativeEvent.data));
      } catch (e) {
        onError(e);
      }
    },
    [onSelected],
  );

  return (
    <View style={style}>
      <WebView
        mixedContentMode={'always'}
        originWhiteList={["*"]}
        // androidLayerType="hardware"
        // renderToHardwareTextureAndroid={true}
        // useWebKit={true}
        // {...otherProps}
        source={{ html, baseUrl: 'https://postcode.map.daum.net' }}
        onMessage={onMessage}
        injectedJavaScript={injectedJavaScript}
        onShouldStartLoadWithRequest={request => {
          const isPostcode =
            !request.url?.startsWith('https://postcode.map.daum.net/guide') &&
            (!request.url?.startsWith('http') ||
              request.url?.startsWith('https://postcode.map.daum.net') ||
              request.url?.startsWith('http://postcode.map.daum.net'));
          if (!isPostcode) {
            Linking.openURL(request.url);
            return false;
          } else {
            return true;
          }
        }}
      />
    </View>
  );
};

Postcode.defaultProps = {
  jsOptions: {
    hideMapBtn: true,
  },
};




const MapScreen = ({ route, navigation, props }) => {
  const jsOptions = {};
  const injectedJavaScript = React.useMemo(() => `initOnReady(${JSON.stringify(jsOptions)});void(0);`, [jsOptions]);

  const onSelected = data => {
    // console.log(data);

    // const backref = (route && route.params && route.params.backref) ? route.params.backref : 'Add Business'
    const backref = route.params.backref;
    navigation.navigate(
      backref,
      {
        address1: data.address,
        zipCode: data.zonecode
      }) 
  }

  const onError = error => {
    console.error(`MapScreen::onError::${JSON.stringify(error, null, 2)}`)
  }

  const onMessage = useCallback(({ nativeEvent }) => {
    try {
      nativeEvent.data && onSelected && onSelected(JSON.parse(nativeEvent.data));
    } catch (e) {
      onError(e);
    }
  },
  [onSelected],
);

  const [pc, setPc] = useState(null);

  useEffect(() => {
    try {
      setPc(<WebView
        style={{ width: "100%", height: "100%" }}
        mixedContentMode={'always'}
        originWhiteList={["*"]}
        source={{ html, baseUrl: 'https://postcode.map.daum.net' }}
        onMessage={onMessage}
        injectedJavaScript={injectedJavaScript}
        onShouldStartLoadWithRequest={request => {
          const isPostcode =
            !request.url?.startsWith('https://postcode.map.daum.net/guide') &&
            (!request.url?.startsWith('http') ||
              request.url?.startsWith('https://postcode.map.daum.net') ||
              request.url?.startsWith('http://postcode.map.daum.net'));
          if (!isPostcode) {
            Linking.openURL(request.url);
            return false;
          } else {
            return true;
          }
        }}
      />)
    } catch (e) {
      console.error(`MapScreen::useEffect::catch::${JSON.stringify(e, null, 2)}`)
    }

    // console.log(route);
    // console.log(navigation);
  }, [])

  return (
    <View style={{ width: "100%", height: "100%" }}>
      {pc ? pc : <Text>인터넷 연결을 확인하세요</Text>}
    </View>
  );
};

export default MapScreen;