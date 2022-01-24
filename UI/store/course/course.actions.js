import {CourseActionTypes} from './course.model';

export const CourseEnrolledActionTriggers = {
    request: request => ( {type: CourseActionTypes.ENROLLED_REQUEST, request} ),
    success: response => ( {type: CourseActionTypes.ENROLLED_SUCCESS, response} ),
    error: error => ( {type: CourseActionTypes.ENROLLED_FAILURE, error} )
};

export function GetEnrolledCourses( brandId ) {
    let userId = '';
    return function ( dispatch ) {
        dispatch( CourseEnrolledActionTriggers.request( brandId, userId ) );
    };
}

export const CourseNotEnrolledActionTriggers = {
    request: request => ( {type: CourseActionTypes.NOTENROLLED_REQUEST, request} ),
    success: response => ( {type: CourseActionTypes.NOTENROLLED_SUCCESS, response} ),
    error: error => ( {type: CourseActionTypes.NOTENROLLED_FAILURE, error} )
};

export function GetNotEnrolledCourses( userId ) {
    return function ( dispatch ) {
        dispatch( CourseNotEnrolledActionTriggers.request( userId ) );
    };
}

export const EnrollCourseTriggers = {
    request: request => ( {type: CourseActionTypes.ENROLL_REQUEST, request} ),
    success: response => ( {type: CourseActionTypes.ENROLL_SUCCESS, response} ),
    error: error => ( {type: CourseActionTypes.ENROLL_FAILURE, error} )
};

export function EnrollCourse( courseId ) {
    return function ( dispatch ) {
        dispatch( EnrollCourseTriggers.request( courseId ) );
    };
}

export const GetSectionsTriggers = {
    request: request => ( {type: CourseActionTypes.SECTION_REQUEST, request} ),
    success: response => ( {type: CourseActionTypes.SECTION_SUCCESS, response} ),
    error: error => ( {type: CourseActionTypes.SECTION_FAILURE, error} )
};

export function GetSections( courseId ) {
    return function ( dispatch ) {
        dispatch( GetSectionsTriggers.request( courseId ) );
    };
}

export const MarkAsDoneTriggers = {
    request: request => ( {type: CourseActionTypes.MARKDONE_REQUEST, request} ),
    success: response => ( {type: CourseActionTypes.MARKDONE_SUCCESS, response} ),
    error: error => ( {type: CourseActionTypes.MARKDONE_FAILURE, error} )
};

export function MarkAsDone( courseId, sectionId ) {
    return function ( dispatch ) {
        dispatch( MarkAsDoneTriggers.request( {
            courseId: courseId,
            sectionId: sectionId
        } ) );
    };
}

