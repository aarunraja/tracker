import * as React from 'react';
import {Appbar} from 'react-native-paper';
import {Actions} from 'react-native-router-flux';
import {getStore} from '../../store/store';
import Constants from 'expo-constants';

const Header = ( props ) => {
    return (
        <Appbar.Header>
            <Appbar.Action icon={props.hasBack ? "arrow-left" : "home"} onPress={() => Actions.pop()} />
            <Appbar.Content title={Constants.manifest.name} subtitle="Courses" />
            <Appbar.Action icon={props.disableLogout ? "account-circle" : "power"}
                onPress={() => props.disableLogout ? props.onLogin() : getStore().dispatch( {type: 'USER_LOGOUT'} )} />
        </Appbar.Header>
    );
};

export default Header;