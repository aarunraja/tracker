import React, { useRef, useState } from 'react';
import { Text, View, ScrollView } from 'react-native';
import { Avatar, Card, Paragraph, Switch, useTheme, Button } from 'react-native-paper';
import YoutubePlayer from 'react-native-youtube-iframe';
import { CourseStyles } from "../../styles/CourseStyles";
import { MainStyles } from "../../styles/MainStyles";
import Header from '../common/header';
import { getStore } from '../../store/store';
import { MarkAsDone } from '../../store/course/course.actions';
import { LOGO_URL } from '../../helpers/utility';
import * as WebBrowser from 'expo-web-browser';

export default function CourseLearning(props) {
    let course = {
        logoUrl: LOGO_URL,
        title: props.Topic.Title,
        instructor: props.Course.title + " / " + props.Course.instructor,
        description: props.Topic.Description,
        progress: props.Topic.progress,
        Url: props.Topic.Content.Url,
        Type: props.Topic.Content.Type,
        File: props.Topic.Content.File,
    };

    const playerRef = useRef(null);
    const [playing] = useState(false);
    const [isSwitchOn, setIsSwitchOn] = React.useState(false);

    const onToggleSwitch = () => {
        getStore().dispatch(MarkAsDone(props.Course.id, props.Topic.id));
        setIsSwitchOn(true);
    };
    const colors = useTheme();
    const LeftContent = props => <Avatar.Image {...props} source={{ uri: course.logoUrl }} />;

    return (
        <View style={MainStyles.baseContainer}>
            <Header hasBack={true} />
            <ScrollView style={MainStyles.scrollContainer}>
                <Card style={MainStyles.baseCard}>
                    <Card.Title title={course.title} subtitle={course.instructor} left={LeftContent} />
                    <Card.Content>
                        {
                            course.Type === "PDF" ?
                                <>
                                    <Button mode={"contained"} onPress={() => WebBrowser.openBrowserAsync(course.File)}>
                                        Open Notes
                                    </Button>
                                </>
                                :
                                <YoutubePlayer
                                    ref={playerRef}
                                    height={220}
                                    videoId={course.Url}
                                    play={playing}
                                    onChangeState={event => console.log(event)}
                                    onReady={() => console.log("ready")}
                                    onError={e => console.log(e)}
                                    onPlaybackQualityChange={q => console.log(q)}
                                    volume={50}
                                    playbackRate={1}
                                    initialPlayerParams={{
                                        cc_lang_pref: "us",
                                        showClosedCaptions: true
                                    }}
                                />
                        }
                        <View style={CourseStyles.markCompleted}>
                            <Switch value={course.progress === 1 || isSwitchOn} onValueChange={() => course.progress === 1 ? {} : onToggleSwitch()} style={CourseStyles.switch} color={colors.primary} />
                            <Text>{course.progress === 1 || isSwitchOn ? "Completed" : "Mark as Completed"}</Text>
                        </View>
                        <Paragraph style={CourseStyles.notes}>{course.description}</Paragraph>
                    </Card.Content>
                </Card>
            </ScrollView>
        </View>
    );
}