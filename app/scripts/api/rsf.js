import firebase from 'firebase';
import '@firebase/firestore';
import ReduxSagaFirebase from 'redux-saga-firebase';

const config = {
  apiKey: 'AIzaSyAJPHf4Bap3ZNHrP_bO3G_OqJPCp5Ub6F0',
  authDomain: 'stratotalks.firebaseapp.com',
  databaseURL: 'https://stratotalks.firebaseio.com',
  projectId: 'stratotalks',
  storageBucket: '',
  messagingSenderId: '517341791336',
};

const firebaseApp = firebase.initializeApp(config);

const rsf = new ReduxSagaFirebase(firebaseApp);

export default rsf;
