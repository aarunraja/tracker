import React from "react";
import {FlatList, View, RefreshControl} from "react-native";
import CourseCard from './CourseCard';

export default function CourseList( props ) {
  const renderCard = ( item ) => {
    return (
      <CourseCard key={item.id} course={item} isEnrolled={props.isEnrolled} />
    );
  };

  return (
    <FlatList
      data={props.courses}
      renderItem={( {item} ) => ( renderCard( item ) )}
      refreshControl={
        <RefreshControl refreshing={props.refreshing} onRefresh={() => props.onRefresh()} />
      }
      keyExtractor={item => item.id}
    />
  );
}

