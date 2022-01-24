import {all} from 'redux-saga/effects';
import {userSaga} from './user/user.sagas';
import {courseSaga} from './course/course.sagas';


export default function* rootSaga() {
    yield all( [
        userSaga(),
        courseSaga()

    ] );
}