import * as firebase from 'firebase';
import * as FirebaseCore from 'expo-firebase-core';

firebase.initializeApp( FirebaseCore.DEFAULT_APP_OPTIONS );

export default firebase;