import * as firebase from "firebase/app";
import {getAuth} from 'firebase/auth';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDl2p9Wk09K8JajxseZsfm2r1_cHq8l5gg",
    authDomain: "horizons-35ceb.firebaseapp.com",
    projectId: "horizons-35ceb",
    storageBucket: "horizons-35ceb.appspot.com",
    messagingSenderId: "829778613965",
    appId: "1:829778613965:web:6eaae4659e76ff90bdbb84",
    measurementId: "G-JFB654CNXJ"
  };

firebase.initializeApp(firebaseConfig);
const auth = getAuth();
export default auth;