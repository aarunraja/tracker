import React from 'react';
import {View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Avatar, Card, Chip, Paragraph, ProgressBar, useTheme} from 'react-native-paper';
import {Actions} from 'react-native-router-flux';
import {CourseStyles} from '../../../styles/CourseStyles';
import {MainStyles} from '../../../styles/MainStyles';

export default function CourseCard( props ) {
    let course = props.course;
    const {colors} = useTheme();
    const LeftContent = props => <Avatar.Image {...props} source={{uri: course.logoUrl}} />;
    let rightContent = props => course.subscribed ? <View {...props}>
        <ProgressBar progress={course.progress} color={colors.accent} style={MainStyles.baseProgress} />
    </View> :
        undefined;

    const onClick = () => {
        if ( props.isEnrolled ) {
            Actions.learnDashboard( {course: course} );
        } else {
            Actions.courseDetail( {course: course} );
        }
    };

    return (
        <TouchableOpacity onPress={onClick}>
            <Card style={CourseStyles.card}>
                <Card.Title title={course.title} subtitle={course.instructor} left={LeftContent} right={rightContent} />
                <Card.Content>
                    <Paragraph>{course.description}</Paragraph>
                </Card.Content>
                <Card.Actions>
                    {
                        course.tags.map( ( item ) => {
                            return <Chip style={MainStyles.baseChip} key={item} icon="information">{item}</Chip>;
                        } )
                    }
                </Card.Actions>
            </Card>
        </TouchableOpacity>
    );
}