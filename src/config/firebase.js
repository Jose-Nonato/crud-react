import firebase from "firebase/app";
import 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyA5G9WZJoKblu9jkds3WF8Fuv-mWxPaOE4",
    authDomain: "projeto-fdde7.firebaseapp.com",
    projectId: "projeto-fdde7",
    storageBucket: "projeto-fdde7.appspot.com",
    messagingSenderId: "304590971571",
    appId: "1:304590971571:web:9b8de6807b6535045786c6"
};

const fireDB = firebase.initializeApp(firebaseConfig);
export default fireDB.database().ref();