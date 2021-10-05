import React from "react";
import { AsyncStorage } from "react-native";
import { Alert } from "react-native";
import axios from "axios";
import * as AppleAuthentication from "expo-apple-authentication";
import styles from "./styles";

const SERVER_URL = "http://13.124.141.28:3000";

export default AuthAppleComponent = ({ onSignIn, navigation }) => {
  const onPress = async () => {
    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });

      await _getSignInByCode(credential);
    } catch (e) {
      if (e.code === "ERR_CANCELED") {
        // handle that the user canceled the sign-in flow
      } else {
        // handle other errors
      }
    }
  };

  const _getSignInByCode = async (credential) => {
    await axios
      .post(
        `${SERVER_URL}/signinByCode`,
        { code: credential.user },
        AXIOS_CONFIG
      )
      .then((res) => {
        if (!res || res.data[0] === undefined || res.data[0] === "") {
          _postSignUpByCode(credential);
        } else {
          const user_data = {
            id: responseData.data[0].id,
            name: responseData.data[0].name,
          };
          AsyncStorage.setItem("userData", JSON.stringify(user_data));

          if (user_data.id) {
            onSignIn();
            navigation.navigate("Select Page");
          }
        }
      });
  };

  const _postSignUpByCode = async (credential) => {
    axios
      .post(
        `${SERVER_URL}/signupByCode`,
        {
          id: credential.email,
          email: "",
          name: credential.fullName.givenName,
          password: credential.user,
          sign: "",
          code: credential.user,
        },
        AXIOS_CONFIG
      )
      .then((res) => {
        if (res.data.err != null) {
          Alert.alert("다른 방식으로 동일한 이메일이 가입되어있습니다.");
        } else {
          Alert.alert(
            "회원가입이 완료되었습니다. 이메일과 서명을 등록해주세요."
          );
          navigation.navigate("Sign Up Apple", { id: credential.email });
        }
      });
  };

  return (
    <>
      {AppleAuthentication.isAvailableAsync() ? (
        <AppleAuthentication.AppleAuthenticationButton
          buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
          buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
          cornerRadius={5}
          style={styles.button1}
          onPress={onPress}
        />
      ) : null}
    </>
  );
};
