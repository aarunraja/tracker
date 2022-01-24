import {combineReducers} from 'redux';
import {UserReducer} from './user/user.reducers';
import {CourseReducer} from './course/course.reducers';

const appReducer = combineReducers( {
    UserReducer,
    CourseReducer
} );

const rootReducer = ( state, action ) => {
    if ( action.type === 'USER_LOGOUT' ) {
        state = undefined;
    }
    return appReducer( state, action );
};

export default rootReducer;  