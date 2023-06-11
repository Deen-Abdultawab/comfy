import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDETRwRSpfv3DCyY7ZIhtbbn-1-fGRVEOQ",
  authDomain: "comfy-store-c7723.firebaseapp.com",
  projectId: "comfy-store-c7723",
  storageBucket: "comfy-store-c7723.appspot.com",
  messagingSenderId: "81891052138",
  appId: "1:81891052138:web:ebc5b687efbffff5a05813",
};

firebase.initializeApp(firebaseConfig);
const projectFirestore = firebase.firestore();
const projectAuth = firebase.auth();
const timestamp = firebase.firestore.FieldValue.serverTimestamp;
const projectStorage = firebase.storage();

export { projectFirestore, projectAuth, timestamp, projectStorage };
