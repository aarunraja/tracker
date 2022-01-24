import {UserActionTypes} from './user.model';

export const initialState = {
    user: {},
    accessToken: null,
    isLoading: false
};

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case UserActionTypes.LOGIN_REQUEST:
        case UserActionTypes.SIGNUP_REQUEST: {
            return Object.assign( {}, state, {
                isLoading: true
            } );
        }

        case UserActionTypes.SIGNUP_SUCCESS: {
            return Object.assign( {}, state, {
                isLoading: false,
                user: action.response,
            } );
        }

        case UserActionTypes.LOGIN_FAILURE:
        case UserActionTypes.SIGNUP_FAILURE: {
            return Object.assign( {}, state, {
                isLoading: false
            } );
        }

        case UserActionTypes.LOGIN_SUCCESS: {
            return Object.assign( {}, state, {
                accessToken: action.response,
                isLoading: false
            } );
        }

        default: {
            return state;
        }
    }
};

export {reducer as UserReducer};