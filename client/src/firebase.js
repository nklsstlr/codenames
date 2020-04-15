import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/analytics";

const provider = new firebase.auth.GoogleAuthProvider();
// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyBzwOdz30h2kWANVkCpeIRhPV5hn8756kE",
  authDomain: "codenames-13fdc.firebaseapp.com",
  databaseURL: "https://codenames-13fdc.firebaseio.com",
  projectId: "codenames-13fdc",
  storageBucket: "codenames-13fdc.appspot.com",
  messagingSenderId: "798148204835",
  appId: "1:798148204835:web:3573e0d54cace8a5ccd496",
  measurementId: "G-CPKR3XPNXL",
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();
export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const signInWithGoogle = () => {
  auth.signInWithPopup(provider);
};
