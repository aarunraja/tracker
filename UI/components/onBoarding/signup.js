import React from 'react';
import { KeyboardAvoidingView, Platform, Text, View, ScrollView, Picker } from 'react-native';
import { Title, Button, TextInput, useTheme } from 'react-native-paper';
import { loginStyles } from "../../styles/LoginStyles";
import { MainStyles } from "../../styles/MainStyles";
import Constants from "expo-constants";
import { IsNullOrEmpty } from '../../helpers/utility';
import OTPTextView from '../common/OTPTextView';

export default function SignUp(props) {
    const [text, setText] = React.useState({
        name: "Suresh",
        phoneNumber: "9791091935",
        email: "suresh@masha.io",
        state: "Tamil Nadu",
        city: "Coim"
    });

    const isValid = () => {
        return !IsNullOrEmpty(text.name) &&
            !IsNullOrEmpty(text.phoneNumber) &&
            !IsNullOrEmpty(text.email) &&
            !IsNullOrEmpty(text.state) &&
            !IsNullOrEmpty(text.city) &&
            text.phoneNumber.length === 10;
    };

    const onSignUp = () => {
        if (isValid()) {
            props.onSignUp({
                name: text.name,
                phoneNumber: "+91" + text.phoneNumber,
                email: text.email.trim(),
                state: text.state,
                city: text.city.trim()
            });
        }
    };

    return (
        <KeyboardAvoidingView
            keyboardVerticalOffset={Constants.statusBarHeight}
            behavior={Platform.OS == "ios" ? "padding" : "height"}
            style={{ flex: 1 }}
        >
            <ScrollView style={MainStyles.scrollContainer}>
                <Title style={loginStyles.title}>Sign Up</Title>
                <Text style={loginStyles.textHead}>Full Name</Text>
                <TextInput
                    value={text.name}
                    dense
                    mode="flat"
                    style={loginStyles.text}
                    onChangeText={name => setText({ ...text, name: name })}
                />
                <Text style={loginStyles.textHead}>Mobile Number</Text>
                <OTPTextView
                    handleTextChange={phoneNumber => setText({ ...text, phoneNumber: phoneNumber })}
                    inputCount={10}
                    keyboardType="phone-pad"
                />
                <Text style={loginStyles.textHead}>Email Address</Text>
                <TextInput
                    value={text.email}
                    dense
                    style={loginStyles.text}
                    onChangeText={email => setText({ ...text, email: email })}
                />
                <Text style={loginStyles.textHead}>State</Text>
                <View style={{ ...loginStyles.selectWrapper, backgroundColor: useTheme().colors.background }}>
                    <Picker
                        selectedValue={text.state}
                        style={{ ...loginStyles.selectBox, backgroundColor: useTheme().colors.background }}
                        itemStyle={{ paddingLeft: 10 }}
                        onValueChange={(itemValue, itemIndex) =>
                            setText({ ...text, state: itemValue })
                        }>
                        <Picker.Item label="Select" value="" />
                        <Picker.Item label="Andhra Pradesh" value="Andhra Pradesh" />
                        <Picker.Item label="Arunachal Pradesh" value="Arunachal Pradesh" />
                        <Picker.Item label="Assam" value="Assam" />
                        <Picker.Item label="Bihar" value="Bihar" />
                        <Picker.Item label="Chhattisgarh" value="Chhattisgarh" />
                        <Picker.Item label="Goa" value="Goa" />
                        <Picker.Item label="Gujarat" value="Gujarat" />
                        <Picker.Item label="Haryana" value="Haryana" />
                        <Picker.Item label="Himachal Pradesh" value="Himachal Pradesh" />
                        <Picker.Item label="Jammu and Kashmir" value="Jammu and Kashmir" />
                        <Picker.Item label="Jharkhand" value="Jharkhand" />
                        <Picker.Item label="Karnataka" value="Karnataka" />
                        <Picker.Item label="Kerala" value="Kerala" />
                        <Picker.Item label="Madhya Pradesh" value="Madhya Pradesh" />
                        <Picker.Item label="Maharashtra" value="Maharashtra" />
                        <Picker.Item label="Manipur" value="Manipur" />
                        <Picker.Item label="Meghalaya" value="Meghalaya" />
                        <Picker.Item label="Mizoram" value="Mizoram" />
                        <Picker.Item label="Nagaland" value="Nagaland" />
                        <Picker.Item label="Odisha" value="Odisha" />
                        <Picker.Item label="Punjab" value="Punjab" />
                        <Picker.Item label="Rajasthan" value="Rajasthan" />
                        <Picker.Item label="Sikkim" value="Sikkim" />
                        <Picker.Item label="Tamil Nadu" value="Tamil Nadu" />
                        <Picker.Item label="Telangana" value="Telangana" />
                        <Picker.Item label="Tripura" value="Tripura" />
                        <Picker.Item label="Uttar Pradesh" value="Uttar Pradesh" />
                        <Picker.Item label="Uttarakhand" value="Uttarakhand" />
                        <Picker.Item label="West Bengal" value="West Bengal" />
                        <Picker.Item label="Andaman and Nicobar Islands" value="Andaman and Nicobar Islands" />
                        <Picker.Item label="Chandigarh" value="Chandigarh" />
                        <Picker.Item label="Dadar and Nagar Haveli" value="Dadar and Nagar Haveli" />
                        <Picker.Item label="Daman and Diu" value="Daman and Diu" />
                        <Picker.Item label="Delhi" value="Delhi" />
                        <Picker.Item label="Lakshadweep" value="Lakshadweep" />
                        <Picker.Item label="Pondicherry" value="Pondicherry" />
                    </Picker>
                </View>
                <Text style={loginStyles.textHead}>City</Text>
                <TextInput
                    value={text.city}
                    dense
                    style={loginStyles.text}
                    onChangeText={city => setText({ ...text, city: city })}
                />
                <Button
                    icon="camera"
                    disabled={!isValid()}
                    mode="contained"
                    contentStyle={loginStyles.button}
                    onPress={() => onSignUp()}>
                    Register
                </Button>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}