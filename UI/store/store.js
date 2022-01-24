import {AsyncStorage} from "react-native";
import {applyMiddleware, createStore} from 'redux';
import {persistReducer, persistStore} from 'redux-persist';
import createSagaMiddleware from 'redux-saga';
import thunk from "redux-thunk";
import rootReducer from "./reducers";
import firebase from "../helpers/firebaseHelper";
import rootSaga from './saga';
import {UpdateToken} from "./user/user.actions";
const {createLogger} = require( 'redux-logger' );

const sagaMiddleware = createSagaMiddleware();
const middlewares = [];
middlewares.push( thunk );
middlewares.push( sagaMiddleware );

// const actionTransformer = (action) => {
//     var myLogs = [];
//     (function () {
//         var log = console.log;
//         console.log = function () {
//             var args = Array.prototype.slice.call(arguments);
//             log.apply(this, args);
//             myLogs.push(args);
//         };
//     }());

//     return action;
// };

// const logger = createLogger( {
//     level: 'log',
//     logger: console,
//     logErrors: true,
//     collapsed: undefined,
//     predicate: undefined,
//     duration: true,
//     timestamp: true,
//     stateTransformer: state => state,
//     actionTransformer,
//     errorTransformer: error => error,
//     colors: {
//         title: () => 'inherit',
//         prevState: () => '#9E9E9E',
//         action: () => '#03A9F4',
//         nextState: () => '#4CAF50',
//         error: () => '#F20404',
//     },
//     diff: false,
//     diffPredicate: undefined
// } );

// middlewares.push( logger );

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
};

const persistedReducer = persistReducer( persistConfig, rootReducer );
let store = createStore( persistedReducer, {}, applyMiddleware( ...middlewares ) );


const persistor = persistStore( store );
const getPersistor = () => persistor;
const getStore = () => store;
const getState = () => {
    return store.getState();
};

firebase.auth().onAuthStateChanged( user => {
    if ( user ) {
        user.getIdToken( true ).then( ( accessToken ) => {
            getStore().dispatch( UpdateToken( accessToken ) );
        } );
    }
} );

export {
    getStore,
    getState,
    getPersistor
};
export default {
    getStore,
    getState,
    getPersistor
};

sagaMiddleware.run( rootSaga );
