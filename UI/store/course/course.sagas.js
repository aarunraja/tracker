import {call, put, takeEvery} from 'redux-saga/effects';
import * as CourseActions from './course.actions';
import CourseAPI from './course.api';
import {CourseActionTypes} from './course.model';

export function* handleGetEnrolledCases() {
    try {
        const response = yield call( CourseAPI.GetEnrolledCourses );
        yield put( CourseActions.CourseEnrolledActionTriggers.success( response ) );
    } catch ( e ) {
        yield put( CourseActions.CourseEnrolledActionTriggers.error( e ) );
    }
}

export function* handleNotGetEnrolledCases() {
    try {
        const response = yield call( CourseAPI.GetNotEnrolledCourses );
        yield put( CourseActions.CourseNotEnrolledActionTriggers.success( response ) );
    } catch ( e ) {
        yield put( CourseActions.CourseNotEnrolledActionTriggers.error( e ) );
    }
}

export function* handleEnRoll( action ) {
    try {
        const response = yield call( CourseAPI.EnRollNewCourse, action.request );
        yield put( CourseActions.EnrollCourseTriggers.success( response ) );
    } catch ( e ) {
        yield put( CourseActions.EnrollCourseTriggers.error( e ) );
    }
}

export function* handleMarkAsDone( action ) {
    try {
        const response = yield call( CourseAPI.MarkAsDone, action.request.courseId, action.request.sectionId );
        yield put( CourseActions.MarkAsDoneTriggers.success( response ) );
    } catch ( e ) {
        yield put( CourseActions.MarkAsDoneTriggers.error( e ) );
    }
}

export function* handleGetSections( action ) {
    try {
        const response = yield call( CourseAPI.GetCourseSections, action.request );
        yield put( CourseActions.GetSectionsTriggers.success( response ) );
    } catch ( e ) {
        yield put( CourseActions.GetSectionsTriggers.error( e ) );
    }
}

export function* courseSaga() {
    yield takeEvery( CourseActionTypes.ENROLLED_REQUEST, handleGetEnrolledCases );
    yield takeEvery( CourseActionTypes.NOTENROLLED_REQUEST, handleNotGetEnrolledCases );
    yield takeEvery( CourseActionTypes.ENROLL_REQUEST, handleEnRoll );
    yield takeEvery( CourseActionTypes.SECTION_REQUEST, handleGetSections );
    yield takeEvery( CourseActionTypes.MARKDONE_REQUEST, handleMarkAsDone );
}

