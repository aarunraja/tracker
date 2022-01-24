import {
    StyleSheet,
} from 'react-native';
import { theme } from '../helpers/theme';

export const loginStyles = StyleSheet.create({
    container: {
        padding: 10,
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start'
    },
    textHead: {
        marginBottom: 5
    },
    title: {
        marginBottom: 10,
        textAlign: "center",
        textDecorationColor: 'black',
        fontSize: 24,
        textDecorationLine: "underline"
    },
    notes: {
        paddingTop: 12,
        textAlign: "center",
        fontSize: 24,
        lineHeight: 32,
        color : theme.colors.accent
    },
    text: {
        marginVertical: 10,
        fontSize: 17,
    },
    phoneCode: {
        width: '10%',
        fontSize: 15,
        textAlignVertical: "center"
    },
    phone: {
        width: '90%',
        marginVertical: 10,
        fontSize: 17,
        borderColor: '#CECECE',
        borderWidth: 1,
    },
    button: {
        height: 50,
        backgroundColor: "#000",
        margin: 16,
    },
    btn: {
        paddingVertical: 8
    },
    selectBox: {
        width: '100%',
        borderRadius: 25,
        paddingHorizontal: 16,
        fontSize: 16,
        color: '#000',
        height: 40,
    },
    selectWrapper: {
        overflow: 'hidden',
        marginVertical: 10,
        borderColor: '#CECECE',
        borderWidth: 1
    },
    mainTitle: {
        paddingTop: 24,
        paddingBottom: 24,
        color: "#000",
        fontSize: 32,
    },
    subText: {
        fontSize: 18,
        paddingBottom: 8,
        color: "#000",
    }
});