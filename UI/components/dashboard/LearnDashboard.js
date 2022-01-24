import React, { useEffect } from 'react';
import { ScrollView, View } from 'react-native';
import { colors } from 'react-native-elements';
import { ActivityIndicator, Avatar, Card, List, ProgressBar } from 'react-native-paper';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as CourseActions from '../../store/course/course.actions';
import { CourseStyles } from "../../styles/CourseStyles";
import { MainStyles } from "../../styles/MainStyles";
import Header from '../common/header';

function LearnDashboard(props) {
    useEffect(() => {
        props.actions.CourseActions.GetSections(props.course.id);
    }, [props.sections.length === 0]);
    let course = props.sections;
    const LeftContent = props => <Avatar.Icon {...props} icon="book-play" />;

    let courseSections = course.Sections.map((item) => {
        let completed = item.Topics.filter((x) => {
            return x.progress === 1;
        });

        let rightContent = props => <View style={CourseStyles.progressright} {...props}>
            <ProgressBar progress={completed.length / item.Topics.length} color={colors.success} style={CourseStyles.rightProgress} />
        </View>;

        return <List.Accordion
            key={item.id}
            title={item.Title}
            left={rightContent}
            titleStyle={CourseStyles.topic}
            expanded={true}
        >
            {
                item.Topics.map((x, index) => {
                    return <List.Item
                        key={index}
                        title={x.Title}
                        titleStyle={CourseStyles.subTopic}
                        onPress={() => Actions.courseLearning({ Topic: x, Course: props.course })}
                        left={props => <List.Icon {...props} icon="circle-medium" />}
                        right={props => <List.Icon {...props}
                            icon={
                                x.progress === 1 ? "check-circle" :
                                    x.progress === 0 ? "play-circle" : "progress-check"

                            }
                            color={
                                x.progress === 1 ? colors.success :
                                    x.progress === 0 ? colors.warning : colors.secondary
                            }
                        />} />;
                })
            }
        </List.Accordion>;
    });

    return (
        <View style={MainStyles.baseContainer}>
            <Header hasBack={true} />
            <ScrollView style={MainStyles.scrollContainer}>
                <Card style={MainStyles.baseCard}>
                    <Card.Title title={course.Title} subtitle={"Course Summary"} left={LeftContent} />
                </Card>
                <List.Section>
                    {courseSections}
                </List.Section>
            </ScrollView>
            {
                props.isLoading ?
                    <ActivityIndicator animating={true} /> :
                    undefined
            }
        </View>
    );
}

function mapStateToProps(state) {
    return {
        sections: state.CourseReducer.courseSections,
        isLoading: state.CourseReducer.isLoading
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            CourseActions: bindActionCreators(CourseActions, dispatch),
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(LearnDashboard);