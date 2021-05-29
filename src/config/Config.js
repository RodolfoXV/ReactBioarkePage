import firebase from 'firebase/app'
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyApsOqgz-H83VtrxPvUxDolYdkItJmPVvM",
  authDomain: "bioarke-react.firebaseapp.com",
  projectId: "bioarke-react",
  storageBucket: "bioarke-react.appspot.com",
  messagingSenderId: "1036778769320",
  appId: "1:1036778769320:web:eac4115e0713072c08ab9d",
  measurementId: "G-M1N1MXJBK3"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

export { auth, db, storage} 


