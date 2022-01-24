import React, { Component } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as UserActions from '../../store/user/user.actions';
import { MainStyles } from '../../styles/MainStyles';
import Header from '../common/header';
import Login from './login';
class OnBoardingContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLogin: true
        };
    }

    componentDidUpdate(prevProps) {
        if (this.props.user.id !== prevProps.user.id) {
            this.setState({
                isLogin: true
            });
        }
    }

    render() {
        return (
            <View style={MainStyles.baseContainer}>
                <Header disableLogout={true}
                    onLogin={() =>
                        this.setState({
                            isLogin: !this.state.isLogin
                        })} />
                <Login onLoginSuccess={() => this.props.actions.UserActions.SignInUser()} user={this.props.user} />
                {
                    this.props.isLoading ?
                        <ActivityIndicator size="small" /> :
                        undefined
                }
            </View>
        );
    }
}

const mapStateToProps = (state) => ({
    isLoading: state.UserReducer.isLoading,
    user: state.UserReducer.user,
    accessToken: state.UserReducer.accessToken
});

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            UserActions: bindActionCreators(UserActions, dispatch),
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(OnBoardingContainer);