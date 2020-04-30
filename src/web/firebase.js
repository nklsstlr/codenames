import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/analytics";

import "babel-polyfill";

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

export const generateUserDocument = async (user, additionalData) => {
  if (!user) return;
  const userRef = firestore.doc(`users/${user.uid}`);
  const snapshot = await userRef.get();
  if (!snapshot.exists) {
    const { email, displayName, photoURL } = user;
    try {
      await userRef.set({
        displayName,
        email,
        photoURL,
        ...additionalData,
      });
    } catch (error) {
      console.error("Error creating user document", error);
    }
  }
  return getUserDocument(user.uid);
};
const getUserDocument = async (uid) => {
  if (!uid) return null;
  try {
    const userDocument = await firestore.doc(`users/${uid}`).get();
    return {
      uid,
      ...userDocument.data(),
    };
  } catch (error) {
    console.error("Error fetching user", error);
  }
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const signInWithGoogle = () => {
  auth.signInWithPopup(provider);
};
