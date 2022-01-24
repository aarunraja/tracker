import React from 'react';
import {Text, View} from 'react-native';
import {Avatar, Button, Card, Chip, Paragraph} from 'react-native-paper';
import {IsNullOrEmpty} from '../../helpers/utility';
import {CourseStyles} from "../../styles/CourseStyles";
import {MainStyles} from "../../styles/MainStyles";
import Header from '../common/header';
import {getStore} from '../../store/store';
import {EnrollCourse} from '../../store/course/course.actions';
import {Actions} from 'react-native-router-flux';

export default function CourseDetail( props ) {
    let course = props.course;
    const LeftContent = props => <Avatar.Image {...props} source={{uri: course.logoUrl}} />;
    if ( IsNullOrEmpty( course.id ) ) {
        return <Text></Text>;
    }

    const enRollCourse = () => {
        getStore().dispatch( EnrollCourse( course.id ) );
        Actions.dashboard();
    };

    return (
        <View style={MainStyles.baseContainer}>
            <Header hasBack={true} />
            <Card style={MainStyles.baseCard}>
                <Card.Title title={course.title} subtitle={course.instructor} left={LeftContent} />
                <Card.Content>
                    <Paragraph style={CourseStyles.description}>{course.description}</Paragraph>
                </Card.Content>
                <Card.Actions style={{flexWrap: 'wrap'}}>
                    {
                        course.tags.map( ( item ) => {
                            return <Chip style={MainStyles.baseChip} key={item} icon="information">{item}</Chip>;
                        } )
                    }
                </Card.Actions>
            </Card>
            <Button onPress={enRollCourse} style={CourseStyles.enRoll} mode="contained">Enroll</Button>
        </View>
    );
}