import {call, put, takeEvery} from 'redux-saga/effects';
import * as UserActions from './user.actions';
import UserAPI from './user.api';
import {UserActionTypes} from './user.model';

export function* handleSignUp( action ) {
    try {
        const response = yield call( UserAPI.AddUser, action.request );
        yield put( UserActions.SignUpUserTriggers.success( response ) );
    } catch ( e ) {
        yield put( UserActions.SignUpUserTriggers.error( e ) );
    }
}

export function* handleSignIn() {
    try {
        const response = yield call( UserAPI.LoginUser );
        yield put( UserActions.SignInUserTriggers.success( response ) );
    } catch ( e ) {
        yield put( UserActions.SignInUserTriggers.error( e ) );
    }
}

export function* userSaga() {
    yield takeEvery( UserActionTypes.SIGNUP_REQUEST, handleSignUp );
    yield takeEvery( UserActionTypes.LOGIN_REQUEST, handleSignIn );
}

