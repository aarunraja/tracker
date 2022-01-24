import React from 'react';
import {Router, Scene} from 'react-native-router-flux';
import CourseDetail from '../components/dashboard/CourseDetail';
import CourseLearning from '../components/dashboard/CourseLearning';
import CourseContainer from '../components/dashboard/Dashboard.Container';
import LearnDashboard from '../components/dashboard/LearnDashboard';
import OnBoardingContainer from '../components/onBoarding/OnBoardingContainer';
import {IsNullOrEmpty} from '../helpers/utility';

export default function RouteManager( props ) {
    let isLoggedIn = !IsNullOrEmpty( props.accessToken );
    return (
        <Router >
            <Scene
                selector={isLoggedIn ? "onlineClass" : "onBoarding"}
            >
                <Scene key="onBoarding" hideNavBar={true} initial={!isLoggedIn}>
                    <Scene key="login" component={OnBoardingContainer} initial={true} />
                </Scene>

                <Scene key="onlineClass" hideNavBar={true} initial={isLoggedIn}>
                    <Scene key="dashboard" component={CourseContainer} initial={true} />
                    <Scene key="courseDetail" component={CourseDetail} initial={false} />
                    <Scene key="learnDashboard" component={LearnDashboard} initial={false} />
                    <Scene key="courseLearning" component={CourseLearning} initial={false} />
                </Scene>
            </Scene>
        </Router >
    );
}
