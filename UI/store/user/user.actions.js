import { UserActionTypes } from './user.model';

export const SignUpUserTriggers = {
    request: request => ({ type: UserActionTypes.SIGNUP_REQUEST, request }),
    success: response => ({ type: UserActionTypes.SIGNUP_SUCCESS, response }),
    error: error => ({ type: UserActionTypes.SIGNUP_FAILURE, error })
};

export function SignUpUser(user) {
    return function (dispatch) {
        dispatch(SignUpUserTriggers.request(user));
    };
}

export const SignInUserTriggers = {
    request: request => ({ type: UserActionTypes.LOGIN_REQUEST, request }),
    success: response => ({ type: UserActionTypes.LOGIN_SUCCESS, response }),
    error: error => ({ type: UserActionTypes.LOGIN_FAILURE, error })
};

export function SignInUser() {
    return function (dispatch) {
        dispatch(SignInUserTriggers.request());
    };
}

export function UpdateToken(token) {
    return function (dispatch) {
        dispatch(SignInUserTriggers.success(token));
    };
}

export function SignOut() {
    return function (dispatch) {
        dispatch({ type: "USER_LOGOUT" });
    };
}