import {
    StyleSheet,
} from 'react-native';

export const CourseStyles = StyleSheet.create( {
    card: {
        flex: 1,
        padding: 5,
        margin: 10,
        flexDirection: 'row',
        borderColor: '#CECECE',
        borderWidth: 1,
        marginBottom: 5
    },
    description: {
        marginBottom: 10
    },
    enRoll: {
        flexDirection: "row",
        alignSelf: "flex-end",
        marginBottom: 10,
        marginRight: 10
    },
    markCompleted: {
        flexDirection: "row-reverse",
        marginVertical: 10
    },
    notes: {
        textAlign: "justify"
    },
    switch: {
        marginLeft: 10,
        marginTop: -5
    },
    heading: {
        fontSize: 20,
    },
    topic: {
        fontSize: 18,
        fontWeight: "bold"
    },
    subTopic: {
        marginLeft: -25
    },
    btnEnRoll: {
        fontSize: 10,
        borderRadius: 10
    },
    progressright: {
        position: 'absolute',
        right: 0,
        zIndex : 1
    },
    rightProgress: {
        width: 50,
        marginRight: 10,
        height: 12,
        borderRadius: 10,
        backgroundColor: "#827397",    
    },
} );