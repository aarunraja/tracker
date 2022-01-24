import React from 'react';
import RouteManager from './routes/routeManager';
import {connect} from 'react-redux';

function Main( props ) {
  return (
    <RouteManager accessToken={props.accessToken} />
  );
}

function mapStateToProps( state ) {
  return {
    accessToken: state.UserReducer.accessToken,
  };
}

function mapDispatchToProps( dispatch ) {
  return {
    actions: {
    }
  };
}

export default connect( mapStateToProps, mapDispatchToProps )( Main );
