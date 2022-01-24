import Constants from "expo-constants";
import * as FirebaseCore from 'expo-firebase-core';
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import * as React from "react";
import { KeyboardAvoidingView, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Title } from "react-native-paper";
import firebase from '../../helpers/firebaseHelper';
import httpHelper from '../../helpers/httpHelper';
import { API_URL, IsNullOrEmpty, showMessage } from '../../helpers/utility';
import { loginStyles } from "../../styles/LoginStyles";
import { MainStyles } from "../../styles/MainStyles";
import OTPTextView from '../common/OTPTextView';

export default function Login(props) {
    const recaptchaVerifier = React.useRef(null);
    const [verificationId, setVerificationId] = React.useState("");
    const firebaseConfig = FirebaseCore.DEFAULT_WEB_APP_OPTIONS;
    const contact = "+91 7359850001";
    return (
        <KeyboardAvoidingView
            keyboardVerticalOffset={Constants.statusBarHeight}
            behavior={Platform.OS == "ios" ? "padding" : "height"}
        >
            <ScrollView style={MainStyles.scrollContainer}>
                <FirebaseRecaptchaVerifierModal
                    ref={recaptchaVerifier}
                    firebaseConfig={firebaseConfig}
                />
                {
                    !IsNullOrEmpty(verificationId) ?
                        <View style={MainStyles.scrollContainer}>
                            <OTPTextView
                                key='1'
                                inputCount={6}
                                title={"Sign In"}
                                showInputText={false}
                                subTitle={"Enter Mobile OTP"}
                                onFulfill={async (otp) => {
                                    try {
                                        const credential = firebase.auth.PhoneAuthProvider.credential(
                                            verificationId,
                                            otp
                                        );

                                        await firebase.auth().signInWithCredential(credential)
                                            .then(async (x) => {
                                                x.user.getIdToken(true).then(function (idToken) {
                                                    showMessage("Login Successful");
                                                    props.onLoginSuccess(idToken);
                                                });
                                            });
                                    } catch (err) {
                                        showMessage("Invalid OTP, Please type correct OTP", true);
                                    }
                                }}

                                inputSize={28}
                            />
                        </View> :
                        <View style={MainStyles.scrollContainer}>
                            <OTPTextView
                                key='2'
                                title={"Sign In"}
                                subTitle={"Enter Mobile Number"}
                                inputSize={28}
                                showInputText={true}
                                onFulfill={async (phoneNumber) => {
                                    try {
                                        let url = API_URL + '/users/phone/+91' + phoneNumber;
                                        return httpHelper.httpRequest(url, 'GET')
                                            .then(async (res) => {
                                                const phoneProvider = new firebase.auth.PhoneAuthProvider();
                                                const verificationId = await phoneProvider.verifyPhoneNumber(
                                                    "+91" + phoneNumber,
                                                    recaptchaVerifier.current
                                                );
                                                setVerificationId(verificationId);
                                                showMessage("Verification code has been sent to your phone.");
                                            }).catch((err) => {
                                                if (err.message === "Request failed with status code 500") {
                                                    showMessage("Your Phone Number is Not Registered With Us. Please Contact " + contact, true);
                                                }
                                                else {
                                                    showMessage(err.message, true);
                                                }
                                            });
                                    } catch (err) {
                                        showMessage(err.message, true);
                                    }
                                }}
                                inputCount={10}
                            />
                            <Title style={loginStyles.notes}>
                                For Registration, Please Contact {contact}
                            </Title>
                        </View>
                }
            </ScrollView>
        </KeyboardAvoidingView >
    );
}
