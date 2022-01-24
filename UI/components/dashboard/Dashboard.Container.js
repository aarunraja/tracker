import React, {useEffect} from 'react';
import {Dimensions, View} from 'react-native';
import {Icon} from 'react-native-elements';
import {Title, useTheme} from 'react-native-paper';
import {SceneMap, TabBar, TabView} from 'react-native-tab-view';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as CourseActions from '../../store/course/course.actions';
import {MainStyles} from "../../styles/MainStyles";
import Header from '../common/header';
import CourseList from './course/CourseList';

function CourseContainer( props ) {
  useEffect( () => {
    if ( props.enrolledCourses.length === 0 ) {
      props.actions.CourseActions.GetEnrolledCourses( props.user.id );
    }
    props.actions.CourseActions.GetNotEnrolledCourses( '' );
  }, [] );

  const {colors} = useTheme();

  const FirstRoute = () => {
    if ( props.enrolledCourses.length === 0 && !props.isLoading ) {
      return <View style={MainStyles.loading}>
        <Icon
          name='hourglass-empty'
          type="material"
          color={colors.primary}
          size={100}
        />
        <Title titleColor={colors.accent}>No Courses Available</Title>
      </View>;
    }
    else {
      return <CourseList courses={props.enrolledCourses}
        refreshing={props.isLoading}
        onRefresh={() => {
          props.actions.CourseActions.GetEnrolledCourses( props.user.id );
          props.actions.CourseActions.GetNotEnrolledCourses( '' );
        }}
        enRollCourse={( courseId ) => props.actions.CourseActions.EnrollCourse( courseId )}
        isEnrolled={true}
      />;
    }
  };

  const SecondRoute = () => {
    if ( props.notEnrolledCourses.length === 0 && !props.isLoading ) {
      return <View style={MainStyles.loading}>
        <Icon
          name='hourglass-empty'
          type="material"
          color={colors.primary}
          size={100}
        />
        <Title titleColor={colors.accent}>No Courses Available</Title>
      </View>;
    }
    else {
      return <CourseList courses={props.notEnrolledCourses}
        refreshing={props.isLoading}
        onRefresh={() => {
          props.actions.CourseActions.GetEnrolledCourses( props.user.id );
          props.actions.CourseActions.GetNotEnrolledCourses( '' );
        }}
        isEnrolled={false}
      />;
    }
  };

  const [index, setIndex] = React.useState( 0 );
  const [routes] = React.useState( [
    {key: 'first', title: 'Your Courses'},
    {key: 'second', title: 'Other Courses'},
  ] );

  const renderScene = SceneMap( {
    first: FirstRoute,
    second: SecondRoute,
  } );

  const initialLayout = {width: Dimensions.get( 'window' ).width};

  const renderTabBar = props => (
    <TabBar
      {...props}
      indicatorStyle={{backgroundColor: 'white'}}
      style={{backgroundColor: colors.accent}}
    />
  );

  return (
    <View style={MainStyles.baseContainer}    >
      <Header />
      <TabView
        renderTabBar={renderTabBar}
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={initialLayout}
      />
    </View >
  );
}

function mapStateToProps( state ) {
  return {
    user: state.UserReducer.user,
    isLoading: state.CourseReducer.isLoading,
    enrolledCourses: state.CourseReducer.enrolledCourses,
    notEnrolledCourses: state.CourseReducer.notEnrolledCourses,
    courses: state.CourseReducer.notEnrolledCourses,
  };
}

function mapDispatchToProps( dispatch ) {
  return {
    actions: {
      CourseActions: bindActionCreators( CourseActions, dispatch ),
    }
  };
}

export default connect( mapStateToProps, mapDispatchToProps )( CourseContainer );