import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyAEeEWxKwFvKyTdWJF9Inf41niO9NP9M3Q",
  authDomain: "ecomerce-3f3b6.firebaseapp.com",
  projectId: "ecomerce-3f3b6",
  storageBucket: "ecomerce-3f3b6.appspot.com",
  messagingSenderId: "579877076311",
  appId: "1:579877076311:web:c4d9b834d956481c14d212",
  measurementId: "G-H0X6ZPTVLQ",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };
