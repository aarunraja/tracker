import {CourseActionTypes} from './course.model';
import {LOGO_URL, showMessage} from '../../helpers/utility';

export const initialState = {
    enrolledCourses: [],
    notEnrolledCourses: [],
    courseSections: {
        Sections: []
    },
    isLoading: false
};

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {

        case CourseActionTypes.MARKDONE_REQUEST: {
            return Object.assign( {}, state, {
                isLoading: true,
            } );
        }

        case CourseActionTypes.MARKDONE_SUCCESS: {
            return Object.assign( {}, state, {
                isLoading: false,
                courseSections: action.response
            } );
        }

        case CourseActionTypes.MARKDONE_FAILURE: {
            return Object.assign( {}, state, {
                isLoading: false
            } );
        }

        case CourseActionTypes.SECTION_REQUEST: {
            return Object.assign( {}, state, {
                isLoading: true,
                courseSections: {
                    Sections: []
                },
            } );
        }

        case CourseActionTypes.SECTION_SUCCESS: {
            return Object.assign( {}, state, {
                isLoading: false,
                courseSections: action.response
            } );
        }

        case CourseActionTypes.SECTION_FAILURE: {
            return Object.assign( {}, state, {
                isLoading: false
            } );
        }

        case CourseActionTypes.ENROLL_REQUEST: {
            return Object.assign( {}, state, {
                isLoading: true
            } );
        }

        case CourseActionTypes.ENROLL_SUCCESS: {
            showMessage("You have been enrolled to this course");

            let courseIds = [];
            let courses = action.response.map( ( item ) => {
                courseIds.push( item.id );
                return {
                    id: item.id,
                    logoUrl: LOGO_URL,
                    title: item.Title,
                    instructor: item.Instructor,
                    description: item.Description,
                    tags: item.Tags,
                    subscribed: item.subscribed,
                    progress: 0.3,
                };
            } );

            let notEnrolledCourses = state.notEnrolledCourses.filter( ( x ) => {
                return !courseIds.includes( x.id );
            } );
            return Object.assign( {}, state, {
                isLoading: false,
                enrolledCourses: courses,
                notEnrolledCourses: notEnrolledCourses
            } );
        }

        case CourseActionTypes.ENROLL_FAILURE: {
            return Object.assign( {}, state, {
                isLoading: false
            } );
        }

        case CourseActionTypes.ENROLLED_REQUEST: {
            return Object.assign( {}, state, {
                isLoading: true,
            } );
        }

        case CourseActionTypes.ENROLLED_SUCCESS: {
            let courseIds = [];
            let courses = action.response.map( ( item ) => {
                courseIds.push( item.id );
                return {
                    id: item.id,
                    logoUrl: LOGO_URL,
                    title: item.Title,
                    instructor: item.Instructor,
                    description: item.Description,
                    tags: item.Tags,
                    subscribed: item.subscribed,
                    progress: 0.3,
                };
            } );

            let notEnrolledCourses = state.notEnrolledCourses.filter( ( x ) => {
                return !courseIds.includes( x.id );
            } );
            return Object.assign( {}, state, {
                isLoading: false,
                enrolledCourses: courses,
                notEnrolledCourses: notEnrolledCourses
            } );
        }

        case CourseActionTypes.ENROLLED_FAILURE: {
            return Object.assign( {}, state, {
                isLoading: false
            } );
        }

        case CourseActionTypes.NOTENROLLED_REQUEST: {
            return Object.assign( {}, state, {
                isLoading: true,
                notEnrolledCourses: []
            } );
        }

        case CourseActionTypes.NOTENROLLED_SUCCESS: {
            let enrolledCourses = state.enrolledCourses.map( ( x ) => x.id );
            courses = action.response.filter( ( x ) => {
                return !enrolledCourses.includes( x.id );
            } ).map( ( item ) => {
                return {
                    id: item.id,
                    logoUrl: LOGO_URL,
                    title: item.Title,
                    instructor: item.Instructor,
                    description: item.Description,
                    tags: item.Tags,
                    subscribed: false,
                    progress: 0.3,
                };
            } );
            return Object.assign( {}, state, {
                isLoading: false,
                notEnrolledCourses: courses,
            } );
        }

        case CourseActionTypes.NOTENROLLED_FAILURE: {
            return Object.assign( {}, state, {
                isLoading: false
            } );
        }

        default: {
            return state;
        }
    }
};

export {reducer as CourseReducer};