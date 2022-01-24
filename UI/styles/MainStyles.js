import {
    StyleSheet,
} from 'react-native';

export const MainStyles = StyleSheet.create( {
    baseContainer: {
        flex: 1,
    },
    scrollContainer: {
        paddingHorizontal: 10,
        paddingTop: 10
    },
    baseCard: {
        flex: 1,
        padding: 0,
        margin: 0,
        flexDirection: 'row',
        marginBottom: 5,
        borderWidth: 0,
        elevation: 0
    },
    baseChip: {
        marginRight: 10
    },
    baseProgress: {
        width: 50,
        marginRight: 10,
        height: 12,
        borderRadius: 10
    },
    loading: {
        alignItems: "center",
        justifyContent: "center",
        flex: 1
    }
} );