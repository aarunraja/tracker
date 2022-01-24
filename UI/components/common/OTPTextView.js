import React, { useEffect, useRef, useState } from "react";
import { SafeAreaView, Text } from "react-native";
import ReactNativePinView from "react-native-pin-view";
import Icon from "react-native-vector-icons/Ionicons";
import { theme } from "../../helpers/theme";
import { loginStyles } from "../../styles/LoginStyles";

const PinCodeView = (props) => {
    const pinView = useRef(null)
    const [showRemoveButton, setShowRemoveButton] = useState(false)
    const [enteredPin, setEnteredPin] = useState("")
    const [showCompletedButton, setShowCompletedButton] = useState(false)
    useEffect(() => {
        if (enteredPin.length > 0) {
            setShowRemoveButton(true)
        } else {
            setShowRemoveButton(false)
        }
        if (enteredPin.length === props.inputCount) {
            if (props.onFulfill) {
                props.onFulfill(enteredPin);
            }
            setShowCompletedButton(true);
        }
        else {
            setShowCompletedButton(false)
        }
        if (props.onChange) {
            props.onChange(enteredPin);
        }
    }, [enteredPin]);

    return (
        <SafeAreaView
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            {
                props.title ?
                    <Text
                        style={loginStyles.mainTitle}>
                        {props.title}
                    </Text> :
                    <></>
            }
            {
                props.subTitle ?
                    <Text
                        style={loginStyles.subText}>
                        {props.subTitle}
                    </Text>
                    :
                    <></>
            }
            <ReactNativePinView
                inputSize={props.inputSize}
                ref={pinView}
                pinLength={props.inputCount}
                buttonSize={60}
                showInputText={props.showInputText}
                onValueChange={value => setEnteredPin(value)}
                buttonAreaStyle={{
                    marginTop: 24,
                }}
                inputAreaStyle={{
                    marginBottom: 24,
                    flexWrap: "wrap",
                    justifyContent: "center"
                }}
                inputViewEmptyStyle={{
                    backgroundColor: "transparent",
                    borderWidth: 1,
                    color: "#000",
                    marginRight : 2,
                    borderColor: theme.colors.primary,
                }}
                inputViewFilledStyle={{
                    color: "#000",
                    marginRight : 2,
                    backgroundColor: props.showInputText ? theme.colors.primary : "#000"
                }}
                buttonViewStyle={{
                    borderWidth: 1,
                    borderColor: "#000",
                }}
                buttonTextStyle={{
                    color: "#000",
                }}
                onButtonPress={key => {
                    if (key === "custom_left") {
                        pinView.current.clear()
                    }
                }}
                customLeftButton={showRemoveButton ? <Icon name={"ios-backspace"} size={36} color={"#000"} /> : undefined}
                customRightButton={showCompletedButton ? <Icon name={"ios-unlock"} size={36} color={"#000"} /> : undefined}
            />
        </SafeAreaView >
    )
}
export default PinCodeView