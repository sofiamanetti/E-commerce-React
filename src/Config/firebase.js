import firebase from "firebase";
import "firebase/storage";
var firebaseConfig = {
    apiKey: "AIzaSyDZNDiC7fNhA3GxwMJMbkFBMm-crK1LXD0",
    authDomain: "react2021-91e71.firebaseapp.com",
    projectId: "react2021-91e71",
    storageBucket: "react2021-91e71.appspot.com",
    messagingSenderId: "314830244137",
    appId: "1:314830244137:web:55fc99d8fbdbef1768cf38",
    measurementId: "G-85Y7WS8PVF"
  };
  firebase.initializeApp(firebaseConfig);
  firebase.db = firebase.firestore();
  firebase.autenticacion = firebase.auth();
  const storage = firebase.storage();

export {storage, firebase as default};
